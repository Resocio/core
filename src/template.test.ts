import { paramLabel, ParamType, parseTemplateManifestParams, renderTemplate, validateParameterValue } from './template'

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
      label: 'P 1',
      name: 'p1',
      type: 'string',
      demoValue: 'Value of P1'
    }]
  })).toEqual([{
    label: 'P 1',
    name: 'p1',
    type: ParamType.String,
    demoValue: 'Value of P1'
  }]);
});

test('validateParameterValue', () => {
  validateParameterValue({
    name: 'someText', type: ParamType.String, demoValue: 'Foo'
  }, 'Lorem ipsum');

  validateParameterValue({
    name: 'theColor', type: ParamType.Color, demoValue: '#456789'
  }, '#abcdef');

  validateParameterValue({
    name: 'country', type: ParamType.Choice, values: ['Spain', 'France'], demoValue: 'Spain'
  }, 'France');

  expect(() => validateParameterValue({
    name: 'country', type: ParamType.Choice, values: ['Spain', 'France'], demoValue: 'Spain'
  }, 'Wakanda')).toThrowError();
});

test('paramLabel', () => {
  expect(paramLabel({
    name: 'someName', type: ParamType.String, demoValue: 'Foo'
  })).toEqual('Some Name')

  expect(paramLabel({
    label: 'Some Label', name: 'someName', type: ParamType.String, demoValue: 'Foo'
  })).toEqual('Some Label')
});
