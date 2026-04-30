<template>
  <section class="section bg-default section-md">
    <div class="container">
      <div class="row row-40 align-items-center">
        <div class="col-lg-6" v-reveal="{ animation: 'fade-right' }">
          <h2 class="title-icon">
            <span class="icon icon-default mercury-icon-target-2"></span>
            <span>
              Nuestra <span class="text-light">misión</span>
            </span>
          </h2>

          <p class="big">
            Acompañamos a centros educativos en su transformación digital con servicios de mantenimiento IT,
            desarrollo web/app y diseño pensado para el entorno escolar.
          </p>

          <ul class="list-marked list-marked-primary">
            <li>Respuesta clara ante incidencias TIC</li>
            <li>Webs y portales útiles para familias</li>
            <li>Diseño digital enfocado en educación</li>
          </ul>

          <a class="button button-primary" href="/servicios" @click.prevent="$emit('navigate', '/servicios')">
            Nuestros servicios
          </a>
        </div>

        <div class="col-lg-6">
          <div class="row row-30">
            <div
              v-for="(counter, index) in counters"
              :key="counter.label"
              class="col-6"
              v-reveal="{ animation: 'zoom-in', delay: index * 120 }"
            >
              <article class="box-counter">
                <div class="box-counter-main">
                  <div class="counter">{{ counter.number }}</div>
                </div>
                <p class="box-counter-title">{{ counter.label }}</p>
              </article>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
defineEmits(['navigate'])

const counters = [
  { number: '12', label: 'Centros apoyados' },
  { number: '38', label: 'Proyectos completados' },
  { number: '420', label: 'Equipos gestionados' },
  { number: '98%', label: 'Satisfacción' },
]
</script>