import OpenAI from "openai";

export const openai = new OpenAI({
  dangerouslyAllowBrowser: true,
  baseURL: 'https://one-api.system.addcn.com'
});

