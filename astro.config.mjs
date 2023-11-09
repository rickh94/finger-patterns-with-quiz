import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import preact from '@astrojs/preact';
import vercel from '@astrojs/vercel/static';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://violinfingerpatterns.com',
  integrations: [
    tailwind(),
    preact({ compat: true }),
    sitemap({
      filter: (page) =>
        page !==
        'https://violinfingerpatterns.com/all-the-patterns/all-of-them/',
    }),
  ],
  vite: {
    define: {
      'import.meta.env.PUBLIC_VERCEL_ANALYTICS_ID': JSON.stringify(
        process.env.VERCEL_ANALYTICS_ID
      ),
    },
  },
  output: 'static',
  adapter: vercel({
    analytics: true,
  }),
});
