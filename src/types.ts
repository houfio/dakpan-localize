import { ReactNode } from 'react';

export type LocalizeState = {
  language: string,
  languages: string[],
  translations: {
    [id: string]: string[]
  }
};

export type Translations = {
  [id: string]: string[] | Translations
};

export type TranslateProps = {
  id: string,
  data?: {
    [key: string]: string
  }
};

export type ProviderProps = {
  children: ReactNode,
  translations: Translations
};
