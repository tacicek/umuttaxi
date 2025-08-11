import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  site: 'https://umuttaxi.ch',
  base: '/',
  trailingSlash: 'never',
  build: {
    assets: 'assets'
  }
});
