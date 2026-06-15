# Backend Setup Guide

## 1. Install Dependencies

Install the backend packages added for Prisma, Resend, bcrypt, and NextAuth:

```bash
npm install
```

If Prisma client generation does not run automatically, run:

```bash
npx prisma generate
```

## 2. Configure Environment Variables

Copy [.env.example](.env.example) to [.env.local](.env.local) and fill in the values:

- `DATABASE_URL`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `ADMIN_EMAIL`
- `AUTH_SECRET`
- `AUTH_URL`
- `NEXT_PUBLIC_CONTACT_EMAIL`
- `NEXT_PUBLIC_CONTACT_PHONE`
- `NEXT_PUBLIC_INSTAGRAM_URL`

## 3. Create the Database

Run the first migration after the PostgreSQL database is available:

```bash
npx prisma migrate dev --name init
```

For production:

```bash
npx prisma migrate deploy
```

## 4. API Routes

- `POST /api/contact` submits the contact form and stores a lead.
- `POST /api/quote-request` submits a quote request and stores a quote lead.
- `POST /api/newsletter/subscribe` stores a newsletter subscriber.
- `POST /api/leads` creates a lead record.
- `GET /api/leads` lists leads for admin use.
- `GET /api/leads/:id` fetches a single lead.
- `PATCH /api/leads/:id` updates a lead.
- `DELETE /api/leads/:id` deletes a lead.

## 5. Admin Dashboard

Open `/admin` to view lead stats and `/admin/leads` to browse records.

The dashboard is server-rendered, requires a signed-in admin session, and reads from PostgreSQL directly.

Use `/login` to access the admin login form.

To create the initial admin account, run the Prisma seed script after the database is ready:

```bash
npx prisma db seed
```

Default seed credentials:

- Email: `admin@thedigitalarmss.com`
- Password: `Admin@123`

## 6. Email Delivery

Resend is used for:

- Lead confirmations
- Admin notifications
- Quote confirmations
- Quote admin alerts

If Resend is not configured, email sends will fail gracefully and the API will return a server error.

Make sure `RESEND_FROM_EMAIL` is a sender verified in your Resend account. The default `onboarding@resend.dev` sender is a safe choice for development and should deliver to `thedigitalarmss@gmail.com` as the recipient.

## 7. Validation and Security

- Zod validates all incoming request bodies.
- Rate limiting is applied to contact, quote, and newsletter endpoints.
- Admin API routes are protected through NextAuth session checks and role-based authorization.

## 8. Run Locally

```bash
npm run dev
```

Then open:

- `http://localhost:3000`
- `http://localhost:3000/admin`

## 9. Public Contact Details

- Email: `thedigitalarmss@gmail.com`
- Phone: `9518320785`
- Instagram: `https://www.instagram.com/thedigitalarmss?igsh=cmZpaDZueWFsaGRh&utm_source=qr`