import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'th'],
  defaultLocale: 'en',
  pathnames: {
    '/products': {
      en: '/products',
      th: '/products',
    },
    '/': '/',
    '/services': {
      th: '/services',
      en: '/services',
    }
  }
});