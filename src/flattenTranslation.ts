import { Translations } from './types';

export const flattenTranslation = (translation: Translations) => {
  let output = {};

  const step = (t: Translations, previous = '') => {
    Object.keys(t).forEach((key) => {
      const value = t[key];
      const path = previous ? `${previous}.${key}` : key;

      if (!(value instanceof Array)) {
        return step(value, path);
      }

      output = {
        ...output,
        [path]: value
      };
    });
  };

  step(translation);

  return output;
};
