import {getTranslations} from 'next-intl/server';
import Section from './Section';

export default async function ContactBand() {
  const t = await getTranslations('contact');

  return (
    <Section eyebrow={t('eyebrow')} title={t('title')} intro={t('intro')}>
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="luxury-border bg-charcoal/70 p-7">
          <p className="text-gold">{t('address')}</p>
          <p className="mt-4 text-cream/74">+30 231 024 1484</p>
          <p className="mt-2 text-cream/74">hello@numahairsalon.gr</p>
          <div className="mt-6 grid gap-2 text-sm text-cream/70">
            <p>{t('hours.weekdays')}</p>
            <p>{t('hours.saturday')}</p>
            <p>{t('hours.sunday')}</p>
          </div>
          <a
            href="https://wa.me/302310241484"
            className="mt-8 inline-flex bg-gold px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-ink"
          >
            WhatsApp
          </a>
        </div>
        <iframe
          title="Thessaloniki map"
          src="https://maps.app.goo.gl/dMas23Zo6aYvVo948"
          className="min-h-96 w-full border-0 grayscale"
          loading="lazy"
        />
      </div>
    </Section>
  );
}
