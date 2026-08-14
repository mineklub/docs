import {defineConfig} from 'astro/config';

export default defineConfig({
  site: 'https://docs.mineclub.dk',
  publicDir: './static',
  output: 'static',
  build: {
    format: 'directory',
  },
});