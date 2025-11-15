import Image from 'next/image';
import { useTranslations } from 'next-intl';

type Card = { 
    imgSrc: string; 
    title: string; 
    description: string;
    alt: string; 
};

type Props = {
    t: ReturnType<typeof useTranslations>;
    cards: Card[];
};

export default function OurServiceSection({ t, cards }: Props) {
    return (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">

            {/* Centered Title */}
            <div className="text-center mb-16">
                <h2 className="text-5xl font-bold tracking-tight">
                    {t('ourService.title')}
                </h2>
            </div>

            {/* 4 Columns Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {cards.map((c, i) => (
                    <div key={i} className="flex flex-col items-start">
                        {/* Image */}
                        <div className="w-full aspect-[3/4] relative rounded-xl overflow-hidden shadow-lg">
                            <Image
                                src={c.imgSrc}
                                alt={c.alt}
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Title */}
                        <h3 className="mt-4 text-2xl font-bold">
                            {c.title}
                        </h3>

                        {/* Description */}
                        <p className="mt-2 text-lg leading-relaxed text-gray-700">
                            {c.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
