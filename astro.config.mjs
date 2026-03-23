// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const isProduction = process.env.PUBLIC_SITE_ENV === 'production';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.portable-fire-pumps.com',
  integrations: [
    react(),
    ...(isProduction
      ? [
          sitemap({
            filter: (page) => {
              const pathname = new URL(page).pathname;
              if (pathname === '/') return false;
              if (pathname === '/contact-us/') return false;
              if (pathname.endsWith('/contact-us/thanks/')) return false;
              if (pathname.endsWith('/products/p572sw-a/')) return false;
              return true;
            },
          }),
        ]
      : []),
  ],
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: true
    }
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      entries: ['src/pages/**/*.astro'],
      exclude: [
        '@radix-ui/react-tabs',
        '@radix-ui/react-accordion',
      ],
    },
  }
});
