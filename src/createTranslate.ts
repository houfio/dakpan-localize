import { ConsumerProps, Context, createElement, ReactElement } from 'react';

import { LocalizeState, TranslateProps } from './types';

export const createTranslate = (
  context: Context<LocalizeState>
) => {
  const Translate = ({ id, data = {} }: TranslateProps) => createElement(context.Consumer, {
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
  });

  return Translate;
};
