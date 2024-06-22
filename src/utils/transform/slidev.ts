import { parse, stringifySlide } from "../parser/slidev"
import { SourceSlideInfo } from "@slidev/types"

const CROSS_COMPONENT = '<CrossMessage />'

export async function normalizeSlidev2Json(code: string) {
  code = code.replace(new RegExp(CROSS_COMPONENT, 'g'), '')
  return (await parse(code)).slides
}

export function normalizeSlidev2Markdown(slides: SourceSlideInfo[]) {
  return `${slides.map(stringifySlide).join('\n').trim()}\n <!-- ${+new Date()} -->\n ${CROSS_COMPONENT}\n`
}
