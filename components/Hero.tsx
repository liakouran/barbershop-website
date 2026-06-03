import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/routing';
import {MotionDiv} from './Motion';

export default async function Hero() {
  const t = await getTranslations('hero');

  return (
    <section className="relative min-h-screen overflow-hidden pt-20">
      <img
        src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=2200&q=85"
        alt="Premium barber shop interior"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="photo-overlay absolute inset-0" />
      <MotionDiv
        className="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl items-center px-5 py-16 md:px-8"
        initial={{opacity: 0, y: 24}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.9, ease: 'easeOut'}}
      >
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.32em] text-gold">{t('eyebrow')}</p>
          <h1 className="mt-5 font-display text-5xl font-bold leading-[0.95] md:text-8xl">{t('title')}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-cream/78">{t('subtitle')}</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link href="/reservations" className="bg-gold px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-ink">
              {t('book')}
            </Link>
            <Link href="/services" className="luxury-border px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-cream">
              {t('services')}
            </Link>
          </div>
        </div>
      </MotionDiv>
    </section>
  );
}
