<template>
  <footer class="section footer-classic">
    <div class="footer-inner-1">
      <div class="container">
        <div class="row row-40">
          <div class="col-md-5 col-lg-3">
            <h5>Contacto</h5>

            <ul class="contact-list font-weight-bold">
              <li>
                <div class="unit unit-spacing-xs">
                  <div class="unit-left">
                    <div class="icon icon-sm icon-primary novi-icon mdi mdi-map-marker"></div>
                  </div>
                  <div class="unit-body">
                    <span>
                      {{ contact.address[0] }}
                      <br>
                      {{ contact.address[1] }}
                    </span>
                  </div>
                </div>
              </li>

              <li>
                <div class="unit unit-spacing-xs">
                  <div class="unit-left">
                    <div class="icon icon-sm icon-primary novi-icon mdi mdi-phone"></div>
                  </div>
                  <div class="unit-body">
                    <a :href="contact.phoneHref">{{ contact.phone }}</a>
                  </div>
                </div>
              </li>

              <li>
                <div class="unit unit-spacing-xs">
                  <div class="unit-left">
                    <div class="icon icon-sm icon-primary novi-icon mdi mdi-clock"></div>
                  </div>
                  <div class="unit-body">
                    <ul class="list-0">
                      <li>{{ contact.schedule }}</li>
                      <li>Sáb-Dom: Cerrado</li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>

            <a class="d-inline-block big" :href="contact.emailHref">
              {{ contact.email }}
            </a>
          </div>

          <div class="col-md-6 col-lg-5">
            <h5>Enlaces</h5>

            <div class="row row-5 justify-content-between">
              <div class="col-sm-6">
                <ul class="footer-list big">
                  <li v-for="item in navItems" :key="item.path">
                    <a :href="item.path" @click.prevent="go(item.path)">
                      {{ item.label }}
                    </a>
                  </li>
                </ul>
              </div>

              <div class="col-sm-4 col-lg-6 col-xxl-5">
                <ul class="footer-list big">
                  <li v-for="(label, index) in footerServices" :key="label">
                    <a :href="footerPath(index)" @click.prevent="go(footerPath(index))">
                      {{ label }}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="col-md-12 col-lg-4">
            <h5>Especialidades</h5>
            <ul class="footer-list big">
              <li>Redes y Wi-Fi escolar</li>
              <li>Webs y portales para familias</li>
              <li>Soporte TIC continuo</li>
              <li>Diseño UX/UI educativo</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-inner-2">
      <div class="container">
        <p class="rights">
          © {{ year }} EduConet. Todos los derechos reservados.
          <a href="/privacidad" @click.prevent="go('/privacidad')">Privacidad</a>
          ·
          <a href="/aviso-legal" @click.prevent="go('/aviso-legal')">Aviso legal</a>
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { contact, footerServices, navItems } from '../../data/site'

const emit = defineEmits(['navigate'])

const year = new Date().getFullYear()

function go(path) {
  emit('navigate', path)
}

function footerPath(index) {
  if (index < 3) return '/servicios'
  if (index === 3) return '/tarifas'
  return '/registro-centros'
}
</script>