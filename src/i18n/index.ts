import en from './en.json';
import da from './da.json';

export type Locale = 'en' | 'da';
export type MessageKey = keyof typeof en;
export const COOKIE_NAME = 'mineclub-language';
export const normalizeLocale = (value: unknown): Locale => value === 'da' ? 'da' : 'en';
export function t(locale: Locale, key: MessageKey): string {
  const value = (locale === 'da' ? (da as Partial<typeof en>)[key] : undefined) ?? en[key];
  if (value === undefined) throw new Error(`Missing English message: ${key}`);
  return value;
}
export function languageCookie(locale: Locale, hostname: string, secure: boolean): string {
  const domain = hostname === 'mineclub.dk' || hostname.endsWith('.mineclub.dk') ? '; Domain=mineclub.dk' : '';
  return `${COOKIE_NAME}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax${domain}${secure ? '; Secure' : ''}`;
}
