<template>
  <div class="page">
    <SiteHeader :route="route" @navigate="navigate" />

    <main>
      <HomePage v-if="page === 'home'" @navigate="navigate" />
      <AboutPage v-else-if="page === 'about'" @navigate="navigate" />
      <ServicesPage v-else-if="page === 'services'" @navigate="navigate" />
      <PricingPage v-else-if="page === 'pricing'" @navigate="navigate" />
      <RegisterPage v-else-if="page === 'register'" @navigate="navigate" />
      <ContactPage v-else-if="page === 'contact'" @navigate="navigate" />
      <LegalPage
        v-else-if="page === 'privacy'"
        title="Política de privacidad"
        @navigate="navigate"
      />
      <LegalPage
        v-else-if="page === 'legal'"
        title="Aviso legal"
        @navigate="navigate"
      />
      <NotFoundPage v-else @navigate="navigate" />
    </main>

    <SiteFooter @navigate="navigate" />
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

import SiteHeader from './components/layout/SiteHeader.vue'
import SiteFooter from './components/layout/SiteFooter.vue'

import HomePage from './components/home/HomePage.vue'
import AboutPage from './components/pages/AboutPage.vue'
import ServicesPage from './components/pages/ServicesPage.vue'
import PricingPage from './components/pages/PricingPage.vue'
import RegisterPage from './components/pages/RegisterPage.vue'
import ContactPage from './components/pages/ContactPage.vue'
import LegalPage from './components/pages/LegalPage.vue'
import NotFoundPage from './components/pages/NotFoundPage.vue'

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

  if (route.value !== next) {
    route.value = next
    history.pushState({}, '', next)
  }

  window.scrollTo({ top: 0, behavior: 'smooth' })
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
</script>