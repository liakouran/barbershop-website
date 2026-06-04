import {getTranslations} from 'next-intl/server';
import Section from './Section';

export default async function ContactBand() {
  const t = await getTranslations('contact');

  return (
    <Section eyebrow={t('eyebrow')} title={t('title')} intro={t('intro')}>
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="luxury-border bg-charcoal/70 p-7">
          <p className="text-gold">{t('address')}</p>
          <p className="mt-4 text-cream/74">+30 210 000 0000</p>
          <p className="mt-2 text-cream/74">hello@athenianblade.gr</p>
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
          src="https://www.google.com/maps/place/numa+hair+salon/@40.63721,22.9492071,17.21z/data=!4m6!3m5!1s0x14a839397ce3b2d1:0x611c61348de8b85b!8m2!3d40.6373355!4d22.94919!16s%2Fg%2F11z5bwd1n_!5m2!1e4!1e2?entry=ttu&g_ep=EgoyMDI2MDYwMi4wIKXMDSoASAFQAw%3D%3D"
          className="min-h-96 w-full border-0 grayscale"
          loading="lazy"
        />
      </div>
    </Section>
  );
}
