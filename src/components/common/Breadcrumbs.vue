<template>
  <section class="breadcrumbs-custom bg-image novi-background bg-primary">
    <div class="container">
      <ul class="breadcrumbs-custom-path">
        <li>
          <a href="/" @click.prevent="$emit('navigate', '/')">Inicio</a>
        </li>
        <li class="active">{{ current }}</li>
      </ul>
    </div>
  </section>
</template>

<script setup>
defineProps({
  current: {
    type: String,
    required: true,
  },
})

defineEmits(['navigate'])
</script>