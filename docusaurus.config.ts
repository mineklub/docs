import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'MineClub',
  tagline: 'En dansk Minecraft server, skabt for alle aldre.',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://mineclub.dk',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'org.mineklub', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'dk',
    locales: ['dk'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/mineklub/docs/blob/main/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
    },
    navbar: {
      title: 'MineClub',
      logo: {
        alt: 'MineClub',
        src: 'img/logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'minepay',
          position: 'left',
          label: 'MinePay',
        },
        {
          type: 'docSidebar',
          sidebarId: 'guides',
          position: 'left',
          label: 'Guides',
        },
        {
          href: 'https://github.com/mineklub/docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'MinePay',
              to: '/docs/minepay/intro',
            },
            {
              label: 'Guides',
              to: '/docs/guides/intro',
            },
          ],
        },
        {
          title: 'Fælleskab',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.gg/gcHM29zNeG',
            },
            {
              label: 'TikTok',
              href: 'https://www.tiktok.com/@mineclub8',
            },
          ],
        },
        {
          title: 'More',
          items: [

            {
              label: 'GitHub',
              href: 'https://github.com/mineklub',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} MineClub. Alle rettigheder forbeholdes.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
