export function initUsePreset() {
  return [

  ].join('\n')
}

export function initSlidevPrompt(theme: string) {
  return [
    '你需要根据我给出的主题生成内容 (Markdown+HTML)',
    '我会将每一页需要生成的内容发送给你',
    '',
    '你可以使用的工具有:',
    '1. 图片生成 (不允许使用外部图片，并且不允许出现generated-image-url！！！！！！，这时候你应该调用生成)',
    '',
    '以下为约定的一些规则或者扩展 Markdown 的语法',
    '1. 如果你需要在后续的 Markdown 中附加一些东西你可以使用 <!--& { JSON } &--> 来表示，其中 JSON 为你需要附加的内容，每条回答仅切只能包含一个',
    `2. <!--& { JSON } &--> 中可用的 key 和约定如下有: \`\`\`ts\ninterface Key{\nlayout:'center'|'cover'/**可以用key为background来设置背景图片*/|'default'|transition:'fade'|/**淡入/淡出*/'fade-out'|/**淡出然后淡入*/'slide-left'|/**向左滑动（向后滑动时向右滑动）*/'slide-right'|/**向右滑动（向后滑动时向左滑动）*/'slide-up'|/**滑动至顶部（向后滑动至底部）*/'slide-down'/**滑动至底部（向后滑动至顶部）*/,\nbackground:string/**背景(调用图片生成url)*/}\`\`\``,
    `3. 你可以将代码块标记为 mermaid 以使用 mermaid 渲染代码块`,
    '',
    '每次生成的要求如下:',
    '1. 你需要在一屏幕大小的尺寸中，生成丰富的内容(内容不超过20行)，需要注意在一些情况下你需要用 html 标签来进行排版(非常重要)',
    '2. 你在生成的时候需要思考，是否超出屏幕尺寸，并且是否有使用布局来进行排版',
    '3. 切换的时候需要有过渡动画',
    '4. 每一条回答都需要附带 (非常重要) <!--& { JSON } &--> (非常重要)',
    '5. 你必须需要将 Markdown 的内容用 <v-clicks>\n</v-clicks> 包裹，但是第一个标题不需要包裹, 这里是例子:```例子1\n#这里是标题\n<v-clicks>\n\n## 这里是子标题\n这里是内容\n##这里是另一个子标题\n这里是内容\n</v-clicks>\n```\n```例子2\n<v-clicks>\n\n- Item 1\n- Item 2\n- Item 3\n\n</v-clicks>```\n```例子3\n#这里是标题\n<v-clicks>\n\n- Item 1\n\t- Item 1-1\n\t- Item 1-2\n- Item 2\n- Item 3\n</v-clicks>\n```\n',
    '',
    '输出格式:',
    '1. 我需要你直接输出 markdown',
    '2. 需要回复中文',
    '3. 不需要带上 ```markdown',
    '4. 只需要生成当页面的主题内容',
    '5. 每一条回答都需要附带 (非常重要) <!--& { JSON } &--> (非常重要)',
    '',
    '我的主题是: ' + theme,
  ].join('\n')
}

export function genSingleSlidevPrompt(process: string, title: string) {
  return [
    '当前页面需要的内容是是: ' + title,
    ...(process === '1' ? ['当前页面 layout 必须为 cover, 并且必须使用 background 设置图片，background 图片必须由工具生成，并且当前页面不允许有 <v-clicks />'] : []),
    '请根据要求生成当前页面的内容',
  ].join('\n')
}

export function beautifySlidevPrompt(process: string, message: string, content: string) {
  return [
    '我觉得这里的内容不是很满意，可以基于当前的内容再修改一下',
    '',
    '这里是我的要求:',
    message,
    '注意：如果生成了图片的输出格式为 <img v-drag src="" />',
    '',
    '当前的内容是:',
    content
  ].join('\n')
}

export function expendSlidevPrompt(_: string, message: string, content: string) {
  return [
    '我觉得当前内容不够丰富，你需要按照我的要求来扩写当前的内容',
    '',
    '这里是我的要求:',
    message,
    '注意：如果生成了图片的输出格式为 <img v-drag src="" />',
    '',
    '当前的内容是:',
    content
  ].join('\n')
}

export function polishSlidevPrompt(process: string, message: string, content: string) {
  return [
    '我觉得这里的内容太死板了，你可以再修改一下，让当前的内容更流畅',
    '',
    '这里是我的要求:',
    message,
    '注意：如果生成了图片的输出格式为 <img v-drag src="" />',
    '',
    '当前的内容是:',
    content
  ].join('\n')
}

export function insertImage2SlidevPrompt(process: string, message: string) {
  return [
    '帮我生成一张图片, 并且将生成的内容直接返回给我, 你不需要额外回复任何文本。',
    '',
    '这里是我的要求:',
    message,
  ].join('\n')
}

