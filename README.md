# Athenian Blade Barbershop

Modern premium barber shop website for Greece with localized routes, booking UX, admin dashboard scaffold, Prisma schema, and SEO-ready Next.js structure.

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000/el`.

## Included

- Next.js 15 App Router, TypeScript, Tailwind CSS
- Greek default locale and English fallback with `next-intl`
- Pages: home, services, about, gallery, reservations, contact, admin
- Booking flow with service, barber, date, time slot, contact details, notes
- Local admin dashboard for approving/cancelling mock bookings
- Prisma PostgreSQL schema for users, barbers, services, appointments, and working hours
- Cookie consent, WhatsApp shortcut, map embed, localized metadata hooks

Production integrations such as Stripe, Google Calendar, SMS, transactional emails, and NextAuth are scaffolded at the data/API boundary and ready to wire to real credentials.
