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
        text: 'Release Notes',
        link: 'https://github.com/soulsam480/pdf-donkey/releases',
      },
    ],
    sidebar: {
      '/guide/': getSidebar(),
      '/': getSidebar(),
    },
  },
};

function getSidebar() {
  return [
    {
      text: 'Introduction',
      children: [
        { text: 'Getting started', link: '/guide/' },
        { text: 'Create new template', link: '/guide/create-new-template' },
      ],
    },
  ];
}
