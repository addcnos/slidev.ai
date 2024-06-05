import { SlidevBlock, SlidevBlockType } from "@renderer/types/slidev"
import { parse } from "../parser/slidev"

const CROSS_COMPONENT = '<CrossMessage />'

// TODO 解析 Markdown 为 JSON
export async function normalizeSlidev2Json(code: string) {
  return (await parse(code, '11')).slides
}

export function normalizeSlidev2Markdown(slides: SlidevBlock[]) {
  const filter = slides.filter(slide => slide.type !== SlidevBlockType.CrossComponent)
  return `${filter.map(slide => slide.content).join('\n---\n')}${CROSS_COMPONENT}`
}
