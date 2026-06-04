import { NextResponse } from 'next/server';
import { resend } from '@/lib/resend';
import { loadTemplate } from '@/lib/email-templates';

export async function POST(request: Request) {
  const payload = await request.json();

  const locale = payload.locale === 'en' ? 'en' : 'el';

  try {
    if (payload.status === 'approved') {
      const html = await loadTemplate(
        `appointment-confirmation.${locale}.html`,
        {
          name: payload.name,
          service: payload.service,
          barber: payload.barber,
          date: payload.date,
          time: payload.slot
        }
      );

      await resend.emails.send({
        from: 'Bookings <onboarding@resend.dev>',
        to: payload.email,
        subject:
          locale === 'en'
            ? 'Appointment Confirmed'
            : 'Η Κράτησή σου Επιβεβαιώθηκε',
        html
      });
    }

    if (payload.status === 'cancelled') {
      const html = await loadTemplate(
        `appointment-cancelled.${locale}.html`,
        {
          name: payload.name,
          service: payload.service,
          date: payload.date,
          time: payload.slot
        }
      );

      await resend.emails.send({
        from: 'Bookings <onboarding@resend.dev>',
        to: payload.email,
        subject:
          locale === 'en'
            ? 'Appointment Cancelled'
            : 'Η Κράτησή σου Ακυρώθηκε',
        html
      });
    }

    return NextResponse.json({
      ok: true
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { ok: false },
      { status: 500 }
    );
  }
}