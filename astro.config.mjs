import cloudflare from '@astrojs/cloudflare';
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  adapter: cloudflare(),
  integrations: [tailwind(), sitemap(), mdx(), icon()],
  output: 'static',  // Explicitly set to static (often the default, but recommended here)
  site: 'https://insighthunter.app'
});
