<template>
  <div>
    <Breadcrumbs current="Registro de centros" @navigate="$emit('navigate', $event)" />

    <section class="section section-lg bg-default">
      <div class="container">
        <div class="row row-40">
          <div class="col-lg-5" v-reveal="{ animation: 'fade-right' }">
            <h2>Registra tu centro</h2>
            <p class="big">
              Déjanos los datos básicos del centro y te enviaremos acceso a las tarifas completas,
              recomendaciones iniciales y una propuesta de siguiente paso.
            </p>

            <figure class="figure-light contact-visual">
              <img
                class="img-responsive"
                src="/images/educonet-team-school.jpg"
                alt="Equipo EduConet en una reunión con un centro educativo"
              >
            </figure>
          </div>

          <div class="col-lg-7">
            <LeadForm type="register" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import Breadcrumbs from '../common/Breadcrumbs.vue'
import LeadForm from '../common/LeadForm.vue'

defineEmits(['navigate'])
</script>