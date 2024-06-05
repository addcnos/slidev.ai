import { Outline } from "@renderer/types/outline"
import { stringifyOutline } from "../transform/outline"
import { ChatCompletion } from "openai/resources/chat/completions"
import { Role } from "@renderer/types/chat"

export function genSlidevByContentPrompt(outline: Outline[], title: string) {
  return [
    '我希望你充当演示文稿(PPT)生成器，我会将大纲发送给你，你需要根据大纲生成对应的 slidev markdown 内容代码。',
    '',
    '你的每次输出都将视为一个版本，你最开始输出的是 V1。',
    '后续我会告诉你需要基于哪个版本操作和输出，你只需要在对应的版本上输出即可。',
    '',
    '生成要求：',
    '1. 必须根据大纲的每一个层级的标题(必须将每个层级(每个单独的 "-")视为单独的一页)，生成对应的内容并且对内容进行更详细的分解和排版',
    '2. 同时可以在当前页面增加一些视觉元素，例如图片、视频和引用，图片和视频必须真实有效',
    '3. 生成的内容是够美观和饱满, 如果差强人意，就需要重新修改',
    '4. 不允许太简短和一句话！！！！！！！！！！！',
    '',
    '输出格式：',
    '1. 我需要你直接输出 markdown，并且严格按照 slidev 的格式。',
    '2. 不允许在 markdown 外有其他文字',
    '3. 回复需要使用中文',
    '4. 不需要带上 ```markdown 这种',
    '5. 标题中的数字不要带',
    '',
    `我的主题是：${title}`,
    '',
    '我的大纲是：',
    '',
    stringifyOutline(outline),
  ].join('\n')
}


export function iterationModifySlidevPrompt(version: number) {
  // 用户每次手动修改后的 Slidev 代码，不一定要喂给GPT，一般都是通过美化命令和辅助命令来修改的。所以这里需要拆分成多个 prompt
  return [
    `现在我将我基于 V${version} 版本修改后的 Slidev 代码发送给你。`,
    `记住最开始的输出格式和输出要求。给出修改后的 Slidev 代码 V${version + 1}`,
    '',
    `以下是我修改后的 Slidev 代码：`,
  ].join('\n')
}

export function presetSliveSyntaxPrompt() {
  return [
    { role: Role.System, content: '' },
  ] as unknown as ChatCompletion.Choice['message'][]
}
