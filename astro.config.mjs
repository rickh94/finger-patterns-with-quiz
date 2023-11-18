import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import preact from "@astrojs/preact";
import vercelEdge from "@astrojs/vercel/edge";

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
  output: "server",
  adapter: vercelEdge({
    webAnalytics: {
      enabled: true,
    },
  }),
});
