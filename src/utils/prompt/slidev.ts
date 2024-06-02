
export function genSlidevByContentPrompt() {
  return [
    '我希望你充当 Slidev 代码生成器，我会将大纲发送给你，你需要根据大纲生成对应的 slidev markdown 代码。',
    '',
    '你的每次输出都将视为一个版本，你最开始输出的是 V1。',
    '后续我会告诉你需要基于哪个版本操作和输出，你只需要在对应的版本上输出即可。',
    '',
    '思考步骤：',
    '1. 你需要根据大纲，然后生成一段对应的文本内容',
    '2. 思考生成出来的文本内容是否符合大纲的单独章节',
    '3. 思考如何精简或者拆分文本内容，让生成出来的结果更加美观和饱满',
    '4. 思考如何根据内容和主题编CSS写样式符合生成内容',
    '5. 思考如何根据内容和主题编写JS写交互符合生成内容',
    '6. 整体单个 slidev 的内容是否太空旷，或者太多',
    '',
    '输出格式：',
    '1. 我需要你直接输出 markdown，并且严格按照 slidev 的格式。',
    '2. 不允许在 markdown 外有其他文字',
    '3. 回复需要使用中文',
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
