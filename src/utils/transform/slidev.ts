import { useOutlineStore } from "@renderer/store"
import { parse, stringifySlide } from "../parser/slidev"
import { SourceSlideInfo } from "@slidev/types"

export const CROSS_COMPONENT = '<CrossMessage />'

export async function normalizeSlidev2Json(code: string) {
  const { outline } = useOutlineStore()
  code = code.replace(new RegExp(CROSS_COMPONENT, 'g'), '')
  return (await parse(code)).slides.map((data) => {
    if (data.frontmatterDoc && Object.keys(data.frontmatterDoc).length > 0) {
      const head = data.frontmatterDoc.toJSON()
      if (!head) {
        return data
      }
      data.raw = data.raw.slice(0, data.frontmatterDoc.range![0]) + data.raw.slice(data.frontmatterDoc.range![2] + 9)
      if (outline.value.theme) {
        head['theme'] = outline.value.theme
      }
      data.raw = `<!--& ${JSON.stringify(head)} &-->\n${data.raw}`.replace(/<!--\s\d+\s-->/g, '')
    }
    return data
  })
}

export function normalizeSlidev2Markdown(slides: SourceSlideInfo[], headExtra?: boolean) {
  const { outline } = useOutlineStore()
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
        if (headExtra && idx === 0) {
          if (outline.value.theme) {
            head['theme'] = outline.value.theme
          }
          head['presenter'] = 'build'
          head['record'] = 'build'
        }
        data.raw = data.raw.replace(jsonReg, '')
        const yaml = Object.keys(head).map(key => `${key}: ${head[key]}`).join('\n')
        data.raw = `---\n${yaml}\n---\n${data.raw}`
      }
    } catch (e) {
      console.error('JSON 解析失败', e)
    }
    const res = stringifySlide(data, idx)
    return res.replace(/<!--\s\d+\s-->/g, '')
  }).join('\n').trim()}\n <!-- ${+new Date()} -->\n ${CROSS_COMPONENT}\n`
}
