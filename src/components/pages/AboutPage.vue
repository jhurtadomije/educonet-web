<template>
  <div>
    <Breadcrumbs current="Nosotros" @navigate="$emit('navigate', $event)" />

    <section class="section section-lg bg-default">
      <div class="container">
        <div class="row row-40 align-items-center">
          <div class="col-lg-6" v-reveal="{ animation: 'fade-right' }">
            <h2>
              Nuestra <span class="text-light">historia</span>
            </h2>

            <p class="big">
              EduConet nace para acompañar a los centros educativos en su transformación digital.
              Ofrecemos servicios de mantenimiento, desarrollo y diseño con un enfoque especializado
              en colegios, institutos y academias.
            </p>

            <div class="app-history-card">
              <h5>2020</h5>
              <p>
                Comenzamos apoyando a centros educativos con instalaciones de red y protección
                de equipos informáticos.
              </p>
              <img
                class="img-responsive"
                src="/images/educonet-team-school.jpg"
                alt="Equipo EduConet"
              >
            </div>
          </div>

          <div class="col-lg-5 offset-lg-1" v-reveal="{ animation: 'fade-left', delay: 180 }">
            <h5>2021</h5>
            <p>
              Ampliamos nuestros servicios con desarrollo de páginas web y plataformas internas
              para centros educativos.
            </p>

            <h5>2022</h5>
            <p>
              Incorporamos diseño gráfico y UX para transformar la comunicación digital de colegios
              e instituciones.
            </p>

            <h5>Hoy</h5>
            <p>
              Trabajamos junto a educadores y equipos de gestión para ofrecer soluciones tecnológicas
              prácticas y confiables.
            </p>

            <a
              class="button button-primary"
              href="/contacto"
              @click.prevent="$emit('navigate', '/contacto')"
            >
              Contáctanos
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import Breadcrumbs from '../common/Breadcrumbs.vue'

defineEmits(['navigate'])
</script>