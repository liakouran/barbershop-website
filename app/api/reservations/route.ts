import { resend } from '@/lib/resend';
import { loadTemplate } from '@/lib/email-template';
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

  await resend.emails.send({
    from: 'Bookings <onboarding@resend.dev>',
    to: parsed.data.email,
    subject:
      locale === 'en'
        ? 'Appointment Confirmation'
        : 'Επιβεβαίωση Κράτησης',
    html: customerHtml
  });

  await resend.emails.send({
    from: 'Bookings <onboarding@resend.dev>',
    to: process.env.ADMIN_EMAIL!,
    subject: 'Νέα Κράτηση',
    html: `
      <h2>Νέα Κράτηση</h2>

      <p><strong>Πελάτης:</strong> ${parsed.data.name}</p>
      <p><strong>Email:</strong> ${parsed.data.email}</p>
      <p><strong>Τηλέφωνο:</strong> ${parsed.data.phone}</p>

      <hr />

      <p><strong>Υπηρεσία:</strong> ${parsed.data.service}</p>
      <p><strong>Barber:</strong> ${parsed.data.barber}</p>
      <p><strong>Ημερομηνία:</strong> ${parsed.data.date}</p>
      <p><strong>Ώρα:</strong> ${parsed.data.slot}</p>

      <p><strong>Σημειώσεις:</strong> ${parsed.data.notes ?? '-'}</p>
    `
  });

  return NextResponse.json({
    ok: true,
    appointment: reservation
  });
}
