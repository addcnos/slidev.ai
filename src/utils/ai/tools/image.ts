import { openai } from "@renderer/api/openai";
import { useIpcEmit } from "@renderer/composables";
import { nanoid } from "nanoid";
import { RunnableToolFunction } from "openai/lib/RunnableFunction";
import { ImageGenerateParams } from "openai/resources/images";
import { webcontainerFs } from "@main/webcontainer";

export function saveImage2File(filename: string, base64: string) {
  const content = Uint8Array.from(atob(base64), c => c.charCodeAt(0))
  useIpcEmit.fileManager('write', {
    fileName: filename,
    content,
    dirName: 'assets',
  })
  webcontainerFs().writeFile(
    `public/images/${filename}`,
    content
  )
}

export async function generateImage({ prompt, size }: { prompt: string, size: ImageGenerateParams['size'] }) {
  const filename = `${nanoid()}.png`

  openai.images.generate({
    model: 'dall-e-3',
    prompt: prompt,
    n: 1,
    size,
    response_format: 'b64_json',
  }).then(async (res) => saveImage2File(filename, res.data[0].b64_json))

  return `public/images/${filename}`
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
