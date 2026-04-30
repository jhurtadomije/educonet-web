<template>
  <div>
    <Breadcrumbs current="Servicios" @navigate="$emit('navigate', $event)" />

    <section class="section section-lg bg-default">
      <div class="container">
        <div class="row row-40">
          <div class="col-lg-7" v-reveal="{ animation: 'fade-right' }">
            <h2>
              Soluciones <span class="text-light">a medida</span>
            </h2>
            <p class="big">
              Adaptamos cada proyecto a las necesidades reales de tu centro, desde la web hasta
              el soporte de aula.
            </p>

            <h2>
              Soporte <span class="text-light">técnico</span>
            </h2>
            <p class="big">
              Nos encargamos del mantenimiento de sistemas, redes y dispositivos para que todo
              funcione sin paradas.
            </p>

            <h2>
              Proyectos <span class="text-light">digitales</span>
            </h2>
            <p class="big">
              Creamos experiencias online que ayudan a gestionar mejor la comunicación y la imagen
              del centro.
            </p>
          </div>

          <div class="col-lg-5" v-reveal="{ animation: 'fade-left', delay: 160 }">
            <div class="app-service-list">
              <article v-for="service in services" :key="service.title">
                <div :class="`icon novi-icon ${service.icon}`"></div>
                <h3>{{ service.title }}</h3>
                <p>{{ service.text }}</p>
              </article>
            </div>
          </div>
        </div>

        <div class="row row-40 align-items-center app-service-image">
          <div class="col-md-6" v-reveal="{ animation: 'zoom-in' }">
            <img
              class="img-responsive"
              src="/images/educonet-web-development.jpg"
              alt="Equipo revisando un portal escolar"
            >
          </div>

          <div class="col-md-6" v-reveal="{ animation: 'fade-left', delay: 160 }">
            <h3>Diseño y desarrollo pensados para centros</h3>
            <p>
              Trabajamos con estructura clara, accesibilidad y gestión sencilla para que la web
              sea útil desde el primer día.
            </p>

            <a
              class="button button-primary"
              href="/contacto"
              @click.prevent="$emit('navigate', '/contacto')"
            >
              Solicitar presupuesto
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import Breadcrumbs from '../common/Breadcrumbs.vue'
import { services } from '../../data/site'

defineEmits(['navigate'])
</script>