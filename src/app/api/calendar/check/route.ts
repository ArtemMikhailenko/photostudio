import { NextRequest } from 'next/server'

function ensureEnv() {
  const CAL_ID = process.env.GOOGLE_CALENDAR_ID
  const SA_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const SA_KEY = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
  const SA_JSON = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON
  const ICS_URL = process.env.GOOGLE_CALENDAR_ICS_URL // public or private iCal address
  // ok if either service-account credentials present or ICS url provided (read-only)
  const ok = !!(ICS_URL || (CAL_ID && (SA_JSON || (SA_EMAIL && SA_KEY))))
  return { ok, CAL_ID, SA_EMAIL, SA_KEY, SA_JSON, ICS_URL }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const start = searchParams.get('start')
  const end = searchParams.get('end')
  const { ok, ICS_URL } = ensureEnv() as any
  if (!start || !end) {
    return new Response(JSON.stringify({ error: 'Missing start/end' }), { status: 400 })
  }
  if (!ok) {
    // Scaffold response; integration not configured yet
    return new Response(JSON.stringify({ busy: [], warning: 'Google Calendar not configured' }), { status: 200 })
  }

  // If ICS URL is provided, use it (no Google Cloud needed)
  if (ICS_URL) {
    try {
      const res = await fetch(ICS_URL)
      if (!res.ok) throw new Error(`ICS fetch failed: ${res.status}`)
      const icsText = await res.text()
      // @ts-ignore
      const ical = await import('node-ical')
      const parsed = ical.sync.parseICS(icsText)
      const timeMin = new Date(start)
      const timeMax = new Date(end)
      const busy: any[] = []
      for (const k of Object.keys(parsed)) {
        const ev: any = (parsed as any)[k]
        if (ev.type !== 'VEVENT') continue
        const evStart = ev.start instanceof Date ? ev.start : new Date(ev.start)
        const evEnd = ev.end instanceof Date ? ev.end : new Date(ev.end)
        // overlap check
        if (evStart < timeMax && evEnd > timeMin) {
          busy.push({ start: evStart.toISOString(), end: evEnd.toISOString(), colorId: null, summary: ev.summary || '' })
        }
      }
      return new Response(JSON.stringify({ busy }), { status: 200 })
    } catch (e: any) {
      return new Response(JSON.stringify({ busy: [], warning: 'Не удалось получить iCal', error: e?.message || String(e) }), { status: 200 })
    }
  }

  try {
    // Dynamic import to avoid build-time dependency
    // @ts-ignore
  const { google } = await import('googleapis')
    // Create auth with service account
    let client: any
    const { CAL_ID } = ensureEnv() as any
    const SA_JSON = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON
    if (SA_JSON) {
      const creds = JSON.parse(SA_JSON)
      client = new google.auth.JWT(creds.client_email, undefined, creds.private_key, [
        'https://www.googleapis.com/auth/calendar.readonly'
      ])
    } else {
      client = new google.auth.JWT(process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL, undefined, (process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY||'').replace(/\\n/g, '\n'), [
        'https://www.googleapis.com/auth/calendar.readonly'
      ])
    }
    await client.authorize()
    const calendar = google.calendar({ version: 'v3', auth: client })
    const { data } = await calendar.events.list({
      calendarId: process.env.GOOGLE_CALENDAR_ID!,
      timeMin: new Date(start).toISOString(),
      timeMax: new Date(end).toISOString(),
      singleEvents: true,
      orderBy: 'startTime'
    })

    const busy = (data.items || []).map((ev: any) => ({
      start: ev.start?.dateTime || ev.start?.date,
      end: ev.end?.dateTime || ev.end?.date,
      colorId: ev.colorId || null,
      summary: ev.summary || ''
    }))
    return new Response(JSON.stringify({ busy }), { status: 200 })
  } catch (e: any) {
    return new Response(JSON.stringify({ busy: [], error: e?.message || String(e) }), { status: 500 })
  }
}
