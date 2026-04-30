<template>
  <div>
    <Breadcrumbs current="Tarifas" @navigate="$emit('navigate', $event)" />

    <section class="section section-lg bg-default">
      <div class="container">
        <div class="row row-30 align-items-end">
          <div class="col-lg-8" v-reveal="{ animation: 'fade-right' }">
            <h2>
              <span class="text-light">Tarifas</span> para centros educativos
            </h2>
            <p class="big">
              Publicamos importes orientativos para que el centro pueda valorar el alcance.
              El precio final se confirma tras revisar equipos, red, número de aulas y necesidades
              de soporte.
            </p>
          </div>

          <div class="col-lg-4 text-lg-right" v-reveal="{ animation: 'fade-left', delay: 160 }">
            <a
              class="button button-primary"
              href="/registro-centros"
              @click.prevent="$emit('navigate', '/registro-centros')"
            >
              Registrar centro
            </a>
          </div>
        </div>

        <div class="row row-30 pricing-grid">
          <div
            v-for="(plan, index) in pricingPlans"
            :key="plan.name"
            class="col-md-4"
            v-reveal="{ animation: 'fade-up', delay: index * 140 }"
          >
            <article class="pricing-card" :class="{ 'pricing-card-featured': plan.featured }">
              <h3>{{ plan.name }}</h3>
              <p class="pricing-price">{{ plan.price }}</p>
              <p>{{ plan.description }}</p>

              <ul class="list-marked list-marked-primary">
                <li v-for="feature in plan.features" :key="feature">
                  {{ feature }}
                </li>
              </ul>

              <a
                class="button"
                :class="plan.featured ? 'button-primary' : 'button-secondary'"
                :href="plan.path"
                @click.prevent="$emit('navigate', plan.path)"
              >
                {{ plan.cta }}
              </a>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section class="section bg-gray-100 section-md">
      <div class="container">
        <div class="row row-30">
          <div
            v-for="(item, index) in infoBlocks"
            :key="item.title"
            class="col-md-4"
            v-reveal="{ animation: 'fade-up', delay: index * 120 }"
          >
            <h5>{{ item.title }}</h5>
            <p>{{ item.text }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import Breadcrumbs from '../common/Breadcrumbs.vue'
import { pricingPlans } from '../../data/site'

defineEmits(['navigate'])

const infoBlocks = [
  {
    title: 'Qué incluye',
    text: 'Gestión de incidencias, mantenimiento preventivo, documentación y recomendaciones claras para el equipo directivo o responsable TIC.',
  },
  {
    title: 'Qué no incluye',
    text: 'Licencias, hardware, dominios, hosting o desplazamientos extraordinarios fuera del acuerdo, salvo que se presupuesten aparte.',
  },
  {
    title: 'Acceso a tarifas completas',
    text: 'Los centros registrados reciben el desglose completo por servicio, bolsa de horas, desarrollo web y soporte puntual.',
  },
]


</script>