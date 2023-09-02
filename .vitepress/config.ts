import type { DefaultTheme } from 'vitepress'
import { defineConfig } from 'vitepress'
import { applyPlugins } from './plugins/code'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'My Awesome Project',
  description: 'A VitePress Site',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: nav(),
    sidebar: {
      '/guide/': { base: '/guide/', items: sideBarGuide() },
      '/custom/': { base: '/custom/', items: sideBarCustom() },
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present fightwithtiger',
    },
  },
  markdown: {
    config: (md) => {
      applyPlugins(md)
    },
  },
})

function nav(): DefaultTheme.NavItem[] {
  return [
    { text: 'Home', link: '/' },
    { text: 'Guide', link: '/guide/what-is-pkg', activeMatch: '/guide/' },
    { text: 'Custom', link: '/custom/sample', activeMatch: '/custom/' },
  ]
}

function sideBarGuide(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Introduction',
      collapsed: false,
      items: [
        { text: 'What is Pkg?', link: '/what-is-pkg' },
        { text: 'Getting Started', link: '/getting-started' },
      ],
    },
    {
      text: 'Examples',
      collapsed: false,
      items: [
        { text: 'Markdown Examples', link: '/markdown-examples' },
        { text: 'Runtime API Examples', link: '/api-examples' },
      ],
    },
  ]
}

function sideBarCustom(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Custom',
      collapsed: false,
      items: [
        { text: 'Sample', link: '/sample' },
        { text: 'Todo', link: '/todo' },
      ],
    },
  ]
}
