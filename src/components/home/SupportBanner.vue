<template>
  <section
    class="section app-parallax context-dark"
    style="background-image: url('/images/educonet-hero-classroom.jpg')"
  >
    <div class="container text-center" v-reveal="{ animation: 'fade-up' }">
      <h2>
        Soporte TIC
        <span class="text-light">para el curso completo</span>
      </h2>

      <div class="heading-5 font-weight-normal">
        Revisamos equipos, red, seguridad y canales digitales para que el centro pueda trabajar sin interrupciones.
      </div>

      <div class="button-wrap-default">
        <a class="button button-primary" href="/contacto" @click.prevent="$emit('navigate', '/contacto')">
          Solicitar diagnóstico
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
defineEmits(['navigate'])
</script>