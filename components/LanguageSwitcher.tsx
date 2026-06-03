'use client';

import {usePathname} from '@/i18n/routing';
import {Link} from '@/i18n/routing';

export default function LanguageSwitcher({locale}: {locale: string}) {
  const pathname = usePathname();
  const nextLocale = locale === 'el' ? 'en' : 'el';

  return (
    <Link href={pathname} locale={nextLocale} className="luxury-border px-4 py-3 text-sm uppercase tracking-[0.16em] text-cream/80">
      {nextLocale.toUpperCase()}
    </Link>
  );
}
