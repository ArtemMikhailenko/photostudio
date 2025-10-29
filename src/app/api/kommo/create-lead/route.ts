import { NextRequest } from 'next/server'

type KommoLeadData = {
  name: string
  phone: string
  email: string
  business?: string
  businessNumber?: string
  service: string
  date: string
  time: string
  duration: number
  total: number
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const { name, phone, email, business, businessNumber, service, date, time, duration, total } = body as KommoLeadData

    if (!name || !phone || !email) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 })
    }

    const KOMMO_SUBDOMAIN = process.env.KOMMO_SUBDOMAIN
    const KOMMO_ACCESS_TOKEN = process.env.KOMMO_ACCESS_TOKEN

    if (!KOMMO_SUBDOMAIN || !KOMMO_ACCESS_TOKEN) {
      console.warn('Kommo CRM not configured, skipping lead creation')
      return new Response(JSON.stringify({ warning: 'Kommo not configured', skipped: true }), { status: 200 })
    }

    // Prepare lead data for Kommo API
    const leadName = `Бронирование: ${service} - ${date}`
    const leadPrice = total

    const noteText = `Бронирование студии
Услуга: ${service}
Дата: ${date}
Время: ${time}
Длительность: ${duration} ч
Итого: ${total} ₪

Клиент: ${name}
Телефон: ${phone}
Email: ${email}
${business ? `Название бизнеса: ${business}` : ''}
${businessNumber ? `Номер бизнеса: ${businessNumber}` : ''}`

    // Create lead in Kommo (simplified without custom fields)
    const leadPayload = {
      name: leadName,
      price: leadPrice
    }

    const apiUrl = `https://${KOMMO_SUBDOMAIN}.kommo.com/api/v4/leads`
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${KOMMO_ACCESS_TOKEN}`
      },
      body: JSON.stringify([leadPayload])
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('Kommo API error response:', JSON.stringify(data, null, 2))
      throw new Error(data?.detail || data?.title || `Kommo API error: ${response.status}`)
    }

    const leadId = data?._embedded?.leads?.[0]?.id

    // Add note to the lead
    if (leadId) {
      const notePayload = {
        note_type: 'common',
        params: {
          text: noteText
        }
      }

      await fetch(`https://${KOMMO_SUBDOMAIN}.kommo.com/api/v4/leads/${leadId}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${KOMMO_ACCESS_TOKEN}`
        },
        body: JSON.stringify([notePayload])
      }).catch(err => console.warn('Failed to add note to Kommo lead:', err))
    }

    return new Response(JSON.stringify({ 
      success: true, 
      leadId,
      leadUrl: leadId ? `https://${KOMMO_SUBDOMAIN}.kommo.com/leads/detail/${leadId}` : null
    }), { status: 200 })

  } catch (e: any) {
    console.error('Kommo integration error:', e)
    return new Response(JSON.stringify({ error: e?.message || String(e) }), { status: 500 })
  }
}
