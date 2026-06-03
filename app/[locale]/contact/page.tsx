import {getTranslations, setRequestLocale} from 'next-intl/server';
import Section from '@/components/Section';
import ContactBand from '@/components/ContactBand';

export default async function ContactPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations('contactPage');

  return (
    <>
      <Section eyebrow={t('eyebrow')} title={t('title')} intro={t('intro')}>
        <form className="luxury-border grid gap-5 bg-charcoal/75 p-6 md:grid-cols-2">
          <input placeholder={t('name')} className="bg-ink p-4 luxury-border" />
          <input placeholder={t('email')} className="bg-ink p-4 luxury-border" />
          <input placeholder={t('phone')} className="bg-ink p-4 luxury-border md:col-span-2" />
          <textarea placeholder={t('message')} className="min-h-36 bg-ink p-4 luxury-border md:col-span-2" />
          <button className="bg-gold px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-ink md:col-span-2">{t('send')}</button>
        </form>
      </Section>
      <ContactBand />
    </>
  );
}
