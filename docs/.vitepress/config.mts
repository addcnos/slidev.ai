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
      { text: '核心功能', link: '/features/home' },
      { text: '贡献指南', link: '/contributing/guide' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: '简介',
          items: [
            { text: '什么是SlidevAI', link: '/guide/what-is-slidevai' },
            { text: '快速开始', link: '/guide/getting-started' },
            { text: '配置', link: '/guide/configuration' },
            { text: '部署', link: '/guide/deploy' },
          ]
        }
      ],
      '/features/': [
        {
          text: '核心功能',
          items: [
            { text: '首页功能', link: '/features/home' },
            { text: '智能大纲生成', link: '/features/outline' },
            { text: '幻灯片内容创作', link: '/features/create' },
            { text: '图片生成与优化', link: '/features/image' },
            { text: '内容润色与完善', link: '/features/polish' },
            { text: '一键部署与分享', link: '/features/deploy' },
          ]
        }
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/addcnos' }
    ]
  }
})
