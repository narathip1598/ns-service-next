"use client";

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useState } from "react";

type Card = { 
    imgSrc: string; 
    title: string; 
    alt: string; 
};

type Props = {
    title: string;
    cards: Card[];
};


export default function ServiceList({ title, cards }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Fallback in case cards is empty
  if (!cards || cards.length === 0) {
    return null;
  }

  const activeCard = cards[activeIndex] ?? cards[0];

  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          {/* LEFT: Title + list */}
          <div className="flex flex-col justify-between bg-white lg:bg-transparent">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                {title}
              </h2>

              <div className="mt-10 divide-y divide-slate-200 border-y border-slate-200">
                {cards.map((card, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <button
                      key={card.title}
                      type="button"
                      onMouseEnter={() => setActiveIndex(index)}
                      onFocus={() => setActiveIndex(index)}
                      className={`flex w-full items-center justify-between py-4 text-left transition
                        ${
                          isActive
                            ? "bg-slate-100 text-slate-900 font-semibold"
                            : "bg-transparent text-slate-700 hover:bg-slate-50"
                        }`}
                    >
                      <span className="text-lg">{card.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT: Active image */}
          <div className="relative h-72 sm:h-96 lg:h-[480px] rounded-2xl overflow-hidden shadow-lg">
            <Image
              key={activeCard.imgSrc}
              src={activeCard.imgSrc}
              alt={activeCard.alt}
              fill
              className="object-cover transition-opacity duration-300"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
