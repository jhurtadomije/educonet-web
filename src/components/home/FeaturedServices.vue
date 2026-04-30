<template>
  <section class="section section-sm section-sm-bottom-100 bg-primary">
    <div class="container">
      <div class="row row-30">
        <div
          v-for="(service, index) in services"
          :key="service.title"
          class="col-md-4"
          v-reveal="{ animation: 'fade-up', delay: index * 140 }"
        >
          <article class="box-icon-2">
            <div :class="`icon novi-icon ${service.icon}`"></div>
            <h5 class="title">{{ service.title }}</h5>
            <p class="text">{{ service.text }}</p>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { services } from '../../data/site'
</script>