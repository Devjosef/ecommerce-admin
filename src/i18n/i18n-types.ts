import type { BaseTranslation } from '../i18n-types';
import type { LocalizedString, RequiredParams } from 'typesafe-i18n';

export type Locales = 'en' | 'es' | 'fr' | 'pt';

// Define the BaseTranslationFunction type
type BaseTranslationFunction<T = unknown> = Record<string, T>;

// Define the TranslationFunctions type
export type TranslationFunctions = {
  [key in Locales]: BaseTranslationFunction & {
    locale: {
      choose: () => LocalizedString;
      selected: () => LocalizedString;
    };
    custom: (arg0: number) => LocalizedString;
    chaining: (arg0: number) => LocalizedString;
    builtin: {
      date: (arg0: Date) => LocalizedString;
      time: (arg0: Date) => LocalizedString;
      number: (arg0: number) => LocalizedString;
      replace: (arg0: string) => LocalizedString;
      'identity-and-ignore': (arg: { name: unknown }) => LocalizedString;
      uppercase: (arg0: string) => LocalizedString;
      lowercase: (arg0: string) => LocalizedString;
    };
  };
};

// Define the Formatters type
export type Formatters = {
  currency: (value: number) => unknown;
  custom: (value: number) => unknown;
  lower: (value: string) => unknown;
  myFormatter: (value: unknown) => unknown;
  noSpaces: (value: string) => unknown;
  round: (value: number) => unknown;
  sqrt: (value: number) => unknown;
  timeShort: (value: Date) => unknown;
  upper: (value: string) => unknown;
  weekday: (value: Date) => unknown;
};

