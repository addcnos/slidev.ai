import { SlidevBlock, SlidevBlockType } from "@renderer/types/slidev"

const CROSS_COMPONENT = '<CrossMessage />'


export function normalizeSlidev2Json(code: string): SlidevBlock[] {
  const blocks = code.split('---')
  const slides: SlidevBlock[] = []
  blocks.forEach((block, idx) => {
    let content = block.trim()
    if (content.toLocaleLowerCase().includes(CROSS_COMPONENT.toLocaleLowerCase())) {
      slides.push({
        type: SlidevBlockType.CrossComponent,
        content: CROSS_COMPONENT
      })
    }
    content = content.replace(CROSS_COMPONENT, '')
    slides.push({
      type: idx === 0 ? SlidevBlockType.Header : SlidevBlockType.Block,
      content
    })
  })
  return slides
}

export function normalizeSlidev2Markdown(slides: SlidevBlock[]) {
  const filter = slides.filter(slide => slide.type !== SlidevBlockType.CrossComponent)
  return `${filter.map(slide => slide.content).join('\n---\n')}${CROSS_COMPONENT}`
}
