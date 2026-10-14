// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Static output: every page is pre-rendered HTML, which keeps pages light
// and lets Vercel serve them from its edge cache with no server code.
export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || 'https://caspa.example.com',
  output: 'static',
  trailingSlash: 'never',
  build: {
    format: 'file',
    inlineStylesheets: 'auto',
  },
  integrations: [sitemap()],
});
