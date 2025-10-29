import Image from 'next/image';
import { useTranslations } from 'next-intl';

type Props = {
  t: ReturnType<typeof useTranslations>;
  imageSrc: string;
};

export default function CompanyProfileSection({ t, imageSrc }: Props) {
  return (
    <section className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        <div>
          <h2 className="mb-8 text-4xl sm:text-5xl font-extrabold tracking-tight">{t('companyProfile.title')}</h2>
          <div className="space-y-6 text-lg leading-8">
            <p>{t('companyProfile.p1')}</p>
            <p>{t('companyProfile.p2')}</p>
            <p className="mt-8 text-2xl sm:text-3xl font-extrabold leading-snug">{t('companyProfile.tagline')}</p>
          </div>
        </div>

        <div className="lg:pl-6">
          <div className="relative w-full overflow-hidden rounded-lg border-8 border-white shadow-2xl aspect-[16/10] sm:aspect-[4/3] lg:aspect-[5/4]">
            <Image
              src={imageSrc}
              alt={t('companyProfile.imageAlt')}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
