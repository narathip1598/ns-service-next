import Image from 'next/image';
import ServiceCard from '../ServiceCard';
import { useTranslations } from 'next-intl';

type Card = { imgSrc: string; title: string; alt: string };

type Props = {
    t: ReturnType<typeof useTranslations>;
    cards: Card[];
    ownerImgSrc: string;
};

export default function OurServiceSection({ t, cards, ownerImgSrc }: Props) {
    return (
        <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <h2 className="text-4xl font-semibold tracking-tight lg:col-span-1">{t('ourService.title')}</h2>

                <div className="lg:col-span-1 space-y-6 text-lg leading-8">
                    <p>{t('ourService.p1')}</p>
                    <p className="font-semibold">{t('ourService.p2')}</p>
                </div>

                <div className="lg:col-span-1 flex lg:justify-end">
                    <div className="relative w-48 h-60 overflow-hidden rounded-3xl ring-1 ring-black/10">
                        <Image
                            src={ownerImgSrc}
                            alt={t('ourService.ownerAlt')}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 192px, 240px"
                            priority
                        />
                    </div>
                </div>
            </div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {cards.map((c, i) => (
                    <ServiceCard key={i} {...c} />
                ))}
            </div>
        </section>
    );
}
