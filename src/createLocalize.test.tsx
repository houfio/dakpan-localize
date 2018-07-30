import { mount } from 'enzyme';
import * as React from 'react';
import { StatelessComponent } from 'react';

import { createLocalize } from './createLocalize';

it('should override the parent translations', () => {
  const { LocalizeProvider, Translate, withTranslations } = createLocalize('en', ['en']);

  const One: StatelessComponent = withTranslations({
    test: ['hello'],
    hello: ['yes']
  })(() => (
    <>
      <Translate id="test"/>
      <Translate id="hello"/>
      <Two/>
    </>
  ));

  One.displayName = 'One';

  const Two: StatelessComponent = withTranslations({
    test: ['it works!']
  })(() => (
    <>
      <Translate id="test"/>
      <Translate id="hello"/>
    </>
  ));

  Two.displayName = 'Two';

  const wrapper = mount(
    <LocalizeProvider>
      <One/>
    </LocalizeProvider>
  );

  expect(wrapper).toMatchSnapshot();
});

it('should change the language', () => {
  const { LocalizeProvider, Translate, withLocalize, withTranslations } = createLocalize('en', ['en', 'nl']);

  const Component = withTranslations({
    test: {
      message: ['message', 'bericht']
    }
  })(withLocalize((_, { setLanguage }) => ({ setLanguage }))(({ setLanguage }) => (
    <>
      <button onClick={setLanguage.e('nl')}>lang</button>
      <Translate id="test.message"/>
    </>
  )));

  const wrapper = mount(
    <LocalizeProvider>
      <Component/>
    </LocalizeProvider>
  );

  expect(wrapper).toMatchSnapshot();
  wrapper.find('button').simulate('click');
  expect(wrapper.update()).toMatchSnapshot();
});

it('should replace placeholders with provided data', () => {
  const { LocalizeProvider, Translate, withTranslations } = createLocalize('en', ['en']);

  const Component = withTranslations({
    greeting: ['Hello {name}!']
  })(() => (
    <>
      <Translate id="greeting" data={{ name: 'Steve' }}/>
    </>
  ));

  const wrapper = mount(
    <LocalizeProvider>
      <Component/>
    </LocalizeProvider>
  );

  expect(wrapper).toMatchSnapshot();
});

it('should be possible not to use the hocs', () => {
  const { LocalizeProvider, Translate, TranslationProvider } = createLocalize('en', ['en']);

  const wrapper = mount(
    <LocalizeProvider>
      <TranslationProvider
        translations={{
          test: {
            message: [
              'hello!'
            ]
          }
        }}
      >
        <Translate id="test.message"/>
      </TranslationProvider>
    </LocalizeProvider>
  );

  expect(wrapper).toMatchSnapshot();
});
