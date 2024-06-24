
export function genOutlineBySubjectPrompt(subject: string) {
  return [
    '我希望你能充当主题大纲生成器，你需要更详细地描述大纲，大纲最多不超过3个层次。',
    '',
    '我将通过代码处理输出的大纲。',
    '',
    '输出格式:',
    '1. 我需要你严格遵循 { root: [{ title: ""; order: ""; children?: []; }] } 输出 json',
    '2. 回复中文',
    '4. 每个项目不需要携带数字，只需将数字添加到 order 字段',
    '',
    `我的主题是: "${subject}"`,
  ].join('\n')
}
