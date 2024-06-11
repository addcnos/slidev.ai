import { openai } from "@renderer/api/openai";
import { useIpcEmit } from "@renderer/composables";
import { nanoid } from "nanoid";
import { RunnableToolFunction } from "openai/lib/RunnableFunction";
import { ImageGenerateParams } from "openai/resources/images";

export async function saveImage2File(base64: string) {
  const base64Data = base64.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64Data, 'base64');
  const filename = `${nanoid()}.png`
  await useIpcEmit.fileManager('write', {
    fileName: filename,
    content: buffer,
    dirName: 'assets',
  })
  return `/assets/${filename}`
}

export async function generateImage({ prompt, size }: { prompt: string, size: ImageGenerateParams['size'] }) {
  console.log('generateImage', prompt, size)
  const response = await openai.images.generate({
    model: 'dall-e-3',
    prompt: prompt,
    n: 1,
    size,
    response_format: 'b64_json',
  });

  return saveImage2File(response.data[0].b64_json)
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
