import { Locale, useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { use } from 'react';
import PageLayout from '@/components/PageLayout';

export default function ServicesPage({
  params
}: PageProps<'/[locale]/services'>) {
  const { locale } = use(params);

  setRequestLocale(locale as Locale);

  const t = useTranslations('ServicesPage');

  return (
    <PageLayout>
      <div className="max-w-[490px]">
        {t.rich('description', {
          p: (chunks) => <p className="mt-4">{chunks}</p>,
          code: (chunks) => (
            <code className="font-mono text-white">{chunks}</code>
          )
        })}
      </div>
    </PageLayout>
  );
}