"use client"
import { useState, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

export default function CheckoutForm({ initialDate, initialTime, initialService } : { initialDate?: string, initialTime?: string, initialService?: string }){
  const router = useRouter()
  const searchParams = useSearchParams()
  const sm = useTranslations('servicesMenu')
  // Fallback to URL query if props are missing (in case of static rendering/caching)
  const dateQ = searchParams.get('date') || undefined
  const timeQ = searchParams.get('time') || undefined
  const serviceQ = searchParams.get('service') || undefined
  const dateStr = initialDate ?? dateQ
  const timeStr = initialTime ?? timeQ
  const serviceStr = initialService ?? serviceQ
  const resolvedServiceId = serviceStr ?? 'studio'
  const serviceLabel = (() => {
    switch (resolvedServiceId) {
      case 'studio':
        return sm('studio')
      case 'content-2-hours':
        return sm('content2h')
      case 'business':
        return sm('business')
      case 'fashion':
        return sm('fashion')
      case 'artist':
        return sm('artist')
      default:
        return sm('studio')
    }
  })()
  const [name, setName] = useState('')
  const [business, setBusiness] = useState('')
  const [businessNumber, setBusinessNumber] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [agreePrivacy, setAgreePrivacy] = useState(false)
  const [agreeRules, setAgreeRules] = useState(false)
  const [durationHours, setDurationHours] = useState<number>(2)

  const rate = 215
  const vatRate = 0.18

  const startDateTime = useMemo(() => {
    if (!dateStr || !timeStr) return null
    // Parse as local time components to avoid timezone implicit conversions
    const [yy, mm, dd] = dateStr.split('-').map(Number)
    const [hh, mi] = timeStr.split(':').map(Number)
    if (!yy || !mm || !dd || Number.isNaN(hh) || Number.isNaN(mi)) return null
    return new Date(yy, mm - 1, dd, hh, mi, 0, 0)
  }, [dateStr, timeStr])

  const endDateTime = useMemo(() => {
    if (!startDateTime) return null
    return new Date(startDateTime.getTime() + durationHours * 60 * 60 * 1000)
  }, [startDateTime, durationHours])

  const subtotal = rate * durationHours
  const vat = Math.round(subtotal * vatRate)
  const total = subtotal + vat

  function validate(){
    if (!name || !phone || !email) return false
    if (!agreePrivacy || !agreeRules) return false
    return true
  }

  function onProceed(){
    if (!validate()){
      alert('Пожалуйста, заполните все обязательные поля и подтвердите согласия')
      return
    }
    // TODO: call backend to create booking and Google Calendar event, then redirect
    // For now, redirect to placeholder payment URL with amount
    const paymentUrl = `https://example-payment.provider/checkout?amount=${total}&currency=ILS`;
    window.location.href = paymentUrl
  }

  async function onCreateWithoutPayment(){
    if (!validate()){
      alert('Пожалуйста, заполните все обязательные поля и подтвердите согласия')
      return
    }
    if (!startDateTime || !endDateTime){
      alert('Не выбраны дата/время')
      return
    }
    try{
      const color = (resolvedServiceId && resolvedServiceId !== 'studio') ? 'services' : 'rent'
      // Title reflects the selected service so it's visible in Google Calendar
      const title = `Бронь: ${serviceLabel}`
      const description = `Услуга: ${serviceLabel}\nКлиент: ${name}\nТелефон: ${phone}\nEmail: ${email}`
      
      // Create calendar event
      const res = await fetch('/api/calendar/create',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
          start: startDateTime.toISOString(),
          end: endDateTime.toISOString(),
          title,
          description,
          color
        })
      })
      const data = await res.json()
      if (!res.ok){
        throw new Error(data?.error || 'Ошибка создания события')
      }

      // Create lead in Kommo CRM
      const kommoRes = await fetch('/api/kommo/create-lead', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          name,
          phone,
          email,
          business,
          businessNumber,
          service: serviceLabel,
          date: dateStr,
          time: timeStr,
          duration: durationHours,
          total
        })
      })
      const kommoData = await kommoRes.json()
      
      const kommoMsg = kommoData.skipped 
        ? '' 
        : kommoData.leadId 
        ? `\n\nСделка в Kommo создана: ${kommoData.leadId}`
        : '\n\n(Kommo: не удалось создать сделку)'

      alert(`Бронь создана в календаре. ID: ${data.id || '-'}${data.htmlLink ? `\nСсылка: ${data.htmlLink}`:''}${kommoMsg}`)
      router.push('/')
    }catch(e:any){
      alert(`Ошибка: ${e?.message || String(e)}`)
    }
  }

  return (
    <div className="mx-auto max-w-5xl p-6 sm:p-8 bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white">Оформление брони</h2>
      <div className="mb-5 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm text-white/90">
          <div><span className="text-white/60">Услуга:</span> <strong>{serviceLabel}</strong></div>
          <div><span className="text-white/60">Дата:</span> <strong>{dateStr ?? '-'}</strong></div>
          <div><span className="text-white/60">Время:</span> <strong>{timeStr ?? '-'}</strong></div>
          <div><span className="text-white/60">До:</span> <strong>{endDateTime ? endDateTime.toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' }) : '-'}</strong></div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <input 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Имя и фамилия*" 
          className="rounded-xl border border-white/30 bg-white/20 backdrop-blur-md px-4 py-2.5 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition" 
        />
        <input 
          value={business} 
          onChange={(e) => setBusiness(e.target.value)} 
          placeholder="Название бизнеса" 
          className="rounded-xl border border-white/30 bg-white/20 backdrop-blur-md px-4 py-2.5 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition" 
        />
        <input 
          value={businessNumber} 
          onChange={(e) => setBusinessNumber(e.target.value)} 
          placeholder="Номер бизнеса" 
          className="rounded-xl border border-white/30 bg-white/20 backdrop-blur-md px-4 py-2.5 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition" 
        />
        <input 
          value={phone} 
          onChange={(e) => setPhone(e.target.value)} 
          placeholder="Телефон*" 
          className="rounded-xl border border-white/30 bg-white/20 backdrop-blur-md px-4 py-2.5 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition" 
        />
        <input 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email*" 
          className="rounded-xl border border-white/30 bg-white/20 backdrop-blur-md px-4 py-2.5 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition" 
        />

        <div className="flex items-center justify-between gap-4 px-4 py-2.5 rounded-xl bg-white/20 backdrop-blur-md border border-white/30">
          <label className="text-sm font-medium text-white/90">Длительность (ч)</label>
          <input 
            type="number" 
            min={1} 
            max={12} 
            value={durationHours} 
            onChange={(e) => setDurationHours(Number(e.target.value)||1)} 
            className="w-16 rounded-lg border border-white/30 bg-white/20 backdrop-blur-md px-3 py-1.5 text-center text-white focus:outline-none focus:ring-2 focus:ring-white/50" 
          />
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-xl border border-white/30 p-4 bg-white/10 backdrop-blur-md">
          <div className="text-xs text-white/60 mb-2">215 ₪ в час + 18% НДС</div>
          <div className="space-y-1.5 text-sm text-white/90">
            <div className="flex justify-between"><span>Без НДС:</span> <strong>{subtotal} ₪</strong></div>
            <div className="flex justify-between"><span>НДС (18%):</span> <strong>{vat} ₪</strong></div>
          </div>
          <div className="mt-3 pt-3 border-t border-white/20 flex justify-between items-center text-base font-bold text-white">
            <span>Итого:</span> <span className="text-[var(--primary)]">{total} ₪</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="flex items-start gap-2 p-3 rounded-lg bg-white/10 hover:bg-white/15 transition cursor-pointer">
            <input type="checkbox" checked={agreePrivacy} onChange={(e) => setAgreePrivacy(e.target.checked)} className="mt-0.5 h-4 w-4 rounded border-white/30 bg-white/20 text-[var(--primary)] focus:ring-white/50" />
            <span className="text-xs text-white/90">Согласен с Политикой конфиденциальности*</span>
          </label>

          <label className="flex items-start gap-2 p-3 rounded-lg bg-white/10 hover:bg-white/15 transition cursor-pointer">
            <input type="checkbox" checked={agreeRules} onChange={(e) => setAgreeRules(e.target.checked)} className="mt-0.5 h-4 w-4 rounded border-white/30 bg-white/20 text-[var(--primary)] focus:ring-white/50" />
            <span className="text-xs text-white/90">Согласен с Правилами студии*</span>
          </label>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mt-5 pt-4 border-t border-white/20">
        <button 
          onClick={onProceed} 
          className="flex-1 min-w-[140px] rounded-full bg-[var(--primary)] hover:bg-[var(--primary-hover)] px-5 py-2.5 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          Перейти к оплате
        </button>
        <button 
          onClick={onCreateWithoutPayment} 
          type="button" 
          className="flex-1 min-w-[140px] rounded-full bg-emerald-600 hover:bg-emerald-700 px-5 py-2.5 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          Создать бронь (тест)
        </button>
        <button 
          onClick={() => router.back()} 
          className="rounded-full border-2 border-white/40 hover:border-white/60 bg-white/10 hover:bg-white/20 px-5 py-2.5 font-semibold text-white transition-all"
        >
          Отмена
        </button>
      </div>
    </div>
  )
}
