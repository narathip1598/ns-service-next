import { Locale } from 'next-intl';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import PageLayout from '@/components/PageLayout';

import Hero from '@/components/Hero';
import OurServiceSection from '@/components/sections/OurServiceSection';
import CompanyProfileSection from '@/components/sections/CompanyProfileSection';

type PageParams = { locale: Locale };
type Props = { params: PageParams };

export default async function IndexPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'IndexPage' });

  // Assets
  const HERO_IMG = '/image/jst.png';
  const OWNER_IMG = '/image/owner.png';
  const COMPANY_IMG = '/image/company-profile.png';

  // Services data
  const serviceCards = [
    { imgSrc: '/image/news1.png', title: t('ourService.card1.title'), alt: t('ourService.card1.alt') },
    { imgSrc: '/image/news2.png', title: t('ourService.card2.title'), alt: t('ourService.card2.alt') },
    { imgSrc: '/image/news3.png', title: t('ourService.card3.title'), alt: t('ourService.card3.alt') },
  ];

  return (
    <PageLayout>
      <Hero imgSrc={HERO_IMG} title={t('title')} description={t('description')} />
      <OurServiceSection t={t} cards={serviceCards} ownerImgSrc={OWNER_IMG} />
      <CompanyProfileSection t={t} imageSrc={COMPANY_IMG} />
    </PageLayout>
  );
}
