import axios from 'axios';
import Mustache from 'mustache'

const PartialContent = 'content';
const PartialStyles = 'styles';

const HtmlTemplate = `
<html style="width:{{ resoc_imageWidth }}px;height:{{ resoc_imageHeight }}px;font-size:3vw">
  <head>
    <meta name="viewport" content="width={{ resoc_imageWidth }}, initial-scale=1">
  </head>
  <body style="margin:0;width:100%;height:100%">
    <style>
      {{> ${PartialStyles}}}
    </style>
    {{> ${PartialContent}}}
  </body>
</html>`;

export enum ParamType {
  String = 'string',
  Color = 'color',
  ImageUrl = 'imageUrl',
  TextDirection = 'textDirection'
};

export type TemplateParam = {
  name: string;
  slug: string;
  type: ParamType;
  demoValue: string;
  defaultValue?: string;
};

export interface ImageTemplate {
  partials: { [ name: string ]: string };
  parameters: TemplateParam[];
};

export type ParamValues = { [ name: string ]: string };

export const demoParamValues = (params: TemplateParam[]): ParamValues => {
  const values: ParamValues = {};
  params.forEach(param => {
    values[param.slug] = param.demoValue;
  });
  return values;
};

export const renderTemplate = (
  mainTemplate: string,
  template: ImageTemplate,
  parameters: ParamValues,
) => {
  return Mustache.render(mainTemplate, parameters, template.partials);
};

export const renderTemplateToHtml = (template: ImageTemplate, parameters: ParamValues) => (
  renderTemplate(HtmlTemplate, template, parameters)
);

export const parseTemplateManifestParams = (manifest: any): TemplateParam[] => {
  const parameters: TemplateParam[] = [];
  // TODO: Handle error cases: no 'parameters' field, etc.
  manifest['parameters'].forEach((param: any) => {
    parameters.push(param);
  });
  return parameters;
};
