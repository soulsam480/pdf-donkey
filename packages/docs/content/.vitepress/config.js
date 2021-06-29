/**
 * @type {import('vitepress').UserConfig<import('vitepress').DefaultTheme.Config>}
 */
module.exports = {
  lang: 'en-US',
  markdown: {
    anchor: { permalink: true },
    linkify: true,
    toc: { includeLevel: [1, 2, 3] },
  },
  title: 'PDF Donkey',
  description: 'Generate PDFs on the fly.',
  themeConfig: {
    nextLinks: true,
    prevLinks: true,
    repo: 'soulsam480/pdf-donkey',
    docsDir: 'packages/docs',
    editLinks: true,
    editLinkText: 'Edit this page on GitHub',
    lastUpdated: 'Last Updated',
    logo: '/donkey-trans.png',
    nav: [
      { text: 'Guide', link: '/guide/index.html', activeMatch: '^/guide/' },
      {
        text: 'Advanced',
        link: '/advanced/backend.html',
        activeMatch: '^/advanced/',
      },
      {
        text: 'Release Notes',
        link: 'https://github.com/soulsam480/pdf-donkey/releases',
      },
    ],
    sidebar: {
      '/': getSidebar(),
      '/guide/': getSidebar(),
    },
  },
};

function getSidebar() {
  return [
    {
      text: 'Introduction',
      children: [
        { text: 'Getting started', link: '/guide/introduction' },
        { text: 'Syntax and Formatting', link: '/guide/syntax' },
      ],
    },
    {
      text: 'Advanced',
      children: [{ text: 'Backend', link: '/advanced/backend' }],
    },
  ];
}
