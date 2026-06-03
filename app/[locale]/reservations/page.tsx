import {getTranslations, setRequestLocale} from 'next-intl/server';
import Section from '@/components/Section';
import BookingForm from '@/components/BookingForm';

export default async function ReservationsPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations('reservationsPage');

  return (
    <Section eyebrow={t('eyebrow')} title={t('title')} intro={t('intro')}>
      <BookingForm />
    </Section>
  );
}
