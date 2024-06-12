export function initUsePreset(preset: string) {
  return [
    'The following is the default template that you can use as a reference to generate your Slidev code: ',
    preset,
  ].join('\n')
}

export function initSlidevPrompt(theme: string) {
  return [
    'you need to generate the corresponding slidev markdown content code based on the text content I provide.',
    '',
    'Generation requirements:',
    '1. Generate the corresponding content and further decompose and layout the content',
    '2. The content should not be too much or too little. You can add some visual elements to the current page, such as pictures (remember that you can call the picture generation), code blocks, write HTML, etc.',
    '3. Is the generated content beautiful and full? If it is barely satisfactory, you need to modify it again',
    '4. Not too short and one sentence!!!!!!!!!!!!',
    '5. Add animation for each page switch',
    '6. You do not need to generate the conclusion',
    '7. You need to provide a simple theme welcome page at the beginning',
    '',
    'Output format:',
    '1. I need you to output markdown directly and strictly follow the format of slidev.',
    '2. No other text is allowed outside of markdown',
    '3. The reply needs to be in Chinese',
    '4. Do not need to bring ```markdown',
    '5. Do not bring the numbers in the title',
    '6. You only need to generate the content of the current page, and you do not need to generate the content of the entire slidev',
    '7. You never use any component',
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
