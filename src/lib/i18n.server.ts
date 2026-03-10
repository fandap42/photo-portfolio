import {cookies, headers} from 'next/headers'
import {LOCALE_COOKIE_NAME, type Locale} from '@/lib/i18n'

export async function getRequestLocale(): Promise<Locale> {
  const cookieStore = await cookies()
  const cookieLocale = cookieStore.get(LOCALE_COOKIE_NAME)?.value

  if (cookieLocale === 'cs' || cookieLocale === 'en') {
    return cookieLocale
  }

  const requestHeaders = await headers()
  const acceptLanguage = requestHeaders.get('accept-language') || ''

  // Prefer Czech for browsers with Czech locale, otherwise default to English.
  if (/\bcs(-|;|,|$)/i.test(acceptLanguage)) {
    return 'cs'
  }

  return 'en'
}
