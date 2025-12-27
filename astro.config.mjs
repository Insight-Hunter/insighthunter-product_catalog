import { defineConfig } from 'astro/config';

export default defineConfig({
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' },
    domains: ['example.com'],
    formats: ['avif', 'webp'],
    quality: 80,
  }
    remotePatterns: [{ protocol: 'https' }],
  },
});
