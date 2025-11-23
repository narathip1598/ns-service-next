"use client";

import { useState, useRef, TouchEvent } from "react";
import Image from "next/image";

type Card = {
  imgSrc: string;
  title: string;
  alt: string;
};

type Props = {
  title: string; // e.g. "Services & Solutions"
  cards: Card[];
};

export default function ServiceList({ title, cards }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  if (!cards || cards.length === 0) return null;

  const activeCard = cards[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    const threshold = 50; // px
    if (diff > threshold) {
      handlePrev();
    } else if (diff < -threshold) {
      handleNext();
    }
    touchStartX.current = null;
  };

  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Title */}
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 text-center mb-10">
          {title}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          {/* LEFT LIST (desktop / tablet) */}
          <div className="hidden lg:flex flex-col justify-between">
            <div className="divide-y divide-slate-200 border-y border-slate-200">
              {cards.map((card, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={card.title}
                    type="button"
                    onMouseEnter={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    className={`flex w-full items-center justify-between py-5 text-left transition
                      ${
                        isActive
                          ? "bg-slate-100 text-slate-900 font-semibold"
                          : "bg-transparent text-slate-600 hover:bg-slate-50"
                      }`}
                  >
                    <span className="text-lg">{card.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT IMAGE (shared for desktop & mobile) */}
          <div
            className="relative h-80 sm:h-96 lg:h-[520px] rounded-2xl overflow-hidden shadow-lg bg-slate-200"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Fade animation: we change key when index changes */}
            <Image
              key={activeCard.imgSrc + activeIndex}
              src={activeCard.imgSrc}
              alt={activeCard.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-opacity duration-500 ease-out"
            />

            {/* Gradient overlay + title (mobile) */}
            <div className="absolute inset-x-0 bottom-0 lg:hidden bg-gradient-to-t from-black/60 via-black/20 to-transparent p-4">
              <h3 className="text-xl font-semibold text-white">
                {activeCard.title}
              </h3>
            </div>

            {/* Arrows (shown on all screens) */}
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 text-white p-2 hover:bg-black/60 focus:outline-none"
              aria-label="Previous service"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 text-white p-2 hover:bg-black/60 focus:outline-none"
              aria-label="Next service"
            >
              ›
            </button>

            {/* Dots (especially useful on mobile) */}
            <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2 lg:hidden">
              {cards.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  className={`h-2 w-2 rounded-full ${
                    i === activeIndex ? "bg-white" : "bg-white/50"
                  }`}
                  aria-label={`Go to service ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
