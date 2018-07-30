import { ConsumerProps, Context, createElement, ReactElement } from 'react';

import { flattenTranslation } from './flattenTranslation';
import { LocalizeState, ProviderProps } from './types';

export const createProvider = (
  context: Context<LocalizeState>
) => {
  const TranslationProvider = ({ translations, children }: ProviderProps) => createElement(context.Consumer, {
    children: ({ language, languages, translations: t }: LocalizeState) => createElement(context.Provider, {
      value: {
        language,
        languages,
        translations: {
          ...t,
          ...flattenTranslation(translations)
        }
      },
      children
    })
  });

  return TranslationProvider;
};
