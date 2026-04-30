<template>
  <section
    class="section app-hero context-dark"
    :style="{ backgroundImage: `url(${slide.image})` }"
  >
    <div class="container">
      <div class="app-hero-content">
        <h1 :key="`title-${active}`">
          <span class="d-block app-hero-title-line">{{ slide.title[0] }}</span>
          <span class="d-block text-light app-hero-title-line">{{ slide.title[1] }}</span>
        </h1>

        <p :key="`text-${active}`" class="lead">
          {{ slide.text }}
        </p>

        <a
          :key="`button-${active}`"
          class="button button-secondary-text"
          :href="slide.path"
          @click.prevent="$emit('navigate', slide.path)"
        >
          {{ slide.cta }}
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onBeforeUnmount, ref } from 'vue'
import { heroSlides } from '../../data/site'

defineEmits(['navigate'])

const active = ref(0)

const slide = computed(() => heroSlides[active.value])

const timer = setInterval(() => {
  active.value = (active.value + 1) % heroSlides.length
}, 5000)

onBeforeUnmount(() => {
  clearInterval(timer)
})
</script>