import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  site: 'https://tacicek-umuttaxi-imp-w6kq.bolt.host',
  base: '/',
  trailingSlash: 'never',
  build: {
    assets: 'assets',
    format: 'directory'
  }
});
