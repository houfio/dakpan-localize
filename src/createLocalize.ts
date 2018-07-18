import { createDakpan } from 'dakpan';
import {
  Component,
  ComponentClass,
  ComponentType,
  createElement,
  ProviderProps,
  ReactElement,
  ReactNodeArray,
  ReactPortal,
  SFCElement,
  StatelessComponent
} from 'react';

import { flattenTranslation } from './flattenTranslation';
import { LocalizeState, TranslateProps, Translations } from './types';

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

  return {
    LocalizeProvider: Provider,
    withLocalize: withConsumer,
    withTranslations:
      (withTranslations: Translations) => <P>(component: ComponentType<P>) => (props: P) => createElement(Consumer, {
        children: ({ language, languages, translations }: LocalizeState) => createElement(context.Provider, {
          value: {
            language,
            languages,
            translations: {
              ...translations,
              ...flattenTranslation(withTranslations)
            }
          },
          children: createElement(component, props as P)
        })
      }),
    Translate: ({ id, data = {} }: TranslateProps) => createElement(Consumer, {
      children: ({ language, languages, translations }: LocalizeState) => {
        const index = languages.indexOf(language);
        const translation = translations[id];

        if (!translation) {
          throw new Error(`Translation with id '${id}' not found`);
        } else if (index === -1 || translation.length <= index) {
          throw new Error(`Language '${language}' for translation '${id}' not found`);
        }

        let result = translation[index];

        Object.keys(data).forEach((key) => result = result.replace(new RegExp('\\{' + key + '}', 'g'), data[key]));

        return result;
      }
    })
  };
};
