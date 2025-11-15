import { notFound } from 'next/navigation';
import { Locale, hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { clsx } from 'clsx';
import { Inter } from 'next/font/google';
import { routing } from '@/i18n/routing';
import Navigation from '@/components/Navigation';
import './styles.css';

const inter = Inter({ subsets: ['latin'] });

const NAV_LOGO = "/image/Com_Logo-removebg-preview-2.png";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(
  props: Omit<LayoutProps<'/[locale]'>, 'children'>
) {
  const { locale } = await props.params;

  const t = await getTranslations({
    locale: locale as Locale,
    namespace: 'LocaleLayout'
  });

  return {
    title: t('title')
  };
}

export default async function LocaleLayout({
  children,
  params
}: LayoutProps<'/[locale]'>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html className="h-full" lang={locale}>
      <body className={clsx(inter.className, "flex h-full flex-col")}>
        <NextIntlClientProvider>
          <Navigation imgSrc={NAV_LOGO} />
          {/* 👇 push page content below fixed header */}
          <div className="flex-1 pt-16">
            {children}
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
