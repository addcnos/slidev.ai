import { parse, stringifySlide } from "../parser/slidev"
import { SourceSlideInfo } from "@slidev/types"

const CROSS_COMPONENT = '<CrossMessage />'

export async function normalizeSlidev2Json(code: string) {
  code = code.replace(new RegExp(CROSS_COMPONENT, 'g'), '')
  return (await parse(code)).slides.map((data) => {
    if (data.frontmatterDoc && Object.keys(data.frontmatterDoc.toJSON()).length > 0) {
      const head = data.frontmatterDoc.toJSON()
      data.raw = data.raw.slice(0, data.frontmatterDoc.range![0]) + data.raw.slice(data.frontmatterDoc.range![2])
      data.raw = `<!--& ${JSON.stringify(head)} &-->\n${data.raw}`
    }
    return data
  })
}

export function normalizeSlidev2Markdown(slides: SourceSlideInfo[]) {
  return `${slides.map((data, idx) => {
    const jsonReg = /<!--&\s*(.*?)\s*&-->/g
    const extractHead = jsonReg.exec(data.raw)
    if (!extractHead) {
      return stringifySlide(data, idx)
    }
    const json = extractHead[1]
    try {
      if (json && json !== 'null') {
        const head = JSON.parse(json)
        data.raw = data.raw.replace(jsonReg, '')
        const yaml = Object.keys(head).map(key => `${key}: ${head[key]}`).join('\n')
        data.raw = `---\n${yaml}\n---\n${data.raw}`
      }
    } catch (e) {
      console.error('JSON 解析失败', e)
    }
    return stringifySlide(data, idx)
  }).join('\n').trim()}\n <!-- ${+new Date()} -->\n ${CROSS_COMPONENT}\n`
}
