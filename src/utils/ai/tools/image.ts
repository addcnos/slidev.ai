import { useIpcEmit } from "@renderer/composables";
import { nanoid } from "nanoid";
import { RunnableToolFunction } from "openai/lib/RunnableFunction";
import { ImageGenerateParams } from "openai/resources/images";
import { webcontainerFs } from "@main/webcontainer";
import { useChatSession } from "@renderer/store";
import { openai } from "@renderer/api/openai";

export async function saveImage2File(filename: string, base64: string) {
  const { syncMarkdown, chat } = useChatSession()
  const content = Uint8Array.from(atob(base64), c => c.charCodeAt(0))
  useIpcEmit.fileManager('write', {
    fileName: filename,
    content,
    dirName: 'assets',
  })
  try {
    await webcontainerFs().mkdir('public/images', { recursive: true })
    await webcontainerFs().writeFile(`public/images/${filename}`, content)
    syncMarkdown()
  } catch (_) {
    console.log('Failed to save image', _)
    // TODO
  }
  chat.value.waitImage = chat.value.waitImage.filter((item) => item !== filename)
}

export async function generateImage({ prompt, size }: { prompt: string, size: ImageGenerateParams['size'] }) {
  const filename = `${nanoid()}.png`

  const { chat } = useChatSession()

  openai.images.generate({
    model: 'dall-e-3',
    prompt: `${prompt}\n my desired image style is: ${chat.value.imageStyle}!!!!!!!!`,
    n: 1,
    size,
    response_format: 'b64_json',
  }).then((res) => saveImage2File(filename, res.data[0].b64_json))

  chat.value.waitImage.push(filename)

  return `<img v-drag="[Left,Top,100%,100%,Rotate]" src="/public/images/${filename}" />`
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
