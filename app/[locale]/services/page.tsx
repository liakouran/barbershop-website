import {getTranslations, setRequestLocale} from 'next-intl/server';
import Section from '@/components/Section';
import {services} from '@/lib/content';
import {Link} from '@/i18n/routing';

export default async function ServicesPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations('servicesPage');

  return (
    <Section eyebrow={t('eyebrow')} title={t('title')} intro={t('intro')}>
      <div className="grid gap-5 md:grid-cols-2">
        {services.map((service) => (
          <article key={service.key} className="luxury-border grid gap-5 bg-charcoal/76 p-7 md:grid-cols-[1fr_auto]">
            <div>
              <h2 className="font-display text-4xl">{t(`items.${service.key}.title`)}</h2>
              <p className="mt-3 text-cream/70">{t(`items.${service.key}.description`)}</p>
              <p className="mt-5 text-sm uppercase tracking-[0.18em] text-gold">{service.duration}</p>
            </div>
            <div className="text-3xl text-gold">{service.price}</div>
          </article>
        ))}
      </div>
      <Link href="/reservations" className="mt-8 inline-flex bg-gold px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-ink">
        {t('cta')}
      </Link>
    </Section>
  );
}
