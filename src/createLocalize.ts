import { createDakpan } from 'dakpan';
import {
  Component,
  ComponentClass,
  ConsumerProps,
  ProviderProps,
  ReactElement,
  ReactNodeArray,
  ReactPortal,
  StatelessComponent
} from 'react';

import { createProvider } from './createProvider';
import { createTranslate } from './createTranslate';
import { LocalizeState } from './types';
import { withTranslations } from './withTranslations';

export const createLocalize = (language: string, languages: string[]) => {
  if (!languages.length) {
    throw new Error(`You may not provide 'createLocalize' with an empty 'languages' array`);
  } else if (languages.indexOf(language) === -1) {
    language = languages[0];
  }

  const { Provider, Consumer, withConsumer, context } = createDakpan<LocalizeState>({
    language,
    languages,
    translations: {}
  })({
    setLanguage: (language: string) => () => ({
      language
    })
  });

  const TranslationProvider = createProvider(context);

  return {
    LocalizeProvider: Provider,
    LocalizeConsumer: Consumer,
    withLocalize: withConsumer,
    TranslationProvider,
    withTranslations: withTranslations(TranslationProvider),
    Translate: createTranslate(context)
  };
};
