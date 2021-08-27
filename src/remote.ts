import axios from "axios";
import { ImageTemplate, TemplateParam } from "./template";

export const isAbsoluteUrl = (url: string): boolean => (
  url.toLowerCase().startsWith('http://') ||
  url.toLowerCase().startsWith('https://') ||
  url.toLowerCase().startsWith('//')
);

export const relativeUrlToAbsoluteUrl = (relativeUrl: string): string => (
  new URL(relativeUrl, document.baseURI).href
);

export const resolveRelativeUrl = (relativeUrl: string, baseUrl: string) => {
  if (!isAbsoluteUrl(baseUrl)) {
    baseUrl = relativeUrlToAbsoluteUrl(baseUrl);
  }
  return (new URL(relativeUrl, baseUrl)).href;
};

export const downloadManifest = async (manifestUrl: string): Promise<any> => {
  try {
    return (await axios.get(manifestUrl)).data;
  }
  catch(e) {
    throw new Error(`Cannot download manifest file ${manifestUrl}: ${e}`);
  }
};

export const loadRemoteTemplate = async (manifestUrl: string): Promise<ImageTemplate> => {
  const manifest = await downloadManifest(manifestUrl);

  const partials: { [ name: string ]: string } = {};
  for await (let partial of Object.keys(manifest['partials'])) {
    partials[partial] = (await axios.get(resolveRelativeUrl(manifest['partials'][partial], manifestUrl))).data;
  }

  const parameters: TemplateParam[] = [];
  manifest['parameters'].forEach((param: any) => {
    parameters.push(param);
  });

  return {
    partials, parameters
  };
};
