<template>
  <div class="page">
    <SiteHeader :route="route" @navigate="navigate" />
    <main>
      <HomePage v-if="page === 'home'" @navigate="navigate" />
      <AboutPage v-else-if="page === 'about'" @navigate="navigate" />
      <ServicesPage v-else-if="page === 'services'" @navigate="navigate" />
      <PricingPage v-else-if="page === 'pricing'" @navigate="navigate" />
      <RegisterPage v-else-if="page === 'register'" />
      <ContactPage v-else-if="page === 'contact'" />
      <LegalPage v-else-if="page === 'privacy'" title="Política de privacidad" />
      <LegalPage v-else-if="page === 'legal'" title="Aviso legal" />
      <NotFoundPage v-else @navigate="navigate" />
    </main>
    <SiteFooter @navigate="navigate" />
  </div>
</template>

<script setup>
import { computed, defineComponent, h, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { buildMailto, submitLead } from './services/forms'
import { contact, footerServices, heroSlides, navItems, pricingPlans, services } from './data/site'

const aliases = {
  '/index.html': '/',
  '/about.html': '/nosotros',
  '/servicios.html': '/servicios',
  '/tarifas.html': '/tarifas',
  '/registro-centro.html': '/registro-centros',
  '/contacts.html': '/contacto',
  '/privacidad.html': '/privacidad',
  '/aviso-legal.html': '/aviso-legal',
}

const pageByRoute = {
  '/': 'home',
  '/nosotros': 'about',
  '/servicios': 'services',
  '/tarifas': 'pricing',
  '/registro-centros': 'register',
  '/contacto': 'contact',
  '/privacidad': 'privacy',
  '/aviso-legal': 'legal',
}

const route = ref(normalizePath(window.location.pathname))

const page = computed(() => pageByRoute[route.value])

function normalizePath(path) {
  const clean = path.replace(/\/+$/, '') || '/'
  return aliases[clean] || clean
}

function navigate(path) {
  const next = normalizePath(path)
  route.value = next
  history.pushState({}, '', next)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function linkHandler(path, event) {
  event.preventDefault()
  navigate(path)
}

const onPopState = () => {
  route.value = normalizePath(window.location.pathname)
}

onMounted(() => {
  window.addEventListener('popstate', onPopState)
})

onBeforeUnmount(() => {
  window.removeEventListener('popstate', onPopState)
})

const AppLink = defineComponent({
  props: { to: { type: String, required: true }, class: { type: String, default: '' } },
  emits: ['navigate'],
  setup(props, { slots, emit }) {
    return () => h('a', {
      href: props.to,
      class: props.class,
      onClick: (event) => {
        event.preventDefault()
        emit('navigate', props.to)
      },
    }, slots.default?.())
  },
})

const SiteHeader = defineComponent({
  props: { route: { type: String, required: true } },
  emits: ['navigate'],
  setup(props, { emit }) {
    const open = ref(false)
    const go = (path) => {
      open.value = false
      emit('navigate', path)
    }

    return () => h('header', { class: 'section page-header rd-navbar-transparent-wrap app-header' }, [
      h('div', { class: 'rd-navbar-wrap' }, [
        h('nav', { class: ['rd-navbar rd-navbar-transparent app-navbar', open.value && 'is-open'] }, [
          h('div', { class: 'rd-navbar-aside-outer rd-navbar-collapse' }, [
            h('div', { class: 'rd-navbar-aside' }, [
              h('div', { class: 'rd-navbar-info' }, [
                h('div', { class: 'icon novi-icon mdi mdi-phone' }),
                h('a', { href: contact.phoneHref }, contact.phone),
              ]),
              h('ul', { class: 'list-lined' }, [
                h('li', [h('a', { href: '/registro-centros', onClick: (e) => linkHandler('/registro-centros', e) }, 'Acceso centros')]),
                h('li', [h('a', { href: '/tarifas', onClick: (e) => linkHandler('/tarifas', e) }, 'Tarifas')]),
              ]),
            ]),
          ]),
          h('div', { class: 'rd-navbar-main-outer' }, [
            h('div', { class: 'rd-navbar-main-inner' }, [
              h('div', { class: 'rd-navbar-main' }, [
                h('div', { class: 'rd-navbar-panel' }, [
                  h('button', {
                    class: 'rd-navbar-toggle app-nav-toggle',
                    type: 'button',
                    'aria-label': 'Abrir navegación',
                    onClick: () => { open.value = !open.value },
                  }, [h('span')]),
                  h('div', { class: 'rd-navbar-brand' }, [
                    h('a', { class: 'brand', href: '/', onClick: (e) => { e.preventDefault(); go('/') } }, [
                      h('img', { class: 'brand-logo-light', src: '/images/educonet-logo.png', alt: 'EduConet logo', width: 200, height: 133 }),
                    ]),
                  ]),
                ]),
                h('div', { class: 'rd-navbar-main-element' }, [
                  h('div', { class: 'rd-navbar-nav-wrap' }, [
                    h('ul', { class: 'rd-navbar-nav' }, navItems.map((item) => h('li', {
                      class: ['rd-nav-item', props.route === item.path && 'active'],
                    }, [
                      h('a', { class: 'rd-nav-link', href: item.path, onClick: (e) => { e.preventDefault(); go(item.path) } }, item.label),
                    ]))),
                  ]),
                ]),
              ]),
            ]),
          ]),
        ]),
      ]),
    ])
  },
})

const SiteFooter = defineComponent({
  emits: ['navigate'],
  setup(_, { emit }) {
    const link = (path, label) => h('li', [h('a', { href: path, onClick: (e) => { e.preventDefault(); emit('navigate', path) } }, label)])

    return () => h('footer', { class: 'section footer-classic' }, [
      h('div', { class: 'footer-inner-1' }, [
        h('div', { class: 'container' }, [
          h('div', { class: 'row row-40' }, [
            h('div', { class: 'col-md-5 col-lg-3' }, [
              h('h5', 'Contacto'),
              h('ul', { class: 'contact-list font-weight-bold' }, [
                h('li', [h('div', { class: 'unit unit-spacing-xs' }, [h('div', { class: 'unit-left' }, [h('div', { class: 'icon icon-sm icon-primary novi-icon mdi mdi-map-marker' })]), h('div', { class: 'unit-body' }, [h('span', [contact.address[0], h('br'), contact.address[1]])])])]),
                h('li', [h('div', { class: 'unit unit-spacing-xs' }, [h('div', { class: 'unit-left' }, [h('div', { class: 'icon icon-sm icon-primary novi-icon mdi mdi-phone' })]), h('div', { class: 'unit-body' }, [h('a', { href: contact.phoneHref }, contact.phone)])])]),
                h('li', [h('div', { class: 'unit unit-spacing-xs' }, [h('div', { class: 'unit-left' }, [h('div', { class: 'icon icon-sm icon-primary novi-icon mdi mdi-clock' })]), h('div', { class: 'unit-body' }, [h('ul', { class: 'list-0' }, [h('li', contact.schedule), h('li', 'Sáb-Dom: Cerrado')])])])]),
              ]),
              h('a', { class: 'd-inline-block big', href: contact.emailHref }, contact.email),
            ]),
            h('div', { class: 'col-md-6 col-lg-5' }, [
              h('h5', 'Enlaces'),
              h('div', { class: 'row row-5 justify-content-between' }, [
                h('div', { class: 'col-sm-6' }, [h('ul', { class: 'footer-list big' }, navItems.map((item) => link(item.path, item.label)))]),
                h('div', { class: 'col-sm-4 col-lg-6 col-xxl-5' }, [h('ul', { class: 'footer-list big' }, footerServices.map((label, index) => link(index < 3 ? '/servicios' : index === 3 ? '/tarifas' : '/registro-centros', label)))]),
              ]),
            ]),
            h('div', { class: 'col-md-12 col-lg-4' }, [
              h('h5', 'Especialidades'),
              h('ul', { class: 'footer-list big' }, ['Redes y Wi-Fi escolar', 'Webs y portales para familias', 'Soporte TIC continuo', 'Diseño UX/UI educativo'].map((item) => h('li', item))),
            ]),
          ]),
        ]),
      ]),
      h('div', { class: 'footer-inner-2' }, [
        h('div', { class: 'container' }, [
          h('p', { class: 'rights' }, [
            `© ${new Date().getFullYear()} EduConet. Todos los derechos reservados. `,
            h('a', { href: '/privacidad', onClick: (e) => { e.preventDefault(); emit('navigate', '/privacidad') } }, 'Privacidad'),
            ' · ',
            h('a', { href: '/aviso-legal', onClick: (e) => { e.preventDefault(); emit('navigate', '/aviso-legal') } }, 'Aviso legal'),
          ]),
        ]),
      ]),
    ])
  },
})

const Breadcrumbs = defineComponent({
  props: { current: { type: String, required: true } },
  emits: ['navigate'],
  setup(props, { emit }) {
    return () => h('section', { class: 'breadcrumbs-custom bg-image novi-background bg-primary' }, [
      h('div', { class: 'container' }, [
        h('ul', { class: 'breadcrumbs-custom-path' }, [
          h('li', [h('a', { href: '/', onClick: (e) => { e.preventDefault(); emit('navigate', '/') } }, 'Inicio')]),
          h('li', { class: 'active' }, props.current),
        ]),
      ]),
    ])
  },
})

const HomePage = defineComponent({
  emits: ['navigate'],
  setup(_, { emit }) {
    const active = ref(0)
    const timer = setInterval(() => {
      active.value = (active.value + 1) % heroSlides.length
    }, 5000)
    onBeforeUnmount(() => clearInterval(timer))

    return () => h('div', [
      h('section', { class: 'section app-hero context-dark app-animate', style: { backgroundImage: `url(${heroSlides[active.value].image})` } }, [
        h('div', { class: 'container' }, [
          h('div', { class: 'app-hero-content' }, [
            h('h1', [h('span', { class: 'd-block' }, heroSlides[active.value].title[0]), h('span', { class: 'd-block text-light' }, heroSlides[active.value].title[1])]),
            h('p', { class: 'lead' }, heroSlides[active.value].text),
            h('a', { class: 'button button-secondary-text', href: heroSlides[active.value].path, onClick: (e) => { e.preventDefault(); emit('navigate', heroSlides[active.value].path) } }, heroSlides[active.value].cta),
          ]),
        ]),
      ]),
      h('section', { class: 'section section-sm section-sm-bottom-100 bg-primary app-animate app-animate-delay-1' }, [
        h('div', { class: 'container' }, [
          h('div', { class: 'row row-30' }, services.map((service) => h('div', { class: 'col-md-4' }, [
            h('article', { class: 'box-icon-2' }, [
              h('div', { class: `icon novi-icon ${service.icon}` }),
              h('h5', service.title),
              h('p', { class: 'text' }, service.text),
            ]),
          ]))),
        ]),
      ]),
      h('section', { class: 'section bg-gray-100 box-image-left app-split app-animate app-animate-delay-2' }, [
        h('div', { class: 'box-image-item box-image-video novi-background bg-image', style: { backgroundImage: 'url(/images/educonet-team-school.jpg)' } }),
        h('div', { class: 'container' }, [
          h('div', { class: 'row' }, [
            h('div', { class: 'col-md-6' }, [
              h('h2', { class: 'title-icon title-icon-2' }, [h('span', { class: 'icon icon-default mercury-icon-touch' }), h('span', ['Soluciones ', h('br'), h('span', { class: 'text-light' }, 'a medida')])]),
              h('p', { class: 'big' }, 'Trabajamos con centros educativos y empresas del sector para ofrecer soluciones digitales que simplifican el día a día del profesorado, las familias y la administración escolar.'),
              h('div', { class: 'group-sm group-wrap-2' }, [
                h('a', { class: 'button button-primary', href: '/nosotros', onClick: (e) => { e.preventDefault(); emit('navigate', '/nosotros') } }, 'Conócenos'),
                h('a', { class: 'button button-icon button-icon-right button-secondary', href: '/contacto', onClick: (e) => { e.preventDefault(); emit('navigate', '/contacto') } }, [h('span', 'Contáctanos'), h('span', { class: 'icon fa fa-envelope' })]),
              ]),
            ]),
          ]),
        ]),
      ]),
      h('section', { class: 'section bg-default section-md app-animate' }, [
        h('div', { class: 'container' }, [
          h('div', { class: 'row row-40 align-items-center' }, [
            h('div', { class: 'col-lg-6' }, [
              h('h2', { class: 'title-icon' }, [h('span', { class: 'icon icon-default mercury-icon-target-2' }), h('span', ['Nuestra ', h('span', { class: 'text-light' }, 'misión')])]),
              h('p', { class: 'big' }, 'Acompañamos a centros educativos en su transformación digital con servicios de mantenimiento IT, desarrollo web/app y diseño pensado para el entorno escolar.'),
              h('ul', { class: 'list-marked list-marked-primary' }, ['Respuesta clara ante incidencias TIC', 'Webs y portales útiles para familias', 'Diseño digital enfocado en educación'].map((item) => h('li', item))),
              h('a', { class: 'button button-primary', href: '/servicios', onClick: (e) => { e.preventDefault(); emit('navigate', '/servicios') } }, 'Nuestros servicios'),
            ]),
            h('div', { class: 'col-lg-6' }, [
              h('div', { class: 'row row-30' }, [
                ['12', 'Centros apoyados'], ['38', 'Proyectos completados'], ['420', 'Equipos gestionados'], ['98%', 'Satisfacción'],
              ].map(([number, label]) => h('div', { class: 'col-6' }, [h('article', { class: 'box-counter' }, [h('div', { class: 'box-counter-main' }, [h('div', { class: 'counter' }, number)]), h('p', { class: 'box-counter-title' }, label)])]))),
            ]),
          ]),
        ]),
      ]),
      h('section', { class: 'section app-parallax context-dark app-animate', style: { backgroundImage: 'url(/images/educonet-hero-classroom.jpg)' } }, [
        h('div', { class: 'container' }, [
          h('h2', ['Soporte TIC ', h('span', { class: 'text-light' }, 'para el curso completo')]),
          h('a', { class: 'button button-primary', href: '/contacto', onClick: (e) => { e.preventDefault(); emit('navigate', '/contacto') } }, 'Solicitar diagnóstico'),
        ]),
      ]),
    ])
  },
})

const AboutPage = defineComponent({
  emits: ['navigate'],
  setup(_, { emit }) {
    return () => h('div', [
      h(Breadcrumbs, { current: 'Nosotros', onNavigate: (path) => emit('navigate', path) }),
      h('section', { class: 'section section-lg bg-default app-animate' }, [
        h('div', { class: 'container' }, [
          h('div', { class: 'row row-40 align-items-center' }, [
            h('div', { class: 'col-lg-6' }, [
              h('h2', ['Nuestra ', h('span', { class: 'text-light' }, 'historia')]),
              h('p', { class: 'big' }, 'EduConet nace para acompañar a los centros educativos en su transformación digital. Ofrecemos servicios de mantenimiento, desarrollo y diseño con un enfoque especializado en colegios, institutos y academias.'),
              h('div', { class: 'app-history-card' }, [
                h('h5', '2020'),
                h('p', 'Comenzamos apoyando a centros educativos con instalaciones de red y protección de equipos informáticos.'),
                h('img', { class: 'img-responsive', src: '/images/educonet-team-school.jpg', alt: 'Equipo EduConet' }),
              ]),
            ]),
            h('div', { class: 'col-lg-5 offset-lg-1' }, [
              h('h5', '2021'),
              h('p', 'Ampliamos nuestros servicios con desarrollo de páginas web y plataformas internas para centros educativos.'),
              h('h5', '2022'),
              h('p', 'Incorporamos diseño gráfico y UX para transformar la comunicación digital de colegios e instituciones.'),
              h('h5', 'Hoy'),
              h('p', 'Trabajamos junto a educadores y equipos de gestión para ofrecer soluciones tecnológicas prácticas y confiables.'),
              h('a', { class: 'button button-primary', href: '/contacto', onClick: (e) => { e.preventDefault(); emit('navigate', '/contacto') } }, 'Contáctanos'),
            ]),
          ]),
        ]),
      ]),
    ])
  },
})

const ServicesPage = defineComponent({
  emits: ['navigate'],
  setup(_, { emit }) {
    return () => h('div', [
      h(Breadcrumbs, { current: 'Servicios', onNavigate: (path) => emit('navigate', path) }),
      h('section', { class: 'section section-lg bg-default app-animate' }, [
        h('div', { class: 'container' }, [
          h('div', { class: 'row row-40' }, [
            h('div', { class: 'col-lg-7' }, [
              h('h2', ['Soluciones ', h('span', { class: 'text-light' }, 'a medida')]),
              h('p', { class: 'big' }, 'Adaptamos cada proyecto a las necesidades reales de tu centro, desde la web hasta el soporte de aula.'),
              h('h2', ['Soporte ', h('span', { class: 'text-light' }, 'técnico')]),
              h('p', { class: 'big' }, 'Nos encargamos del mantenimiento de sistemas, redes y dispositivos para que todo funcione sin paradas.'),
              h('h2', ['Proyectos ', h('span', { class: 'text-light' }, 'digitales')]),
              h('p', { class: 'big' }, 'Creamos experiencias online que ayudan a gestionar mejor la comunicación y la imagen del centro.'),
            ]),
            h('div', { class: 'col-lg-5' }, [
              h('div', { class: 'app-service-list' }, services.map((service) => h('article', [
                h('div', { class: `icon novi-icon ${service.icon}` }),
                h('h3', service.title),
                h('p', service.text),
              ]))),
            ]),
          ]),
          h('div', { class: 'row row-40 align-items-center app-service-image' }, [
            h('div', { class: 'col-md-6' }, [h('img', { class: 'img-responsive', src: '/images/educonet-web-development.jpg', alt: 'Equipo revisando un portal escolar' })]),
            h('div', { class: 'col-md-6' }, [
              h('h3', 'Diseño y desarrollo pensados para centros'),
              h('p', 'Trabajamos con estructura clara, accesibilidad y gestión sencilla para que la web sea útil desde el primer día.'),
              h('a', { class: 'button button-primary', href: '/contacto', onClick: (e) => { e.preventDefault(); emit('navigate', '/contacto') } }, 'Solicitar presupuesto'),
            ]),
          ]),
        ]),
      ]),
    ])
  },
})

const PricingPage = defineComponent({
  emits: ['navigate'],
  setup(_, { emit }) {
    return () => h('div', [
      h(Breadcrumbs, { current: 'Tarifas', onNavigate: (path) => emit('navigate', path) }),
      h('section', { class: 'section section-lg bg-default app-animate' }, [
        h('div', { class: 'container' }, [
          h('div', { class: 'row row-30 align-items-end' }, [
            h('div', { class: 'col-lg-8' }, [
              h('h2', [h('span', { class: 'text-light' }, 'Tarifas'), ' para centros educativos']),
              h('p', { class: 'big' }, 'Publicamos importes orientativos para que el centro pueda valorar el alcance. El precio final se confirma tras revisar equipos, red, número de aulas y necesidades de soporte.'),
            ]),
            h('div', { class: 'col-lg-4 text-lg-right' }, [h('a', { class: 'button button-primary', href: '/registro-centros', onClick: (e) => { e.preventDefault(); emit('navigate', '/registro-centros') } }, 'Registrar centro')]),
          ]),
          h('div', { class: 'row row-30 pricing-grid' }, pricingPlans.map((plan) => h('div', { class: 'col-md-4' }, [
            h('article', { class: ['pricing-card', plan.featured && 'pricing-card-featured'] }, [
              h('h3', plan.name),
              h('p', { class: 'pricing-price' }, plan.price),
              h('p', plan.description),
              h('ul', { class: 'list-marked list-marked-primary' }, plan.features.map((feature) => h('li', feature))),
              h('a', { class: ['button', plan.featured ? 'button-primary' : 'button-secondary'], href: plan.path, onClick: (e) => { e.preventDefault(); emit('navigate', plan.path) } }, plan.cta),
            ]),
          ]))),
        ]),
      ]),
      h('section', { class: 'section bg-gray-100 section-md' }, [
        h('div', { class: 'container' }, [
          h('div', { class: 'row row-30' }, [
            ['Qué incluye', 'Gestión de incidencias, mantenimiento preventivo, documentación y recomendaciones claras para el equipo directivo o responsable TIC.'],
            ['Qué no incluye', 'Licencias, hardware, dominios, hosting o desplazamientos extraordinarios fuera del acuerdo, salvo que se presupuesten aparte.'],
            ['Acceso a tarifas completas', 'Los centros registrados reciben el desglose completo por servicio, bolsa de horas, desarrollo web y soporte puntual.'],
          ].map(([title, text]) => h('div', { class: 'col-md-4' }, [h('h5', title), h('p', text)]))),
        ]),
      ]),
    ])
  },
})

const LeadForm = defineComponent({
  props: { type: { type: String, required: true } },
  setup(props) {
    const values = reactive({
      name: '', surname: '', center: '', city: '', role: '', email: '', phone: '', students: '', interest: 'Tarifas completas', message: '', website: '', privacy: false,
    })
    const status = ref('')
    const sending = ref(false)

    async function submit() {
      if (values.website) return
      if (!values.email || !values.message || !values.privacy || (props.type === 'register' && (!values.center || !values.city || !values.name || !values.role)) || (props.type === 'contact' && (!values.name || !values.surname))) {
        status.value = 'Revisa los campos obligatorios antes de enviar.'
        return
      }

      sending.value = true
      status.value = ''

      try {
        await submitLead(props.type, values)
        status.value = 'Mensaje enviado correctamente.'
      } catch {
        status.value = 'Abrimos tu cliente de correo para completar el envío.'
        window.location.href = buildMailto(props.type, values)
      } finally {
        sending.value = false
      }
    }

    const input = (id, label, name, type = 'text', required = false) => h('div', { class: ['form-wrap', values[name] && 'has-value'] }, [
      h('input', { class: 'form-input', id, type, name, required, value: values[name], onInput: (e) => { values[name] = e.target.value } }),
      h('label', { class: 'form-label app-label', for: id }, label),
    ])

    return () => h('form', { class: 'rd-form app-form app-animate app-animate-delay-1', onSubmit: (e) => { e.preventDefault(); submit() } }, [
      h('div', { class: 'row row-10' }, props.type === 'register' ? [
        h('div', { class: 'col-md-6' }, [input('register-center', 'Nombre del centro', 'center', 'text', true)]),
        h('div', { class: 'col-md-6' }, [input('register-city', 'Ciudad', 'city', 'text', true)]),
        h('div', { class: 'col-md-6' }, [input('register-name', 'Persona de contacto', 'name', 'text', true)]),
        h('div', { class: 'col-md-6' }, [input('register-role', 'Cargo', 'role', 'text', true)]),
        h('div', { class: 'col-md-6' }, [input('register-email', 'Correo del centro', 'email', 'email', true)]),
        h('div', { class: 'col-md-6' }, [input('register-phone', 'Teléfono', 'phone', 'tel')]),
        h('div', { class: 'col-md-6' }, [input('register-students', 'Alumnos aproximados', 'students')]),
        h('div', { class: 'col-md-6' }, [h('div', { class: 'form-wrap' }, [h('select', { class: 'form-input', id: 'register-interest', value: values.interest, onChange: (e) => { values.interest = e.target.value } }, ['Tarifas completas', 'Mantenimiento TIC', 'Web o portal', 'Plan integral'].map((option) => h('option', { value: option }, option)))])]),
        h('div', { class: 'col-12' }, [h('div', { class: ['form-wrap', values.message && 'has-value'] }, [h('textarea', { class: 'form-input', id: 'register-message', required: true, value: values.message, onInput: (e) => { values.message = e.target.value } }), h('label', { class: 'form-label app-label', for: 'register-message' }, 'Necesidad principal')])]),
      ] : [
        h('div', { class: 'col-md-6' }, [input('contact-first-name', 'Nombre', 'name', 'text', true)]),
        h('div', { class: 'col-md-6' }, [input('contact-last-name', 'Apellidos', 'surname', 'text', true)]),
        h('div', { class: 'col-12' }, [h('div', { class: ['form-wrap', values.message && 'has-value'] }, [h('textarea', { class: 'form-input', id: 'contact-message', required: true, value: values.message, onInput: (e) => { values.message = e.target.value } }), h('label', { class: 'form-label app-label', for: 'contact-message' }, 'Mensaje')])]),
        h('div', { class: 'col-md-7 col-xl-8' }, [input('contact-email', 'Correo electrónico', 'email', 'email', true)]),
      ]),
      h('div', { class: 'col-12 d-none' }, [input(`${props.type}-website`, 'Web', 'website')]),
      h('div', { class: 'col-12' }, [
        h('label', { class: 'checkbox-inline privacy-check' }, [
          h('input', { type: 'checkbox', checked: values.privacy, onChange: (e) => { values.privacy = e.target.checked } }),
          props.type === 'register'
            ? ' Acepto la política de privacidad y el tratamiento de mis datos para gestionar el registro del centro.'
            : ' Acepto la política de privacidad y el tratamiento de mis datos para responder a esta consulta.',
        ]),
      ]),
      h('div', { class: 'col-md-5 col-xl-4' }, [h('button', { class: 'button button-size-1 button-block button-primary', type: 'submit', disabled: sending.value }, sending.value ? 'Enviando...' : props.type === 'register' ? 'Registrar centro' : 'Enviar')]),
      status.value && h('div', { class: 'col-12' }, [h('p', { class: 'app-form-status' }, status.value)]),
    ])
  },
})

const RegisterPage = defineComponent({
  setup() {
    return () => h('div', [
      h(Breadcrumbs, { current: 'Registro de centros', onNavigate: navigate }),
      h('section', { class: 'section section-lg bg-default app-animate' }, [
        h('div', { class: 'container' }, [
          h('div', { class: 'row row-40' }, [
            h('div', { class: 'col-lg-5' }, [
              h('h2', 'Registra tu centro'),
              h('p', { class: 'big' }, 'Déjanos los datos básicos del centro y te enviaremos acceso a las tarifas completas, recomendaciones iniciales y una propuesta de siguiente paso.'),
              h('figure', { class: 'figure-light contact-visual' }, [h('img', { class: 'img-responsive', src: '/images/educonet-team-school.jpg', alt: 'Equipo EduConet en una reunión con un centro educativo' })]),
            ]),
            h('div', { class: 'col-lg-7' }, [h(LeadForm, { type: 'register' })]),
          ]),
        ]),
      ]),
    ])
  },
})

const ContactPage = defineComponent({
  setup() {
    return () => h('div', [
      h(Breadcrumbs, { current: 'Contacto', onNavigate: navigate }),
      h('section', { class: 'section section-md app-animate' }, [
        h('div', { class: 'container' }, [
          h('h2', 'Contacto'),
          h('div', { class: 'row row-40' }, [
            h('div', { class: 'col-md-10 col-lg-6' }, [
              h('h5', 'Nuestra oficina'),
              h('div', { class: 'group-lg group-wrap-3' }, [
                h('div', { class: 'group-item' }, [
                  h('dl', { class: 'list-terms-2' }, [h('dt', 'Teléfono:'), h('dd', [h('a', { href: contact.phoneHref }, contact.phone)])]),
                  h('dl', { class: 'list-terms-2' }, [h('dt', 'Email:'), h('dd', [h('a', { class: 'd-inline-block font-weight-bold big link-underline', href: contact.emailHref }, contact.email)])]),
                ]),
                h('div', { class: 'group-item' }, [h('ul', { class: 'list list-0' }, [h('li', { class: 'text-secondary' }, [contact.address[0], h('br'), contact.address[1]]), h('li', contact.schedule)])]),
              ]),
              h('figure', { class: 'figure-light contact-visual' }, [h('img', { class: 'img-responsive', src: '/images/educonet-team-school.jpg', alt: 'Equipo EduConet revisando necesidades digitales en un centro educativo' })]),
            ]),
            h('div', { class: 'col-md-10 col-lg-6' }, [h('h5', 'Escríbenos'), h(LeadForm, { type: 'contact' })]),
          ]),
        ]),
      ]),
    ])
  },
})

const LegalPage = defineComponent({
  props: { title: { type: String, required: true } },
  setup(props) {
    return () => h('div', [
      h(Breadcrumbs, { current: props.title, onNavigate: navigate }),
      h('section', { class: 'section section-lg bg-default app-animate' }, [
        h('div', { class: 'container app-legal' }, [
          h('h2', props.title),
          h('p', 'EduConet informa de forma transparente sobre el uso de este sitio web, el tratamiento de datos de contacto y las condiciones básicas de navegación.'),
          h('h5', 'Responsable'),
          h('p', 'EduConet. Contacto: info@educonet.es. Dirección: Calle Edu, 10, 28001 Madrid, España.'),
          h('h5', 'Finalidad'),
          h('p', 'Los datos enviados mediante formularios se utilizan para responder solicitudes, registrar centros interesados y preparar propuestas comerciales relacionadas con servicios TIC educativos.'),
          h('h5', 'Conservación y derechos'),
          h('p', 'Los datos se conservarán durante el tiempo necesario para atender la solicitud. Puedes solicitar acceso, rectificación o supresión escribiendo a info@educonet.es.'),
        ]),
      ]),
    ])
  },
})

const NotFoundPage = defineComponent({
  emits: ['navigate'],
  setup(_, { emit }) {
    return () => h('section', { class: 'section section-lg bg-default app-animate' }, [
      h('div', { class: 'container' }, [
        h('h2', 'Página no encontrada'),
        h('p', { class: 'big' }, 'La página solicitada no existe o ha cambiado de ubicación.'),
        h('a', { class: 'button button-primary', href: '/', onClick: (e) => { e.preventDefault(); emit('navigate', '/') } }, 'Volver al inicio'),
      ]),
    ])
  },
})
</script>
