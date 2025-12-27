import { defineConfig } from 'astro/config';

export default defineConfig({
  image: {
    remotePatterns: [{ protocol: 'https' }],
  },
});
