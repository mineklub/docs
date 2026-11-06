import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { stripTypeScriptTypes } from 'node:module';
import { SourceTextModule, SyntheticModule, createContext } from 'node:vm';

const en = JSON.parse(readFileSync('src/i18n/en.json', 'utf8'));
const da = JSON.parse(readFileSync('src/i18n/da.json', 'utf8'));
const read = path => readFileSync(path, 'utf8');
const routes = ['/', ...readdirSync('src/pages/docs').filter(file => file.endsWith('.astro')).map(file => `/docs/${file.slice(0, -6)}/`)];
const page = route => read(resolve('dist', `.${route}`, 'index.html'));

test('catalogs cover the same keys and preserve code, links, placeholders and safe markup', () => {
  assert.deepEqual(Object.keys(en).sort(), Object.keys(da).sort());
  const capture = (text, regex) => [...text.matchAll(regex)].map(match => match[1]).sort();
  for (const key of Object.keys(en)) {
    assert.ok(en[key].length && da[key].length, key);
    assert.deepEqual(capture(en[key], /<code>([\s\S]*?)<\/code>/g), capture(da[key], /<code>([\s\S]*?)<\/code>/g), `${key}: code`);
    assert.deepEqual(capture(en[key], /href="([^"]+)"/g), capture(da[key], /href="([^"]+)"/g), `${key}: links`);
    assert.deepEqual(capture(en[key], /\{(\w+)\}/g), capture(da[key], /\{(\w+)\}/g), `${key}: placeholders`);
    for (const text of [en[key], da[key]]) {
      for (const tag of text.matchAll(/<\/?([\w-]+)\b([^>]*?)>/g)) {
        assert.ok(['a', 'code', 'strong', 'em', 'br', 'span'].includes(tag[1]), `${key}: disallowed tag ${tag[1]}`);
        assert.doesNotMatch(tag[2], /\bon\w+\s*=|javascript:|data:/i, `${key}: unsafe attribute`);
      }
    }
  }
});

test('all published routes render English and keep local links and anchors valid', () => {
  assert.equal(routes.length, 10);
  for (const route of routes) {
    const html = page(route);
    assert.match(html, /<html[^>]*lang="en"/);
    assert.match(html, /data-language/);
    for (const match of html.matchAll(/data-i18n-(?:html|aria-label|content|title)="([^"]+)"/g)) assert.ok(en[match[1]], `${route}: ${match[1]}`);
    for (const [, href] of html.matchAll(/href="([^" ]+)"/g)) {
      if (!href.startsWith('/docs/') && !href.startsWith('#')) continue;
      const [targetPath, anchor] = href.split('#');
      const target = targetPath ? targetPath.replace(/\/?$/, '/') : route;
      assert.ok(routes.includes(target), `${route}: broken route ${href}`);
      if (anchor) assert.ok(page(target).includes(`id="${anchor}"`), `${route}: broken anchor ${href}`);
    }
  }
});

async function browserHarness({ cookie = '', response } = {}) {
  const listeners = {};
  const requests = [];
  const selector = { value: 'en', disabled: false, addEventListener: (type, callback) => { listeners[type] = callback; } };
  const error = { hidden: true, textContent: '' };
  const paragraph = { dataset: { i18nHtml: 'article.kom-i-gang.text02' }, innerHTML: '' };
  const title = { dataset: { i18nTitle: 'article.kom-i-gang.title' }, textContent: '' };
  const doc = { cookie, documentElement: { lang: 'en' }, visibilityState: 'visible',
    querySelector: query => query === '[data-language]' ? selector : query === '[data-language-error]' ? error : title,
    querySelectorAll: query => query === '[data-i18n-html]' ? [paragraph] : [],
  };
  let handler = response ?? (async () => new Response('', { status: 401 }));
  const context = createContext({ document: doc, window: { addEventListener: (type, callback) => { listeners[type] = callback; } },
    location: { hostname: 'docs.mineclub.dk', protocol: 'https:' }, setInterval: () => 1, AbortSignal, Error,
    fetch: async (...args) => { requests.push(args); return handler(...args); },
  });
  const core = new SourceTextModule(stripTypeScriptTypes(read('src/i18n/index.ts')), { context });
  await core.link(specifier => new SyntheticModule(['default'], function () { this.setExport('default', specifier === './en.json' ? en : da); }, { context }));
  await core.evaluate();
  const client = new SourceTextModule(stripTypeScriptTypes(read('src/i18n/client.ts')), { context });
  await client.link(() => core);
  await client.evaluate();
  await new Promise(resolve => setImmediate(resolve));
  return { doc, error, paragraph, title, requests, core: core.namespace,
    respond: next => { handler = next; },
    focus: () => listeners.focus(),
    select: next => { selector.value = next; return listeners.change(); },
  };
}

test('guest language cookie translates static content and persists selection', async () => {
  const app = await browserHarness({ cookie: 'mineclub-language=da' });
  assert.equal(app.doc.documentElement.lang, 'da');
  assert.equal(app.paragraph.innerHTML, 'Aktivér MineCore');
  await app.select('en');
  assert.equal(app.doc.documentElement.lang, 'en');
  assert.equal(app.paragraph.innerHTML, 'Enable MineCore');
  assert.equal(app.title.textContent, 'Getting started | MineCore');
  assert.match(app.doc.cookie, /mineclub-language=en.*Domain=mineclub.dk.*Secure/);
  assert.ok(app.requests.every(([, options]) => options.method !== 'POST'));
});

test('signed-in preferences win; failed saves and unavailable reads preserve prior language', async () => {
  const app = await browserHarness({ cookie: 'mineclub-language=da', response: async () => Response.json({ data: { locale: 'en' } }) });
  assert.equal(app.doc.documentElement.lang, 'en');
  app.respond(async (_url, options) => options.method === 'POST' ? new Response('', { status: 503 }) : Response.json({ data: { locale: 'en' } }));
  const cookie = app.doc.cookie;
  await app.select('da');
  assert.equal(app.doc.documentElement.lang, 'en');
  assert.equal(app.doc.cookie, cookie);
  assert.equal(app.error.hidden, false);
  app.respond(async () => { throw new Error('offline'); });
  await app.focus();
  assert.equal(app.doc.documentElement.lang, 'en');
  app.respond(async (_url, options) => Response.json({ data: { locale: options.method === 'POST' ? JSON.parse(options.body).locale : 'en' } }));
  await app.select('da');
  assert.equal(app.doc.documentElement.lang, 'da');
  assert.equal(app.error.hidden, true);
});

test('late preference reads cannot overwrite a newer choice; English fallback stays available', async () => {
  let resolveOld;
  let calls = 0;
  const app = await browserHarness({ response: () => ++calls === 1 ? new Promise(resolve => { resolveOld = resolve; }) : Promise.resolve(new Response('', { status: 401 })) });
  await app.select('da');
  resolveOld(Response.json({ data: { locale: 'en' } }));
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(app.doc.documentElement.lang, 'da');
  assert.equal(app.core.normalizeLocale('fr'), 'en');
  assert.throws(() => app.core.t('en', 'missing'), /Missing English/);
  const value = da['nav.start']; delete da['nav.start'];
  assert.equal(app.core.t('da', 'nav.start'), 'Getting started');
  da['nav.start'] = value;
});
