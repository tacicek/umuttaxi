import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  site: 'https://umuttaxi.vercel.app',
  base: '/',
  trailingSlash: 'never',
  build: {
    assets: 'assets'
  }
});
