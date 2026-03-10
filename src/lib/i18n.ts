export type Locale = 'cs' | 'en'

export const LOCALE_COOKIE_NAME = 'locale'

export function getLocaleLabels(locale: Locale) {
  return {
    menu: locale === 'cs' ? 'Menu' : 'Menu',
    back: locale === 'cs' ? 'Zpět' : 'Back',
    switchTo: locale === 'cs' ? 'EN' : 'CZ',
    switchAriaLabel: locale === 'cs' ? 'Přepnout jazyk na angličtinu' : 'Switch language to Czech',
  }
}
