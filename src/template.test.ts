import { ParamType, parseTemplateManifestParams, renderTemplate } from './template'

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
