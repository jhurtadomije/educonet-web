export const contact = {
  phone: '+34 900 000 000',
  phoneHref: 'tel:+34900000000',
  email: 'info@educonet.es',
  emailHref: 'mailto:info@educonet.es',
  address: ['Calle Edu, 10', '28001 Madrid, España'],
  schedule: 'Lun-Vie: 9:00-18:00',
}

export const navItems = [
  { label: 'Inicio', path: '/' },
  { label: 'Nosotros', path: '/nosotros' },
  { label: 'Servicios', path: '/servicios' },
  { label: 'Tarifas', path: '/tarifas' },
  { label: 'Registro centros', path: '/registro-centros' },
  { label: 'Contacto', path: '/contacto' },
]

export const heroSlides = [
  {
    title: ['Soluciones informáticas', 'para centros educativos'],
    text: 'Mantenimiento, desarrollo y diseño digital pensado para colegios, institutos y academias.',
    image: '/images/educonet-hero-classroom.jpg',
    cta: 'Conócenos',
    path: '/nosotros',
  },
  {
    title: ['Tecnología educativa', 'sin complicaciones'],
    text: 'Soporte técnico fiable y soluciones digitales personalizadas para tu centro escolar.',
    image: '/images/educonet-web-development.jpg',
    cta: 'Ver servicios',
    path: '/servicios',
  },
  {
    title: ['Comunicación digital', 'para el sector educativo'],
    text: 'Diseño web y apps que conectan a familias, profesores y alumnos con eficiencia.',
    image: '/images/educonet-network-support.jpg',
    cta: 'Contacta ahora',
    path: '/contacto',
  },
]

export const services = [
  {
    title: 'Mantenimiento',
    icon: 'mercury-icon-chart-up',
    text: 'Soporte técnico integral para equipos, redes y servidores de centros educativos, con atención rápida y profesional.',
  },
  {
    title: 'Web y portales',
    icon: 'mercury-icon-group',
    text: 'Diseñamos páginas web, plataformas y aplicaciones adaptadas a la comunicación y gestión de colegios, institutos y academias.',
  },
  {
    title: 'Diseño digital',
    icon: 'mercury-icon-partners',
    text: 'Creamos identidad visual, materiales digitales y experiencia de usuario pensada para el sector educativo.',
  },
]

export const pricingPlans = [
  {
    name: 'Esencial',
    price: 'desde 149 €/mes',
    featured: false,
    description: 'Para academias o centros pequeños que necesitan soporte TIC recurrente.',
    features: ['Bolsa de 4 horas mensuales', 'Soporte remoto prioritario', 'Revisión básica de red y equipos', 'Informe mensual de incidencias'],
    cta: 'Solicitar acceso',
    path: '/registro-centros',
  },
  {
    name: 'Centro',
    price: 'desde 349 €/mes',
    featured: true,
    description: 'Para colegios e institutos que necesitan mantenimiento continuo y mejoras digitales.',
    features: ['Bolsa de 10 horas mensuales', 'Soporte remoto y presencial programado', 'Gestión de incidencias y prioridades', 'Asesoramiento web y comunicación digital'],
    cta: 'Registrar centro',
    path: '/registro-centros',
  },
  {
    name: 'Integral',
    price: 'a medida',
    featured: false,
    description: 'Para centros con varias sedes, proyectos web/app o necesidad de acompañamiento completo.',
    features: ['Plan de mantenimiento personalizado', 'Desarrollo web, formularios o portales', 'Diseño UX/UI y materiales digitales', 'Seguimiento trimestral con dirección'],
    cta: 'Hablar con EduConet',
    path: '/contacto',
  },
]

export const footerServices = ['Mantenimiento', 'Desarrollo', 'Diseño', 'Planes', 'Acceso tarifas']
