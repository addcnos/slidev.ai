export function initUsePreset() {
  return ''
  return [
    "Markdown Syntax: Slides are written within a single markdown file (by default ./slides.md). Use Markdown features with inlined HTML and Vue Components. Styling using UnoCSS is supported. Use --- padded with a new line to separate your slides.",
    "Example: ---\\n# Slidev\\nHello, World!\\n---\\n# Page 2\\n```ts\\nconsole.log('Hello, World!')\\n```\\n---\\n# Page 3\\n<div class='p-3'><Tweet id='20' /></div>",
    "Frontmatter & Layouts: Specify layouts and metadata for each slide using frontmatter blocks. Frontmatter starts and ends with triple-dash. Texts between them are YAML data objects.",
    "Example: ---\\nlayout: cover\\n---\\n# Slidev\\nThis is the cover page.\\n---\\nlayout: center\\nbackground: './images/background-1.png'\\nclass: 'text-white'\\n---\\n# Page 2\\nThis is a page with the layout center and a background image.",
    "Prettier Support: Install the Prettier Plugin or use a direct yaml code block to define the frontmatter.",
    "Example: ---\\nlayout: cover\\n---\\n# Slidev\\nThis is the cover page.\\n---\\n```yaml\\nlayout: center\\nbackground: './images/background-1.png'\\nclass: 'text-white'\\n```",
    "Code Blocks: Use Markdown flavored code blocks to highlight your code. Support for Prism and Shiki as syntax highlighters.",
    "Example: ```ts\\nconsole.log('Hello, World!')\\n```",
    "Line Highlighting: Highlight specific lines by adding line numbers within brackets {}. Enable line numbers globally or individually. Change highlights with multiple clicks using |. Hide code block or no highlight using hide or none. Set maxHeight to enable scrolling for long code blocks.",
    "Example: ```ts {2,3}\\nfunction add(\\n  a: Ref<number> | number,\\n  b: Ref<number> | number\\n) {\\n  return computed(() => unref(a) + unref(b))\\n}\\n```",
    "TwoSlash Integration: Render TypeScript code blocks with type information on hover. Add twoslash to the code block's language identifier.",
    "Example: ```ts twoslash\\nimport { ref } from 'vue'\\nconst count = ref(0)\\n// ^?\\n```",
    "Shiki Magic Move: Enable granular transition between code changes. Wrap multiple code blocks with magic-move. Mix Magic Move with line highlighting.",
    "Example: `````md\\n````md magic-move\\n```js\\nconsole.log(`Step ${1}`)\\n```\\n```js\\nconsole.log(`Step ${1 + 1}`)\\n```\\n```ts\\nconsole.log(`Step ${3}` as string)\\n```\\n````\\n`````",
    "Monaco Editor: Turn code block into a Monaco editor with {monaco}.",
    "Example: ```ts {monaco}\\nconsole.log('HelloWorld')\\n```",
    "Monaco Diff: Generate a diff between two code blocks with {monaco-diff}.",
    "Example: ```ts {monaco-diff}\\nThis line is removed on the right.\\njust some text\\nabcd\\nefgh\\nSome more text\\n~~~\\njust some text\\nabcz\\nzzzzefgh\\nSome more text.\\nThis line is removed on the left.\\n```",
    "Embedded Styles: Use <style> tag in Markdown to override styles for the current slide.",
    "Example: # This is Red\\n<style>\\nh1 {\\n  color: red\\n}\\n</style>",
    "Static Assets: Use images pointing to remote or local URLs.",
    "Example: ![Remote Image](https://sli.dev/favicon.png)\\n![Local Image](/pic.png)\\n<img src='/pic.png' class='m-40 h-40 rounded shadow' />",
    "Notes: Take notes for each slide, shown in Presenter Mode.",
    "Example: ---\\nlayout: cover\\n---\\n# Page 1\\nThis is the cover page.\\n<!-- This is a note -->\\n---\\n# Page 2\\n<!-- This is NOT a note because it precedes the content of the slide -->\\nThe second page\\n<!--\\nThis is another note\\n-->",
    "Click Markers: Use [click] markers to highlight and auto-scroll notes.",
    "Icons: Access popular open-source iconsets directly in Markdown.",
    "Example: <mdi-account-circle />\\n<carbon-badge />\\n<uim-rocket />\\n<twemoji-cat-with-tears-of-joy />\\n<logos-vue />",
    "Styling Icons: Style icons like HTML elements.",
    "Example: <uim-rocket />\\n<uim-rocket class='text-3xl text-red-400 mx-2' />\\n<uim-rocket class='text-3xl text-orange-400 animate-ping' />",
    "Slots: Use Vue's named slots for multiple contributing points.",
    "Example: ---\\nlayout: two-cols\\n---\\n<template v-slot:default>\\n# Left\\nThis shows on the left\\n</template>\\n<template v-slot:right>\\n# Right\\nThis shows on the right\\n</template>",
    "Import Code Snippets: Import code snippets from existing files.",
    "Example: <<< @/snippets/snippet.js",
    "Configurations: Define configurations in the Markdown file.",
    "Example: ---\\ntheme: seriph\\nlayout: cover\\nbackground: 'https://source.unsplash.com/1600x900/?nature,water'\\n---\\n# Slidev\\nThis is the cover page.",
    "LaTeX: Support for LaTeX, powered by KaTeX. Inline and block rendering for LaTeX. LaTeX line highlighting.",
    "Example: $\\sqrt{3x-1}+(1+x)^2$\\n$$\\n\\begin{array}{c}\\n\\nabla \\times \\vec{\\mathbf{B}} -\\, \\frac1c\\, \\frac{\\partial\\vec{\\mathbf{E}}}{\\partial t} &= \\frac{4\\pi}{c}\\vec{\\mathbf{j}}    \\nabla \\cdot \\vec{\\mathbf{E}} &= 4 \\pi \\rho \\\\ \\nabla \\times \\vec{\\mathbf{E}}\\, +\\, \\frac1c\\, \\frac{\\partial\\vec{\\mathbf{B}}}{\\partial t} &= \\vec{\\mathbf{0}} \\\\ \\nabla \\cdot \\vec{\\mathbf{B}} &= 0\\n\\end{array}\\n$$",
    "Diagrams: Create diagrams from textual descriptions using Mermaid.",
    "Example: ```mermaid\\nsequenceDiagram\\n  Alice->John: Hello John, how are you?\\n  Note over Alice,John: A typical interaction\\n```",
    "Multiple Entries: Split slides.md into multiple files. Merge frontmatters from main entry and external markdown pages. Reuse pages with multi-entries support.",
    "Example: ---\\nsrc: ./subpage2.md\\n---\\n# Page 2\\nThis page is from another file",
    "MDC Syntax: Optional MDC Syntax powered by markdown-it-mdc.",
    "Example: ---\\nmdc: true\\n---\\nThis is a [red text]{style='color:red'} :inline-component{prop='value'}\\n![](/image.png){width=500px lazy}\\n::block-component{prop='value'}\\nThe **default** slot\\n::",
    "Customizations: Fully customizable from styling to tooling configurations.",
    "Frontmatter Configures: Configure Slidev in the frontmatter of the first slide.",
    "Example: ---\\ntheme: default\\ntitle: Slidev\\npresenter: true\\nexport: {format: pdf, timeout: 30000}\\nhighlighter: shiki\\nmonaco: dev\\nremoteAssets: false\\nselectable: true\\nrecord: dev\\ncolorSchema: auto\\naspectRatio: 16/9\\ncanvasWidth: 980\\n---",
    "Per slide configuration: Each slide accepts additional configuration in the Frontmatter block.",
    "Example: ---\\nclicks: 3\\ndisabled: false\\nhideInToc: true\\nlayout: cover\\nlevel: 2\\npreload: true\\nrouteAlias: '/custom'\\nsrc: './custom.md'\\ntitle: Custom Slide\\ntransition: 'fade'\\nzoom: 1.2\\n---",
  ].join('\n')
}

export function initSlidevPrompt(theme: string) {
  return [
    '你需要根据我给出的主题生成内容 (Markdown)',
    '我会将每一页需要生成的内容发送给你',
    // '',
    // '你可以使用的工具有:',
    // '1. 图片生成',
    '',
    '每次生成的要求如下:',
    '1. 你需要在一屏幕大小的尺寸中，尽可能生成丰富的内容，需要注意你需要用 html 标签来进行排版',
    '2. 你在生成的时候需要思考，是否超出屏幕尺寸，并且是否有使用布局来进行排版',
    '3. 切换的时候需要有过渡动画',
    '4. 你需要在开头提供一个简单的主题欢迎页面',
    '',
    '输出格式:',
    '1. 我需要你直接输出 markdown',
    '2. 需要回复中文',
    '4. 不需要带上 ```markdown',
    '6. 只需要生成当页面的主题内容',
    '7. 你不要包含任何 vue 组件，只需要生成 markdown 内容即可',
    '',
    '我的主题是: ' + theme,
  ].join('\n')
}

export function genSingleSlidevPrompt(process: string, title: string) {
  return [
    '当前页面需要的内容是是: ' + title,
    '请根据要求生成当前页面的内容',
  ].join('\n')
}

export function beautifySlidevPrompt(process: string, message: string) {
  return [
    'I think the content here is not very satisfied, you can modify it again to make the content more rich',
    '',
    'Here are my requirements:',
    message
  ].join('\n')
}

export function expendSlidevPrompt(_: string, message: string, content: string) {
  return [
    '我觉得当前内容不够丰富，你需要按照我的要求来扩写内容',
    '',
    '这里是我的要求:',
    message,
    '',
    '当前的内容是:',
    content
  ].join('\n')
}

export function polishSlidevPrompt(process: string, message: string, content: string) {
  return [
    '我觉得这里的内容太死板了，你可以再修改一下，让内容更流畅',
    '',
    '这里是我的要求:',
    message,
    '',
    '当前的内容是:',
    content
  ].join('\n')
}

export function insertImage2SlidevPrompt(process: string, message: string) {
  return [
    'The current process is: ' + process,
    'You need to insert an image by calling the image generation on the current page, and the content of the image is: ' + message
  ].join('\n')
}

export function insertMyImage2SlidevPrompt(process: string, path: string) {
  return [
    'The current process is: ' + process,
    'This is the image I uploaded, you need to insert it into the current page',
    'The path of the image is: ' + path
  ].join('\n')
}
