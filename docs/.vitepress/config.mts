import { createRequire } from 'module'
import { defineConfig } from 'vitepress'

const require = createRequire(import.meta.url)
const pkg = require('vitepress/package.json')

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Slidev AI",
  description: "结合 Slidev & OpenAI",

  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,


  /* prettier-ignore */
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/logo-min.png' }],
    ['meta', { name: 'theme-color', content: '#6A704C' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Slidev AI | 结合 Slidev & OpenAI' }],
    ['meta', { property: 'og:site_name', content: 'Slidev AI' }],
  ],

  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/what-is-slidevai' },
      { text: '参考', link: '/reference/' },
      { text: '资源', link: '/resources/' },
      {
        text: pkg.version,
        items: [
          {
            text: '更新日志',
            link: 'https://github.com/vuejs/vitepress/blob/main/CHANGELOG.md'
          },
          {
            text: '参与贡献',
            link: 'https://github.com/vuejs/vitepress/blob/main/.github/contributing.md'
          }
        ]
      }
    ],

    sidebar: {
      '/guide/': [
        {
          text: '简介',
          items: [
            { text: '什么是SlidevAI', link: '/guide/what-is-slidevai' },
            { text: '快速开始', link: '/guide/getting-started' },
            { text: '配置', link: '/guide/configuration' },
            { text: '部署', link: '/guide/deploy' }
          ]
        }
      ],
      '/features/': [
        {
          text: '功能列表',
          items: [
            { text: '什么是SlidevAI', link: '/features/what-is-slidevai' },
            { text: '快速开始', link: '/features/getting-started' },
            { text: '配置', link: '/features/configuration' },
            { text: '部署', link: '/features/deploy' }
          ]
        }
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-repo/slidev-ai' }
    ]
  }
})
