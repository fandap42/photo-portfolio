export type Locale = 'cs' | 'en'

export const LOCALE_COOKIE_NAME = 'locale'

export function getLocaleLabels(locale: Locale) {
  return {
    menu: locale === 'cs' ? 'menu' : 'menu',
    back: locale === 'cs' ? 'zpět' : 'back',
    switchTo: locale === 'cs' ? 'EN' : 'CZ',
    switchAriaLabel: locale === 'cs' ? 'Přepnout jazyk na angličtinu' : 'Switch language to Czech',
  }
}
