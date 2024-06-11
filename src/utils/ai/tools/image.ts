import { openai } from "@renderer/api/openai";
import { RunnableToolFunction } from "openai/lib/RunnableFunction";
import { ImageGenerateParams } from "openai/resources/images";

export async function generateImage({ prompt, size }: { prompt: string, size: ImageGenerateParams['size'] }) {
  console.log('generateImage', prompt, size)
  const response = await openai.images.generate({
    model: 'dall-e-3',
    prompt: prompt,
    n: 1,
    size,
  });
  // TODO 保存到本地然后加入到slidev中
  return response.data[0].url;
}

const config: RunnableToolFunction<object>[] = [
  // 生成
  {
    type: 'function',
    function: {
      name: 'generateImage',
      description: 'Generates an image using DALL-E 3 based on a given prompt, width, and height',
      parameters: {
        type: 'object',
        properties: {
          prompt: { type: 'string' },
          size: { type: 'string', enum: ["1024x1024", "1792x1024", "1024x1792"] },
        },
      },
      function: generateImage,
      parse: JSON.parse,
    },
  } as RunnableToolFunction<{ prompt: string, size: ImageGenerateParams['size'] }>,
  // 可以添加修改的功能
]


export default config
