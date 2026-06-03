'use client';

import {useMemo, useState} from 'react';
import {useTranslations} from 'next-intl';
import {barbers, services, slots} from '@/lib/content';

type Booking = {
  service: string;
  barber: string;
  date: string;
  slot: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
};

const initialBooking: Booking = {
  service: 'haircut',
  barber: 'Nikos',
  date: '',
  slot: '10:00',
  name: '',
  phone: '',
  email: '',
  notes: ''
};

export default function BookingForm() {
  const t = useTranslations('booking');
  const [booking, setBooking] = useState(initialBooking);
  const [confirmed, setConfirmed] = useState(false);

  const blockedSlots = useMemo(() => (booking.date.endsWith('-01') ? ['10:00', '10:45', '11:30'] : []), [booking.date]);
  const availableSlots = slots.filter((slot) => !blockedSlots.includes(slot));

  function update(key: keyof Booking, value: string) {
    setBooking((current) => ({...current, [key]: value}));
    setConfirmed(false);
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const existing = JSON.parse(localStorage.getItem('appointments') || '[]');
    localStorage.setItem('appointments', JSON.stringify([{...booking, status: 'pending', id: crypto.randomUUID()}, ...existing]));
    setConfirmed(true);
  }

  return (
    <form onSubmit={submit} className="luxury-border grid gap-5 bg-charcoal/78 p-6 shadow-gold md:grid-cols-2">
      <label className="grid gap-2 text-sm text-cream/72">
        {t('service')}
        <select value={booking.service} onChange={(event) => update('service', event.target.value)} className="bg-ink p-4 text-cream luxury-border">
          {services.map((service) => (
            <option key={service.key} value={service.key}>
              {t(`services.${service.key}`)}
            </option>
          ))}
        </select>
      </label>
      <label className="grid gap-2 text-sm text-cream/72">
        {t('barber')}
        <select value={booking.barber} onChange={(event) => update('barber', event.target.value)} className="bg-ink p-4 text-cream luxury-border">
          {barbers.map((barber) => (
            <option key={barber}>{barber}</option>
          ))}
        </select>
      </label>
      <label className="grid gap-2 text-sm text-cream/72">
        {t('date')}
        <input required type="date" value={booking.date} onChange={(event) => update('date', event.target.value)} className="bg-ink p-4 text-cream luxury-border" />
      </label>
      <label className="grid gap-2 text-sm text-cream/72">
        {t('slot')}
        <select value={booking.slot} onChange={(event) => update('slot', event.target.value)} className="bg-ink p-4 text-cream luxury-border">
          {availableSlots.map((slot) => (
            <option key={slot}>{slot}</option>
          ))}
        </select>
      </label>
      <label className="grid gap-2 text-sm text-cream/72">
        {t('name')}
        <input required value={booking.name} onChange={(event) => update('name', event.target.value)} className="bg-ink p-4 text-cream luxury-border" />
      </label>
      <label className="grid gap-2 text-sm text-cream/72">
        {t('phone')}
        <input required value={booking.phone} onChange={(event) => update('phone', event.target.value)} className="bg-ink p-4 text-cream luxury-border" />
      </label>
      <label className="grid gap-2 text-sm text-cream/72">
        {t('email')}
        <input required type="email" value={booking.email} onChange={(event) => update('email', event.target.value)} className="bg-ink p-4 text-cream luxury-border" />
      </label>
      <label className="grid gap-2 text-sm text-cream/72 md:row-span-2">
        {t('notes')}
        <textarea value={booking.notes} onChange={(event) => update('notes', event.target.value)} className="min-h-32 bg-ink p-4 text-cream luxury-border" />
      </label>
      <button className="bg-gold px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-ink md:col-span-2">{t('confirm')}</button>
      {confirmed ? <p className="text-gold md:col-span-2">{t('success')}</p> : null}
    </form>
  );
}
