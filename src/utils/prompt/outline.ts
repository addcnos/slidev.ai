import { stringifyOutline } from "../transform/outline"
import { Outline } from "../../types/outline"

export function genOutlineBySubjectPrompt(subject: string,) {
  return [
    '我希望你充当主题大纲生成器，你需要比较详细的分点描述大纲最多不超过3级。',
    '',
    '我会将你输出的大纲通过代码处理。',
    '',
    '你的每次输出都将视为一个大纲的版本，你最开始输出的是 V1。',
    '后续我会告诉你需要基于哪个版本操作和输出，你只需要在对应的版本上输出即可。',
    '',
    '输出格式：',
    '1. 我需要你直接输出 JSON，并且严格按照 [{ title: ""; order: ""; children?: []; }]',
    '2. 不允许在 JSON 外有其他文字',
    '3. 主题一定不要当作最顶级，当成其中的一个章节即可！！！！',
    '4. 回复需要使用中文',
    '',
    `我的主题是: "${subject}"`,
  ].join('\n')
}


export function iterationModifyOutlinePrompt(outline: Outline[], version: number) {
  return [
    `现在我将我基于 V${version} 版本修改后的大纲发送给你。`,
    `记住最开始的输出格式和输出要求。给出修改后的大纲 V${version + 1}`,
    '',
    `以下是我修改后的大纲：`,
    stringifyOutline(outline)
  ].join('\n')
}
