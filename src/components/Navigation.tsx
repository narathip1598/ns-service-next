import { useTranslations } from 'next-intl';
import LocaleSwitcher from './LocaleSwitcher';
import NavigationLink from './NavigationLink';
import Image from 'next/image';

type NavigationProps = {
  imgSrc: string;
};

export default function Navigation({ imgSrc }: NavigationProps) {
  const t = useTranslations('Navigation');

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-850/90 backdrop-blur">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <NavigationLink href="/" className="p-0">
            <span className="sr-only">{t('home')}</span>
            <Image
              src={imgSrc}
              alt="Company logo"
              width={36}
              height={36}
              className="h-9 w-auto transition-transform hover:scale-105"
              priority
            />
          </NavigationLink>

          <div className="hidden sm:flex items-center gap-4">
            <NavigationLink href="/">{t('home')}</NavigationLink>
            <NavigationLink href="/services">{t('services')}</NavigationLink>
            <NavigationLink href="/products">{t('products')}</NavigationLink>
          </div>
        </div>

        {/* RIGHT: Locale switcher */}
        <LocaleSwitcher />
      </nav>
    </header>
  );
}
