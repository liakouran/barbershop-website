import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/routing';
import LanguageSwitcher from './LanguageSwitcher';

export default async function Footer({locale}: {locale: string}) {
  const t = await getTranslations('footer');

  return (
    <footer className="border-t border-white/10 bg-ink px-5 py-10 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_auto_auto] md:items-center">
        <div>
          <p className="font-display text-3xl">Athenian <span className="text-gold">Blade</span></p>
          <p className="mt-2 max-w-xl text-sm leading-6 text-cream/60">{t('tagline')}</p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-cream/70">
          <Link href="/services" locale={locale}>{t('services')}</Link>
          <Link href="/reservations" locale={locale}>{t('reservations')}</Link>
          <Link href="/contact" locale={locale}>{t('contact')}</Link>
        </div>
        <LanguageSwitcher locale={locale} />
      </div>
    </footer>
  );
}
