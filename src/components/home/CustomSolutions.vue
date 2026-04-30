<template>
  <section class="section bg-gray-100 box-image-left app-split">
    <div
      class="box-image-item box-image-video novi-background bg-image"
      style="background-image: url('/images/educonet-team-school.jpg')"
    ></div>

    <div class="container">
      <div class="row">
        <div class="col-md-6" v-reveal="{ animation: 'fade-right' }">
          <h2 class="title-icon title-icon-2">
            <span class="icon icon-default mercury-icon-touch"></span>
            <span>
              Soluciones
              <br>
              <span class="text-light">a medida</span>
            </span>
          </h2>

          <p class="big">
            Trabajamos con centros educativos y empresas del sector para ofrecer soluciones
            digitales que simplifican el día a día del profesorado, las familias y la administración escolar.
          </p>

          <div class="group-sm group-wrap-2">
            <a class="button button-primary" href="/nosotros" @click.prevent="$emit('navigate', '/nosotros')">
              Conócenos
            </a>

            <a
              class="button button-icon button-icon-right button-secondary"
              href="/contacto"
              @click.prevent="$emit('navigate', '/contacto')"
            >
              <span>Contáctanos</span>
              <span class="icon fa fa-envelope"></span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineEmits(['navigate'])
</script>