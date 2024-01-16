import { date, identity, ignore, lowercase, number, replace, time, uppercase } from 'typesafe-i18n/formatters';
import type { FormattersInitializer } from 'typesafe-i18n';
import type { Formatters, Locales } from './i18n-types';

export const initFormatters: FormattersInitializer<Locales, Formatters> = (locale: Locales) => {
  const formatters: Formatters = {
    custom: (value) => (value * 4.2) - 7,
    sqrt: (value) => Math.sqrt(value),
    round: (value) => Math.round(value),
    weekday: (value: Date) => date(locale, { weekday: 'long' })(value),
    timeShort: (value: Date) => time(locale, { timeStyle: 'short' })(value),
    currency: (value: number) => number(locale, { style: 'currency', currency: 'EUR' })(value),
    noSpaces: (value: string) => replace(/\s/g, '-')(value),
    myFormatter: (value: unknown) => (locale === 'en' ? identity : ignore)(value),
    upper: uppercase,
    lower: lowercase,
  };

  return formatters;
};
