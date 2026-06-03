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
    return NextResponse.json({ok: false, errors: parsed.error.flatten()}, {status: 422});
  }

  // Production path: persist with Prisma, prevent double booking in a transaction,
  // send localized email/SMS, sync Google Calendar, and optionally create Stripe payment.
  return NextResponse.json({
    ok: true,
    appointment: {
      id: crypto.randomUUID(),
      status: 'pending',
      ...parsed.data
    }
  });
}
