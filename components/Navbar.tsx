'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';
import {Link, usePathname} from '@/i18n/routing';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar({locale}: {locale: string}) {
  const [open, setOpen] = useState(false);
  const t = useTranslations('nav');
  const pathname = usePathname();
  const links = ['services', 'about', 'gallery', 'reservations', 'contact'];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/82 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-8">
        <Link href="/" locale={locale} className="font-display text-2xl font-bold text-cream">
          Numa <span className="text-gold">Hair Salon</span>
        </Link>
        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((item) => (
            <Link
              key={item}
              href={`/${item}`}
              locale={locale}
              className={`text-sm uppercase tracking-[0.18em] transition hover:text-gold ${
                pathname.includes(item) ? 'text-gold' : 'text-cream/78'
              }`}
            >
              {t(item)}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher locale={locale} />
          <Link href="/reservations" locale={locale} className="bg-gold px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-ink">
            {t('book')}
          </Link>
        </div>
        <button
          aria-label="Menu"
          onClick={() => setOpen((value) => !value)}
          className="luxury-border px-4 py-3 text-sm uppercase tracking-[0.18em] lg:hidden"
        >
          Menu
        </button>
      </div>
      {open ? (
        <div className="border-t border-white/10 bg-ink px-5 py-6 lg:hidden">
          <div className="grid gap-4">
            {links.map((item) => (
              <Link key={item} href={`/${item}`} locale={locale} onClick={() => setOpen(false)} className="text-cream/80">
                {t(item)}
              </Link>
            ))}
            <LanguageSwitcher locale={locale} />
          </div>
        </div>
      ) : null}
    </header>
  );
}
