<template>
  <section class="section section-lg bg-default">
    <div class="container" v-reveal="{ animation: 'fade-up' }">
      <h2>Página no encontrada</h2>
      <p class="big">
        La página solicitada no existe o ha cambiado de ubicación.
      </p>

      <a
        class="button button-primary"
        href="/"
        @click.prevent="$emit('navigate', '/')"
      >
        Volver al inicio
      </a>
    </div>
  </section>
</template>

<script setup>
defineEmits(['navigate'])
</script>