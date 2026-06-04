'use client';

import {useEffect, useState} from 'react';
import {useTranslations} from 'next-intl';

type Appointment = {
  id: string;
  service: string;
  barber: string;
  date: string;
  slot: string;
  name: string;
  phone: string;
  email: string;
  status: string;
  locale?: string;
};

export default function AdminPage() {
  const t = useTranslations('admin');
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    setAppointments(JSON.parse(localStorage.getItem('appointments') || '[]'));
  }, []);

  async function setStatus(id: string, status: string) {
  const appointment = appointments.find(a => a.id === id);

  if (!appointment) return;

    try {
      await fetch('/api/reservations/status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...appointment,
          status
        })
      });

      const next = appointments.map((a) =>
        a.id === id
          ? { ...a, status }
          : a
      );

      setAppointments(next);
      localStorage.setItem(
        'appointments',
        JSON.stringify(next)
      );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-5 py-32 md:px-8">
      <p className="text-sm uppercase tracking-[0.28em] text-gold">{t('eyebrow')}</p>
      <h1 className="mt-3 font-display text-5xl md:text-7xl">{t('title')}</h1>
      <div className="mt-10 grid gap-5 lg:grid-cols-[1.4fr_0.6fr]">
        <div className="luxury-border overflow-x-auto bg-charcoal/75 p-4">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="text-gold">
              <tr>
                <th className="p-3">{t('customer')}</th>
                <th className="p-3">{t('service')}</th>
                <th className="p-3">{t('barber')}</th>
                <th className="p-3">{t('date')}</th>
                <th className="p-3">{t('status')}</th>
                <th className="p-3">{t('actions')}</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id} className="border-t border-white/10">
                  <td className="p-3">{appointment.name}</td>
                  <td className="p-3">{appointment.service}</td>
                  <td className="p-3">{appointment.barber}</td>
                  <td className="p-3">{appointment.date} {appointment.slot}</td>
                  <td className="p-3 text-gold">{appointment.status}</td>
                  <td className="flex gap-2 p-3">
                    <button onClick={() => setStatus(appointment.id, 'approved')} className="luxury-border px-3 py-2">{t('approve')}</button>
                    <button onClick={() => setStatus(appointment.id, 'cancelled')} className="luxury-border px-3 py-2">{t('cancel')}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!appointments.length ? <p className="p-6 text-cream/60">{t('empty')}</p> : null}
        </div>
        <aside className="grid gap-4">
          {['barbers', 'services', 'hours', 'blocked'].map((item) => (
            <div key={item} className="luxury-border bg-charcoal/75 p-5">
              <h2 className="font-display text-3xl">{t(`${item}.title`)}</h2>
              <p className="mt-2 text-sm text-cream/66">{t(`${item}.text`)}</p>
            </div>
          ))}
        </aside>
      </div>
    </section>
  );
}
