import type {Metadata} from 'next';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import Hero from '@/components/Hero';
import Section from '@/components/Section';
import GalleryPreview from '@/components/GalleryPreview';
import Testimonials from '@/components/Testimonials';
import ContactBand from '@/components/ContactBand';
import {services} from '@/lib/content';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'metadata.home'});
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}`,
      languages: {el: '/el', en: '/en'}
    }
  };
}

export default async function HomePage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations('home');
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Barbershop',
    name: 'Numa Hair Salon',
    image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1600&q=85',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Ἁγ. Δημητρίου 118',
      addressLocality: 'Thessaloniki',
      postalCode: '54631',
      addressCountry: 'GR'
    },
    telephone: '+302310241484',
    priceRange: 'EUR 8-35',
    openingHours: ['Mo-Fr 10:00-20:00', 'Sa 10:00-18:00'],
    url: `https://numahairsalon.gr/${locale}`
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData)}} />
      <Hero />
      <Section eyebrow={t('servicesEyebrow')} title={t('servicesTitle')} intro={t('servicesIntro')}>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <article key={service.key} className="luxury-border bg-charcoal/80 p-6 shadow-gold">
              <p className="text-sm uppercase tracking-[0.24em] text-gold">{service.duration}</p>
              <h3 className="mt-4 font-display text-3xl">{t(`services.${service.key}.title`)}</h3>
              <p className="mt-3 text-sm leading-6 text-cream/70">{t(`services.${service.key}.description`)}</p>
              <p className="mt-6 text-2xl text-gold">{service.price}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section eyebrow={t('aboutEyebrow')} title={t('aboutTitle')} intro={t('aboutIntro')}>
        <div className="grid gap-6 md:grid-cols-3">
          {['craft', 'hygiene', 'experience'].map((item) => (
            <div key={item} className="border-l border-gold/40 pl-5">
              <h3 className="font-display text-2xl">{t(`why.${item}.title`)}</h3>
              <p className="mt-2 text-sm leading-6 text-cream/70">{t(`why.${item}.text`)}</p>
            </div>
          ))}
        </div>
      </Section>
      <GalleryPreview />
      <Testimonials />
      <ContactBand />
    </>
  );
}
