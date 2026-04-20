import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://docs.mineclub.dk',
  integrations: [
    starlight({
      title: 'MineClub',
      description: 'En dansk Minecraft server, skabt for alle aldre.',
      logo: {
        src: './src/assets/logo.png',
        alt: 'MineClub',
      },
      favicon: '/img/favicon.ico',
      defaultLocale: 'root',
      locales: {
        root: {
          label: 'Dansk',
          lang: 'da',
        },
      },
      editLink: {
        baseUrl: 'https://github.com/mineklub/docs/blob/main/',
      },
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/mineklub/docs' },
        { icon: 'discord', label: 'Discord', href: 'https://discord.gg/gcHM29zNeG' },
      ],
      customCss: ['./src/styles/custom.css'],
    }),
  ],
});
