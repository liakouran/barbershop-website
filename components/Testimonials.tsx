import {getTranslations} from 'next-intl/server';
import Section from './Section';

export default async function Testimonials() {
  const t = await getTranslations('testimonials');

  return (
    <Section eyebrow={t('eyebrow')} title={t('title')} intro={t('intro')}>
      <div className="grid gap-5 md:grid-cols-3">
        {[0, 1, 2].map((item) => (
          <figure key={item} className="luxury-border bg-charcoal/70 p-6">
            <div className="text-gold">★★★★★</div>
            <blockquote className="mt-5 text-lg leading-8 text-cream/82">{t(`items.${item}.quote`)}</blockquote>
            <figcaption className="mt-6 text-sm uppercase tracking-[0.18em] text-gold">{t(`items.${item}.name`)}</figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
