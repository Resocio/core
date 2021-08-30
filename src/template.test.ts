import { ParamType, parseTemplateManifestParams, renderTemplate, validateParameterValue } from './template'

test('renderTemplate', () => {
  expect(renderTemplate('# {{> content }} *', { partials: { content: 'Hello {{name}}' }, parameters: [] }, { name: 'world' }))
    .toEqual('# Hello world *');
});

test('parseTemplateManifestParams', () => {
  expect(parseTemplateManifestParams({
    parameters: []
  })).toEqual([]);
  expect(parseTemplateManifestParams({
    parameters: [{
      name: 'P1',
      slug: 'p1',
      type: 'string',
      demoValue: 'Value of P1'
    }]
  })).toEqual([{
    name: 'P1',
    slug: 'p1',
    type: ParamType.String,
    demoValue: 'Value of P1'
  }]);
});

test('validateParameterValue', () => {
  validateParameterValue({
    name: 'Some text', slug: 'someText', type: ParamType.String, demoValue: 'Foo'
  }, 'Lorem ipsum');

  validateParameterValue({
    name: 'The Color', slug: 'theColor', type: ParamType.Color, demoValue: '#456789'
  }, '#abcdef');

  validateParameterValue({
    name: 'Country', slug: 'country', type: ParamType.Choice, values: ['Spain', 'France'], demoValue: 'Spain'
  }, 'France');

  expect(() => validateParameterValue({
    name: 'Country', slug: 'country', type: ParamType.Choice, values: ['Spain', 'France'], demoValue: 'Spain'
  }, 'Wakanda')).toThrowError();
});
