import { flattenTranslation } from './flattenTranslation';

it('should flatten the object', () => {
  expect(flattenTranslation({
    message: ['hello'],
    form: {
      email: ['Email address'],
      password: ['Password'],
      other: {
        test: ['awdwadawd']
      }
    }
  })).toMatchSnapshot();
});
