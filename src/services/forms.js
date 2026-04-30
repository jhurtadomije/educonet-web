const labels = {
  name: 'Nombre',
  surname: 'Apellidos',
  center: 'Centro',
  city: 'Ciudad',
  role: 'Cargo',
  email: 'Correo',
  phone: 'Teléfono',
  students: 'Alumnos aproximados',
  interest: 'Interés',
  message: 'Mensaje',
}

export function buildMailto(formType, values) {
  const subject = formType === 'register'
    ? 'Registro de centro - EduConet'
    : 'Consulta desde la web - EduConet'

  const body = Object.entries(values)
    .filter(([key, value]) => value && key !== 'website' && key !== 'privacy')
    .map(([key, value]) => `${labels[key] || key}: ${value}`)
    .join('\n')

  return `mailto:info@educonet.es?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export async function submitLead(formType, values) {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ formType, ...values }),
  })

  if (!response.ok) {
    throw new Error('No se pudo enviar el formulario')
  }

  return response.json()
}
