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
          className="h-[450px] w-full rounded-lg"
          title="Thessaloniki map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3027.6619987869335!2d22.94661507750159!3d40.63733547140493!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a839397ce3b2d1%3A0x611c61348de8b85b!2snuma%20hair%20salon!5e0!3m2!1sel!2sgr!4v1780606160488!5m2!1sel!2sgr"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </Section>
  );
}
