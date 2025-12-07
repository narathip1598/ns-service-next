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
        {/* Section header */}
        <div className="text-center mb-8 sm:mb-10">
          <p className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-slate-500 uppercase">
            Services
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
            {title}
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-sm sm:text-base text-slate-600">
            Discover our key services and solutions designed to support your
            production, maintenance, and long-term operational performance.
          </p>
        </div>

        {/* Mobile / tablet service chips */}
        <div className="mb-6 lg:hidden -mx-4 px-4">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {cards.map((card, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={card.title}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`flex-shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium whitespace-nowrap transition
                    ${isActive
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  aria-pressed={isActive}
                >
                  {card.title}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px,minmax(0,1fr)] gap-8 lg:gap-10 items-stretch">
          {/* LEFT LIST (desktop) */}
          <aside className="hidden lg:block">
            <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
              <div className="px-5 py-3 text-[11px] font-semibold tracking-[0.2em] text-slate-500 uppercase bg-slate-50">
                Service Categories
              </div>
              <div className="divide-y divide-slate-200">
                {cards.map((card, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <button
                      key={card.title}
                      type="button"
                      onMouseEnter={() => setActiveIndex(index)}
                      onFocus={() => setActiveIndex(index)}
                      className={`flex w-full items-center justify-between px-5 py-4 text-left text-sm transition
                        ${isActive
                          ? "bg-slate-900 text-white"
                          : "bg-white text-slate-700 hover:bg-slate-50"
                        }`}
                      aria-pressed={isActive}
                    >
                      <span className="flex-1 font-medium">{card.title}</span>
                      {isActive && (
                        <span className="ml-3 inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/40 text-xs">
                          +
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* RIGHT HERO (image + overlay content) */}
          <div
            className="relative flex flex-col h-full overflow-hidden rounded-2xl bg-slate-900 text-white shadow-xl"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Background image */}
            <div className="absolute inset-0">
              <Image
                key={activeCard.imgSrc + activeIndex}
                src={activeCard.imgSrc}
                alt={activeCard.alt}
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/90 via-slate-900/70 to-slate-900/30" />
            </div>

            {/* Foreground content */}
            <div className="relative z-10 flex flex-col justify-between h-full p-5 sm:p-6 md:p-8">
              {/* Mobile header + arrows */}
              <div className="mb-4 flex items-center justify-between lg:hidden">
                <div className="flex flex-col">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-slate-300">
                    Services &amp; Solutions
                  </p>
                  <h3 className="mt-1 text-lg sm:text-xl font-semibold">
                    {activeCard.title}
                  </h3>
                  <p className="mt-1 text-[11px] text-slate-200">
                    {activeIndex + 1} / {cards.length}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white text-lg hover:bg-white/20 focus:outline-none"
                    aria-label="Previous service"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white text-lg hover:bg-white/20 focus:outline-none"
                    aria-label="Next service"
                  >
                    ›
                  </button>
                </div>
              </div>

              <div className="flex-1 flex items-end">
                {/* Content block (visible on all sizes) */}
                <div className="max-w-xl">
                  <p className="hidden text-[11px] uppercase tracking-[0.25em] text-slate-300 lg:block">
                    Services &amp; Solutions
                  </p>
                  <h3 className="hidden lg:block mt-2 text-2xl sm:text-3xl font-semibold">
                    {activeCard.title}
                  </h3>
                  {/* If you ever add descriptions, you can place them here */}
                </div>
              </div>

              {/* Bottom controls (dots on mobile) */}
              <div className="mt-6 flex justify-center gap-2 lg:hidden">
                {cards.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    className={`h-2 w-2 rounded-full ${i === activeIndex ? "bg-white" : "bg-white/40"
                      }`}
                    aria-label={`Go to service ${i + 1}`}
                  />
                ))}
              </div>

              {/* Desktop arrows – subtle, centered vertically on right side */}
              <button
                type="button"
                onClick={handlePrev}
                className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white text-lg hover:bg-white/20 focus:outline-none"
                aria-label="Previous service"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white text-lg hover:bg-white/20 focus:outline-none"
                aria-label="Next service"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
