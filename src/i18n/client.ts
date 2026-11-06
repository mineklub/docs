import { COOKIE_NAME, languageCookie, normalizeLocale, t, type Locale, type MessageKey } from './index';

const endpoint = 'https://api.mineclub.dk/v2/language';
const selector = document.querySelector<HTMLSelectElement>('[data-language]');
const error = document.querySelector<HTMLElement>('[data-language-error]');
let locale: Locale = 'en';
let busy = false;
let revision = 0;
let identity: 'unknown' | 'guest' | 'signed-in' = 'unknown';

function cookieLocale(): Locale {
  return normalizeLocale(document.cookie.split('; ').find(value => value.startsWith(`${COOKIE_NAME}=`))?.split('=')[1]);
}

function apply(next: Locale, persist = false) {
  locale = next;
  if (persist) document.cookie = languageCookie(next, location.hostname, location.protocol === 'https:');
  document.documentElement.lang = next;
  if (selector) selector.value = next;
  // Rich HTML comes only from this repository's reviewed, build-time catalogs.
  // No user content, API response, or interpolated values are inserted as HTML.
  document.querySelectorAll<HTMLElement>('[data-i18n-html]').forEach(element => {
    element.innerHTML = t(next, element.dataset.i18nHtml as MessageKey);
  });
  document.querySelectorAll<HTMLElement>('[data-i18n-aria-label]').forEach(element => {
    element.setAttribute('aria-label', t(next, element.dataset.i18nAriaLabel as MessageKey));
  });
  document.querySelectorAll<HTMLMetaElement>('[data-i18n-content]').forEach(element => {
    element.content = t(next, element.dataset.i18nContent as MessageKey);
  });
  const title = document.querySelector<HTMLTitleElement>('[data-i18n-title]');
  if (title) title.textContent = `${t(next, title.dataset.i18nTitle as MessageKey)} | MineCore`;
}

async function readPreference(): Promise<Locale | null> {
  const response = await fetch(endpoint, { credentials: 'include', cache: 'no-store', signal: AbortSignal.timeout(10000) });
  if (response.status === 401) { identity = 'guest'; return null; }
  if (!response.ok) throw new Error('read');
  const result = await response.json();
  if (result.data?.locale !== 'en' && result.data?.locale !== 'da') throw new Error('read');
  identity = 'signed-in';
  return result.data.locale;
}

async function refresh() {
  if (busy) return;
  const current = revision;
  try {
    const saved = await readPreference();
    if (current === revision && !busy) apply(saved ?? cookieLocale(), saved !== null);
  } catch { /* Keep the last known preference, including during API outages. */ }
}

apply(cookieLocale());
void refresh();
window.addEventListener('focus', refresh);
setInterval(() => { if (document.visibilityState === 'visible') void refresh(); }, 30000);
selector?.addEventListener('change', async () => {
  if (busy) return;
  const next = normalizeLocale(selector.value);
  selector.value = locale;
  busy = true;
  revision++;
  selector.disabled = true;
  if (error) error.hidden = true;
  try {
    // Recheck the session so a login in another tab cannot turn a shared save into a guest-only change.
    await readPreference();
    if (identity === 'signed-in') {
      const response = await fetch(endpoint, {
        method: 'POST', credentials: 'include', signal: AbortSignal.timeout(10000),
        headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
        body: JSON.stringify({ locale: next }),
      });
      if (!response.ok) throw new Error('save');
      const result = await response.json();
      if (result.data?.locale !== next) throw new Error('save');
    }
    apply(next, true);
  } catch {
    if (error) { error.textContent = t(locale, 'language.failed'); error.hidden = false; }
  } finally { busy = false; selector.disabled = false; }
});
