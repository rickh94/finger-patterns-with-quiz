import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import preact from "@astrojs/preact";
import vercel from "@astrojs/vercel/serverless";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  trailingSlash: "never",
  site: "https://violinfingerpatterns.com",
  integrations: [
    tailwind(),
    preact({ compat: true }),
    sitemap({
      filter: (page) =>
        page !==
        "https://violinfingerpatterns.com/all-the-patterns/all-of-them/",
    }),
  ],
  output: "hybrid",
  adapter: vercel({
    functionPerRoute: true,
    webAnalytics: {
      enabled: true,
    },
  }),
});
