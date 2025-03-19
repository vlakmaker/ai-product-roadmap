const config: Config = {
  title: 'AI Learning Hub',
  tagline: 'The Coolest Hub on the Web',
  favicon: 'img/favicon.ico',

  url: 'https://vlakmaker.github.io',
  baseUrl: '/ai-product-storytelling-engineer-roadmap/',

  organizationName: 'vlakmaker',
  projectName: 'ai-product-storytelling-engineer-roadmap',
  deploymentBranch: 'gh-pages',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          path: 'docs',
          routeBasePath: '/', // This makes the documentation homepage
          sidebarPath: require.resolve('./sidebars.ts'),
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'AI Learning Hub',
      logo: {
        alt: 'AI Learning Hub Logo',
        src: 'img/logo.svg',
      },
      items: [
        { to: '/', label: 'Home', position: 'left' }, // Route to homepage
        { type: 'docSidebar', sidebarId: 'tutorialSidebar', position: 'left', label: 'Docs' },
        { href: 'https://github.com/vlakmaker/ai-product-storytelling-engineer-roadmap', label: 'GitHub', position: 'right' },
      ],
    },
  },
};

export default config;
