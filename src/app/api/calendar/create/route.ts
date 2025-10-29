import { NextRequest } from 'next/server'

const COLOR_MAP: Record<string, string> = {
  rent: '9',      // blue (adjust as needed in Google Calendar UI)
  services: '10', // green
  external: '11', // red
}

function ensureEnv() {
  const CAL_ID = process.env.GOOGLE_CALENDAR_ID
  const SA_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const SA_KEY = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
  const SA_JSON = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON
  const WEBHOOK = process.env.GOOGLE_CALENDAR_WEBHOOK_URL
  const ok = !!(CAL_ID && (SA_JSON || (SA_EMAIL && SA_KEY)))
  return { ok, CAL_ID, SA_EMAIL, SA_KEY, SA_JSON, WEBHOOK }
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}))
  const { start, end, title, description, color = 'rent' } = body || {}
  if (!start || !end || !title) {
    return new Response(JSON.stringify({ error: 'Missing required fields (start, end, title)' }), { status: 400 })
  }
  const TIMEZONE = process.env.BOOKING_TIMEZONE || 'Asia/Jerusalem'
  const { ok, WEBHOOK } = ensureEnv() as any
  // Fallback: if service account not configured but webhook is provided, forward to webhook
  if (!ok && WEBHOOK) {
    try {
      const res = await fetch(WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ start, end, title, description, color })
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.error || `Webhook error: ${res.status}`)
      return new Response(JSON.stringify({ id: data.id || null, htmlLink: data.htmlLink || null, via: 'webhook' }), { status: 200 })
    } catch (e: any) {
      return new Response(JSON.stringify({ error: e?.message || String(e) }), { status: 500 })
    }
  }
  if (!ok) {
    return new Response(JSON.stringify({ error: 'Google Calendar not configured' }), { status: 501 })
  }

  try {
    // @ts-ignore
    const { google } = await import('googleapis')
    let client: any
    const SA_JSON = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON
    if (SA_JSON) {
      const creds = JSON.parse(SA_JSON)
      client = new google.auth.JWT(creds.client_email, undefined, creds.private_key, [
        'https://www.googleapis.com/auth/calendar'
      ])
    } else {
      client = new google.auth.JWT(process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL, undefined, (process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY||'').replace(/\\n/g, '\n'), [
        'https://www.googleapis.com/auth/calendar'
      ])
    }
    await client.authorize()
    const calendar = google.calendar({ version: 'v3', auth: client })

    const res = await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID!,
      requestBody: {
        summary: title,
        description,
        start: { dateTime: new Date(start).toISOString(), timeZone: TIMEZONE },
        end: { dateTime: new Date(end).toISOString(), timeZone: TIMEZONE },
        colorId: COLOR_MAP[color] ?? undefined,
      }
    })

    return new Response(JSON.stringify({ id: res.data.id, htmlLink: res.data.htmlLink }), { status: 200 })
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e?.message || String(e) }), { status: 500 })
  }
}
