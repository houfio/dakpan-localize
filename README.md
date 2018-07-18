# Dakpan Localize [![npm version](https://badge.fury.io/js/dakpan-localize.svg)](https://www.npmjs.com/package/dakpan-localize)
Simple localization for React.

## Install
```
npm install dakpan-localize
```
or
```
yarn add dakpan-localize
```

## Example
```json
{
  "greeting": [
    "Hello {name}!",
    "Hallo {name}!"
  ]
}
```

```ts
import { createLocalize } from 'dakpan-localize';
import * as translations from './translations.json';

const { Translate, withTranslations } = createLocalize('en', ['en', 'nl']);

const Component = withTranslations(translations)(() => (
  <div>
    <Translate id="greeting" data={{ name: 'Steve' }}/>
  </div>
));
```

## Documentation

## `createLocalize(language, languages)`

### Input:

#### `language`

The default language.

`'en'`

#### `languages`

An array of supported languages.

`['en', 'de', 'nl']`

### Output:

#### `<LocalizeProvider/>`

A component that should wrap all of the consumers. Without this component mounted, changing the language throws an error.

```ts
<LocalizeProvider>
  /** children */
</LocalizeProvider>
```

#### `withLocalize(map)(component)`

A HOC which gives its children access to the state and actions. See the [Dakpan documentation](https://github.com/houfio/dakpan#readme) for more info.

```ts
type Props = {
  test: string
};

const Component = withConsumer(({ language }, { setLanguage }) => ({
  language,
  setLanguage
}))<Props>(({ test, language, setLanguage }) => (
  <>
    <span>{test}</span>
    <span>{language}</span>
    <button onClick={setLanguage.e('de')}/>
  </>
));

<Component test="prop"/>
```

#### `withTranslations(translations)(component)`

A HOC which gives its children access to the provided translations. When a parent already has translations, the translations with the same id will be overridden.

```json
{
  "greeting": [
    "Hello!",
    "Hallo!"
  ]
}
```

```ts
import * as translations from './translations.json';

withTranslations(translations)(() => (
  <div>
    <Translate id="greeting"/>
  </div>
));
```

#### `<Translate id data/>`

A component which translates an id to a string. When no translation is found, an error is thrown.

```ts
<Translate id="greeting" data={{ name: 'Steve' }}/>
```
