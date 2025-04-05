import { defineConfig } from 'vitepress'

export default defineConfig({
  // 站点级配置
  title: '我的文档', // 默认标题（中文）
  description: '一个基于 VitePress 的国际化文档站点',
  // 国际化配置
  locales: {
    // 中文作为默认语言（根路径）
    root: {
      label: '简体中文', // 导航栏下拉菜单显示的名称
      lang: 'zh-CN',     // HTML 的 lang 属性
      title: '我的文档', // 中文标题
      description: '一个基于 VitePress 的国际化文档站点',
      themeConfig: {
        nav: [
          { text: '首页', link: '/' },
          { text: 'MT4 MT5', link: '/zh/mt5' },
          { text: '文华T8', link: '/zh/t8' }
        ],
        sidebar: {
          
          '/zh/mt5': [
            {
              text: '螺纹钢',
              collapsed:true,
              items: [
                { text: '指南', link: '/zh/mt5' },
                { text: '介绍', link: '/zh/mt5/introduction' }
              ]
            },
            {
              text: '铁矿',
              collapsed:true,
              items: [
                { text: '指南', link: '/zh/guide' },
                { text: '介绍', link: '/zh/introduction' }
              ]
            }
          ]
        }
      }
    },
    // 英文作为可选语言
    en: {
      label: 'English',  // 导航栏下拉菜单显示的名称
      lang: 'en-US',     // HTML 的 lang 属性
      link: '/en/',      // 英文内容的路径前缀
      title: 'My Docs',  // 英文标题
      description: 'An internationalized documentation site powered by VitePress',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Guide', link: '/en/guide' }
        ],
        sidebar: {
          '/en/': [
            {
              text: 'Guide',
              items: [
                { text: 'Introduction', link: '/en/guide' }
              ]
            }
          ]
        }
      }
    }
  },

  // 主题配置（适用于所有语言的通用设置）
  themeConfig: {
    // 通用社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-repo' }
    ],
    // 页脚
    footer: {
      message: '基于 MIT 许可发布',
      copyright: '版权所有 © 2025'
    },
    // 搜索功能
    search: {
      provider: 'local'
    }
  }
})