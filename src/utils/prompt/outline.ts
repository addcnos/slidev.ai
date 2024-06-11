import { stringifyOutline } from "../transform/outline"
import { Outline } from "../../types/outline"

export function genOutlineBySubjectPrompt(subject: string) {
  return [
    'I hope you can act as a theme outline generator, you need to describe the outline in more detail, and the outline should not exceed 3 levels at most.',
    '',
    'I will process the outline you output through code.',
    '',
    'Each of your outputs will be regarded as a version of the outline, and the outline you initially output is V1.',
    'Later I will tell you which version to operate and output based on, you only need to output on the corresponding version.',
    'If I add or modify a chapter, I will add <!-- expansion --> to tell you to expand or modify the sub-items, otherwise you only need to keep the original content without modification',
    '',
    'Output format:',
    '1. I need you to strictly follow { root: [{ title: ""; order: ""; children?: []; }] } output json',
    '2. Reply in Chinese',
    '3. Your output does not need to be marked with <!-- expansion -->',
    '4. Each item does not need to carry a number, just add the number to the order field',
    '',
    `My theme is: "${subject}"`,
  ].join('\n')
}


export function iterationModifyOutlinePrompt(outline: Outline[], version: number) {
  return [
    `now I will send you the outline modified based on V${version}.`,
    'Remember the initial output format and output requirements. Give the modified outline V${version + 1}',
    'Strictly follow the initial output format and output requirements.',
    '',
    'Here is the outline I modified:',
    stringifyOutline(outline)
  ].join('\n')
}
