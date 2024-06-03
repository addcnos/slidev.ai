import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
  baseURL: 'http://localhost:3030/api'
});

