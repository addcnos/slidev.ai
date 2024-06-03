import OpenAI from "openai";

export const openai = new OpenAI({
  dangerouslyAllowBrowser: true,
  baseURL: 'https://one-api.system.addcn.com/v1'
});

export const openaiProxy = async () => {
  return await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: 'Say this is a content' }],
  });
}
