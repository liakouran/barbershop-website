import {getTranslations, setRequestLocale} from 'next-intl/server';
import Section from '@/components/Section';

export default async function AboutPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations('aboutPage');

  return (
    <Section eyebrow={t('eyebrow')} title={t('title')} intro={t('intro')}>
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <img
          src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1400&q=85"
          alt="Barbershop team"
          className="h-[36rem] w-full object-cover"
        />
        <div className="grid gap-5">
          {['story', 'certs', 'standards'].map((item) => (
            <div key={item} className="luxury-border bg-charcoal/75 p-6">
              <h2 className="font-display text-3xl">{t(`${item}.title`)}</h2>
              <p className="mt-3 leading-7 text-cream/72">{t(`${item}.text`)}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {['Nikos', 'Alexandros', 'Marios'].map((name) => (
          <div key={name} className="luxury-border bg-charcoal/70 p-6">
            <p className="font-display text-3xl">{name}</p>
            <p className="mt-2 text-sm uppercase tracking-[0.18em] text-gold">{t('masterBarber')}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
