import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  site: 'https://taxiumut.ch',
  base: '/',
  trailingSlash: 'never',
  build: {
    assets: 'assets',
    format: 'directory'
  }
});
