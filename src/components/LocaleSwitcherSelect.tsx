"use client";

import clsx from "clsx";
import { useParams } from "next/navigation";
import { Locale } from "next-intl";
import {
  ChangeEvent,
  ReactNode,
  useTransition,
} from "react";
import { usePathname, useRouter } from "@/i18n/navigation";

type Props = {
  children: ReactNode;
  defaultValue: string;
  label: string;
};

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
  label,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as Locale;
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- see original comment
        { pathname, params },
        { locale: nextLocale }
      );
    });
  }

  return (
    <label
      className={clsx(
        "relative inline-flex items-center rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium text-slate-100 shadow-sm",
        "hover:bg-white/10 transition-colors",
        "focus-within:ring-2 focus-within:ring-sky-400 focus-within:ring-offset-2 focus-within:ring-offset-slate-900",
        isPending && "opacity-70 cursor-wait"
      )}
    >
      {/* Accessible label */}
      <span className="sr-only">{label}</span>

      {/* Native select but visually styled as part of the pill */}
      <select
        className={clsx(
          "bg-transparent border-none pr-6 pl-0 py-1",
          "text-xs font-medium text-slate-100",
          "focus:outline-none focus:ring-0 appearance-none cursor-pointer"
        )}
        defaultValue={defaultValue}
        disabled={isPending}
        onChange={onSelectChange}
        aria-label={label}
      >
        {children}
      </select>

      {/* Caret icon */}
      <span className="pointer-events-none absolute right-2 flex h-4 w-4 items-center justify-center">
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className="h-3 w-3 text-slate-200"
        >
          <path
            d="M5 7l5 6 5-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      {/* Pending spinner */}
      {isPending && (
        <span className="pointer-events-none absolute -right-2 -bottom-2 flex h-3 w-3 items-center justify-center">
          <span className="h-3 w-3 rounded-full border border-white/30 border-t-transparent animate-spin" />
        </span>
      )}
    </label>
  );
}
