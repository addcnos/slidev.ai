import { describe, expect, it } from "vitest";
import { stringifyOutline } from './outline'

describe("outline", () => {
  it("stringifyOutline", () => {
    expect(stringifyOutline([
      {
        title: "title1",
        order: 1,
        children: [
          {
            title: "title1-1",
            order: 1,
            children: [
              { title: "title1-1-1", order: 2, children: [] },
            ]
          },
          { title: "title1-2", order: 2, children: [] },
        ]
      },
      { title: "title2", order: 2, children: [] },
    ])).toMatchInlineSnapshot(`
      "- title1
        - title1-1
          - title1-1-1
        - title1-2
      - title2
      "
    `)
  })
})
