export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.status(405).json({ error: 'Method not allowed' })
    return
  }

  const data = request.body || {}

  if (data.website) {
    response.status(200).json({ ok: true })
    return
  }

  if (!data.email || !data.privacy || !data.message) {
    response.status(400).json({ error: 'Faltan campos obligatorios' })
    return
  }

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO || 'info@educonet.es'
  const from = process.env.CONTACT_FROM || 'EduConet <onboarding@resend.dev>'

  if (!apiKey) {
    response.status(501).json({ error: 'Email provider not configured' })
    return
  }

  const subject = data.formType === 'register'
    ? 'Registro de centro - EduConet'
    : 'Consulta desde la web - EduConet'

  const text = Object.entries(data)
    .filter(([key, value]) => value && key !== 'website' && key !== 'privacy')
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n')

  const resendResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: data.email,
      subject,
      text,
    }),
  })

  if (!resendResponse.ok) {
    response.status(502).json({ error: 'No se pudo entregar el email' })
    return
  }

  response.status(200).json({ ok: true })
}
