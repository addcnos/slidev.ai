---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

title: SlidevAI
titleTemplate: 新一代PPT制作工具

hero:
  name: "Slidev AI"
  text: "Slidev & OpenAI\n开源演示文稿工具"
  tagline: "新一代幻灯片制作工具"
  actions:
    - theme: brand
      text: 什么是SlidevAI
      link: /guide/what-is-slidevai
    - theme: alt
      text: 快速开始
      link: /guide/getting-started
  image:
    src: /logo-no-background.png
    alt: Slidev.AI

features:
  - title: AI 辅助创作
    details: 利用 OpenAI 技术，智能生成幻灯片内容，提高创作效率
  - title: 开源灵活
    details: 基于 Slidev 开源框架，支持 Markdown 编写，易于定制和扩展
  - title: 美观现代
    details: 提供多种精美主题和动画效果，让您的演示更加吸引人
  - title: 一键导出
    details: 支持多种导出格式，包括PDF、图片和在线演示，方便快速分享和展示您的演示文稿内容
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #6A704C 30%, #c0b5a5);
  --vp-c-brand-3: #6A704C;
  --vp-button-brand-hover-bg: #5C603C;
  --vp-button-brand-active-bg: #4F5230;

  --vp-home-hero-image-background-image: linear-gradient(-45deg, #6A704C 50%, #EDE1D1 50%);
  --vp-home-hero-image-filter: blur(44px);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}
</style>
