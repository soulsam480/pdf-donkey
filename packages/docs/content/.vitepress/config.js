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
    repo: 'soulsam480/pdf-donkey',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: 'Edit this page on GitHub',
    lastUpdated: 'Last Updated',
    nav: [
      { text: 'Guide', link: '/guide/index.html', activeMatch: '^/guide/' },
      {
        text: 'Release Notes',
        link: 'https://github.com/soulsam480/pdf-donkey/releases',
      },
    ],
  },
};
