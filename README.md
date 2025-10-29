This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Google Calendar integration

Two ways to provide availability to the booking calendar:

1) Service account (recommended, read/write)
- Create a Google Cloud project, enable Google Calendar API.
- Create a service account and a JSON key.
- Share your Google Calendar with the service account email (Settings → Share with specific people). For writing, grant “Make changes to events”.
- Add env vars (see `.env.example`):
	- `GOOGLE_CALENDAR_ID`
	- Either `GOOGLE_APPLICATION_CREDENTIALS_JSON` (paste full JSON) or the pair `GOOGLE_SERVICE_ACCOUNT_EMAIL` and `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` (newlines as `\n`).

2) iCal URL (read-only)
- Put `GOOGLE_CALENDAR_ICS_URL` with your (public or private) iCal URL; the API will parse `.ics` and disable conflicting slots. Event creation is not available in this mode.

### Endpoints
- `GET /api/calendar/check?start=ISO&end=ISO` — busy intervals for the window.
- `POST /api/calendar/create` — create an event (requires service account envs). Body: `{ start, end, title, description, color }` where color is `rent|services|external`.
	- Fallback without Cloud: set `GOOGLE_CALENDAR_WEBHOOK_URL` (Zapier/Make/Pipedream). The API will POST `{ start, end, title, description, color }` to your webhook.

### Testing without payments
On the checkout page there is a button "Создать бронь (тест)". It calls `/api/calendar/create` directly to create an event in your calendar.

## Kommo CRM integration

To automatically create leads in Kommo when a booking is made:

1. **Get your Kommo credentials:**
   - Go to Kommo → Settings → API
   - Create a new integration and get your long-lived access token
   - Note your subdomain (e.g., `yourcompany` from `yourcompany.kommo.com`)

2. **Find custom field IDs (optional):**
   - In Kommo API settings, find the field IDs for Phone and Email
   - Or use the API to list fields: `GET https://yoursubdomain.kommo.com/api/v4/leads/custom_fields`

3. **Configure environment variables:**
   ```bash
   KOMMO_SUBDOMAIN=yoursubdomain
   KOMMO_ACCESS_TOKEN=your_long_lived_access_token
   KOMMO_FIELD_PHONE=123456  # optional
   KOMMO_FIELD_EMAIL=123457  # optional
   ```

4. **How it works:**
   - When a user clicks "Создать бронь (тест)" on checkout, the system:
     - Creates an event in Google Calendar
     - Creates a lead in Kommo with client details, booking info, and total price
     - Adds a note to the lead with full booking details
   - If Kommo is not configured, booking still works (calendar-only)

### Endpoint
- `POST /api/kommo/create-lead` — create a lead in Kommo. Body: `{ name, phone, email, business?, businessNumber?, service, date, time, duration, total }`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
