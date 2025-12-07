"use client";

import { useState, useRef, TouchEvent } from "react";
import Image from "next/image";

type Card = {
    id: string;
    brandKey: string;
    brandLabel: string;
    imgSrc: string;
    title: string;
    description: string;
    standard: string;
    alt: string;
    specDownloadPath?: string;
};

type Props = {
    cards: Card[];
};

export default function ProductSection({ cards }: Props) {
    const [activeIndex, setActiveIndex] = useState(0);
    const touchStartX = useRef<number | null>(null);

    if (!cards || cards.length === 0) return null;

    const activeCard = cards[activeIndex];

    // Group cards by brand, preserving original order
    const brandOrder: string[] = [];
    const brandMap: Record<
        string,
        {
            brandKey: string;
            brandLabel: string;
            cards: (Card & { globalIndex: number })[];
        }
    > = {};

    cards.forEach((card, index) => {
        if (!brandMap[card.brandKey]) {
            brandMap[card.brandKey] = {
                brandKey: card.brandKey,
                brandLabel: card.brandLabel,
                cards: [],
            };
            brandOrder.push(card.brandKey);
        }
        brandMap[card.brandKey].cards.push({ ...card, globalIndex: index });
    });

    const groupedBrands = brandOrder.map((key) => brandMap[key]);

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
        const threshold = 50;
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
                <div className="text-center mb-10">
                    <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 uppercase">
                        PRODUCTS CATEGORIES
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[280px,minmax(0,1fr)] gap-10 items-stretch">
                    {/* LEFT – grouped by brand (desktop) */}
                    <div className="hidden lg:block">
                        <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
                            {groupedBrands.map((group) => (
                                <div
                                    key={group.brandKey}
                                    className="border-b last:border-b-0 border-slate-200"
                                >
                                    {/* Brand header */}
                                    <div className="px-5 py-3 text-[11px] font-semibold tracking-[0.2em] text-slate-500 uppercase bg-slate-50">
                                        {group.brandLabel}
                                    </div>

                                    {/* Series list */}
                                    {group.cards.map((card) => {
                                        const isActive = card.globalIndex === activeIndex;
                                        return (
                                            <button
                                                key={card.id}
                                                type="button"
                                                onMouseEnter={() => setActiveIndex(card.globalIndex)}
                                                onFocus={() => setActiveIndex(card.globalIndex)}
                                                className={`flex w-full items-center justify-between px-5 py-4 text-left text-sm transition
                          ${isActive
                                                        ? "bg-slate-900 text-white"
                                                        : "bg-white text-slate-700 hover:bg-slate-50"
                                                    }`}
                                            >
                                                <span className="flex-1 font-medium">
                                                    {card.title}
                                                </span>
                                                {isActive && (
                                                    <span className="ml-3 inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/40 text-xs">
                                                        +
                                                    </span>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT – main content (image + text) */}
                    <div
                        className="relative h-full min-h-[360px] sm:min-h-[420px] lg:min-h-[480px] overflow-hidden rounded-2xl bg-slate-900 text-white shadow-xl"
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
                        <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-8">
                            {/* Mobile header + arrows */}
                            <div className="mb-4 flex items-center justify-between lg:hidden">
                                <div className="flex flex-col">
                                    <p className="text-[10px] uppercase tracking-[0.25em] text-slate-300">
                                        Products Categories
                                    </p>
                                    <h3 className="mt-1 text-xs font-medium text-slate-300">
                                        {activeCard.brandLabel}
                                    </h3>
                                    <h4 className="mt-1 text-xl font-semibold">
                                        {activeCard.title}
                                    </h4>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={handlePrev}
                                        className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white text-lg hover:bg-white/20 focus:outline-none"
                                        aria-label="Previous category"
                                    >
                                        ‹
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleNext}
                                        className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white text-lg hover:bg-white/20 focus:outline-none"
                                        aria-label="Next category"
                                    >
                                        ›
                                    </button>
                                </div>
                            </div>

                            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr),minmax(0,1fr)] items-start">
                                {/* Text block */}
                                <div>
                                    <p className="hidden text-[11px] uppercase tracking-[0.25em] text-slate-300 lg:block">
                                        {activeCard.brandLabel}
                                    </p>
                                    <h3 className="mt-2 text-2xl sm:text-3xl font-semibold">
                                        {activeCard.title}
                                    </h3>

                                    {activeCard.standard && (
                                        <div className="mt-3 inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium tracking-wide">
                                            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                            {activeCard.standard}
                                        </div>
                                    )}

                                    {activeCard.description && (
                                        <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-100/90">
                                            {activeCard.description}
                                        </p>
                                    )}

                                    {/* Download PDF button with icon */}
                                    {activeCard.specDownloadPath && (
                                        <div className="mt-6">
                                            <p className="text-[11px] uppercase tracking-[0.2em] text-slate-300 mb-2">
                                                Technical Data
                                            </p>
                                            <a
                                                href={activeCard.specDownloadPath}
                                                download
                                                className="inline-flex items-center gap-3 rounded-full bg-white text-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-wide hover:bg-slate-100 focus:outline-none"
                                            >
                                                {/* PDF icon */}
                                                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-red-600/90 shadow-sm">
                                                    <svg
                                                        aria-hidden="true"
                                                        viewBox="0 0 24 24"
                                                        className="h-4 w-4 text-white"
                                                    >
                                                        <path
                                                            d="M6 2h7l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2z"
                                                            fill="currentColor"
                                                            opacity="0.9"
                                                        />
                                                        <path
                                                            d="M13 2v5h5"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <text
                                                            x="7.3"
                                                            y="17"
                                                            fontSize="6"
                                                            fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                                                            fill="white"
                                                            fontWeight="700"
                                                        >
                                                            PDF
                                                        </text>
                                                    </svg>
                                                </span>
                                                <span>Download Spec Sheet (PDF)</span>
                                            </a>
                                        </div>
                                    )}
                                </div>

                                {/* Detail thumbnail (desktop only) */}
                                <div className="hidden lg:block">
                                    <div className="relative h-40 sm:h-48 lg:h-56 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
                                        <Image
                                            src={activeCard.imgSrc}
                                            alt={activeCard.alt}
                                            fill
                                            sizes="(min-width: 1024px) 25vw, 50vw"
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Dots (mobile) */}
                            <div className="mt-6 flex justify-center gap-2 lg:hidden">
                                {cards.map((_, i) => (
                                    <button
                                        key={i}
                                        type="button"
                                        onClick={() => setActiveIndex(i)}
                                        className={`h-2 w-2 rounded-full ${i === activeIndex ? "bg-white" : "bg-white/40"
                                            }`}
                                        aria-label={`Go to category ${i + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
