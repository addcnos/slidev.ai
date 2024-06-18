export function initUsePreset() {
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
    'you need to generate the corresponding slidev markdown content code based on the text content I provide.',
    '',
    'Generation requirements:',
    '1. Generate the corresponding content and further decompose and layout the content',
    '2. You can add some visual elements to the current page, such as pictures (remember that you can call the picture generation), code blocks, write HTML, etc.',
    '3. Is the generated content beautiful and full? If it is barely satisfactory, you need to modify it again',
    '4. Add animation for each page switch',
    '5. You do not need to generate the conclusion',
    '6. You need to provide a simple theme welcome page at the beginning',
    '',
    'Output format:',
    '1. I need you to output markdown directly and strictly follow the format of slidev.',
    '2. No other text is allowed outside of markdown',
    '3. The reply needs to be in Chinese',
    '4. Do not need to bring ```markdown',
    '5. Do not bring the numbers in the title',
    '6. You only need to generate the content of the current page, and you do not need to generate the content of the entire slidev',
    '7. You never use any component',
    '8. You are not allowed to use external pictures. If you want to use pictures, please call the function generateImage',
    '',
    'The current theme is: ' + theme,
  ].join('\n')
}

export function genSingleSlidevPrompt(title: string, process: string,) {
  return [
    'The current page is: ' + title,
    'The current process is: ' + process,
    'Please generate the content of the current page according to the requirements',
    'Only need to generate the content of the current page, and do not need to generate the content of the entire slidev',
  ].join('\n')
}

export function instertSlidevPrompt(
  position: string,
  process: string,
  message: string
) {
  return [
    'The current process in after inserting is: ' + process,
    'The current page is the ' + position + ' page',
    'Please insert the content of the current page according to the requirements',
    '',
    'Here are my requirements:',
    message
  ].join('\n')
}

export function beautifySlidevPrompt(process: string, message: string) {
  return [
    'The current process is: ' + process,
    'I think the content here is not very satisfied, you can modify it again to make the content more rich',
    '',
    'Here are my requirements:',
    message
  ].join('\n')
}

export function expendSlidevPrompt(process: string, message: string) {
  return [
    'The current process is: ' + process,
    'I think the content here is too little, you can expand it in more detail',
    '',
    'Here are my requirements:',
    message
  ].join('\n')
}

export function polishSlidevPrompt(process: string, message: string) {
  return [
    'The current process is: ' + process,
    'I think the content here is too stiff, you can modify it again to make the content smoother',
    '',
    'Here are my requirements:',
    message
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
