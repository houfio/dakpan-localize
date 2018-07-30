import { ComponentType, createElement, ReactElement } from 'react';

import { ProviderProps, Translations } from './types';

export const withTranslations = (
  provider: ComponentType<ProviderProps>
) => (
  translations: Translations
) => <P>(
  component: ComponentType<P>
) => {
  const WithTranslations = (props: P) => createElement(provider, {
    translations,
    children: createElement(component, props as P)
  });

  return WithTranslations;
};
