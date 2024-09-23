import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
  baseURL: 'http://localhost:3030/api'
});


export const GPT_MODEL = 'gpt-3.5-turbo';
