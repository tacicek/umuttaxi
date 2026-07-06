import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import node from '@astrojs/node';

export default defineConfig({
  integrations: [tailwind()],
  // TODO: set this to your final Coolify domain (e.g. https://taxiumut.ch)
  site: process.env.SITE_URL || 'https://tacicek-umuttaxi-imp-w6kq.bolt.host',
  base: '/',
  trailingSlash: 'never',
  // Hybrid: every page is prerendered (static) by default; only routes that opt
  // out via `export const prerender = false` (e.g. /api/submit) run on the Node
  // server. Keeps the site fast while enabling the SendGrid form endpoint.
  output: 'hybrid',
  adapter: node({ mode: 'standalone' }),
  build: {
    assets: 'assets',
    format: 'directory'
  }
});
