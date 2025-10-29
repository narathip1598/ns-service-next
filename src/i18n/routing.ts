import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'th'],
  defaultLocale: 'en',
  pathnames: {
    '/our-services': {
      en: '/our-services',
      th: '/our-services',
    },
    '/': '/',
    '/pathnames': {
      th: '/about',
      en: '/about'
    }
  }
});