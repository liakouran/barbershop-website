import { resend } from '@/lib/resend';
import { loadTemplate } from '@/lib/email-templates';
import {NextResponse} from 'next/server';
import {z} from 'zod';

const reservationSchema = z.object({
  service: z.string().min(1),
  barber: z.string().min(1),
  date: z.string().min(1),
  slot: z.string().min(1),
  name: z.string().min(2),
  phone: z.string().min(6),
  email: z.string().email(),
  notes: z.string().optional()
});

export async function POST(request: Request) {
  const payload = await request.json();

  const parsed = reservationSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const reservation = {
    id: crypto.randomUUID(),
    status: 'pending',
    ...parsed.data
  };

  const locale = payload.locale === 'en' ? 'en' : 'el';

  const customerHtml = await loadTemplate(
    `appointment-confirmation.${locale}.html`,
    {
      name: parsed.data.name,
      service: parsed.data.service,
      barber: parsed.data.barber,
      date: parsed.data.date,
      time: parsed.data.slot
    }
  );

  try {
    const result = await resend.emails.send({
      from: 'Bookings <onboarding@resend.dev>',
      to: parsed.data.email,
      subject:
        locale === 'en'
          ? 'Appointment Confirmation'
          : 'Επιβεβαίωση Κράτησης',
      html: customerHtml
    });

    console.log('CUSTOMER EMAIL RESULT:', result);
  } catch (error) {
    console.error('CUSTOMER EMAIL ERROR:', error);
  }

  try {
    const result = await resend.emails.send({
      from: 'Bookings <onboarding@resend.dev>',
      to: process.env.ADMIN_EMAIL!,
      subject: 'Νέα Κράτηση',
      html: '...'
    });

    console.log('ADMIN EMAIL RESULT:', result);
  } catch (error) {
    console.error('ADMIN EMAIL ERROR:', error);
  }

  return NextResponse.json({
    ok: true,
    appointment: reservation
  });
}
