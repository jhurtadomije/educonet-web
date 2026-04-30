<template>
  <div>
    <Breadcrumbs :current="title" @navigate="$emit('navigate', $event)" />

    <section class="section section-lg bg-default">
      <div class="container app-legal" v-reveal="{ animation: 'fade-up' }">
        <h2>{{ title }}</h2>

        <p>
          EduConet informa de forma transparente sobre el uso de este sitio web,
          el tratamiento de datos de contacto y las condiciones básicas de navegación.
        </p>

        <h5>Responsable</h5>
        <p>
          EduConet. Contacto: info@educonet.es. Dirección: Calle Edu, 10, 28001 Madrid, España.
        </p>

        <h5>Finalidad</h5>
        <p>
          Los datos enviados mediante formularios se utilizan para responder solicitudes,
          registrar centros interesados y preparar propuestas comerciales relacionadas con
          servicios TIC educativos.
        </p>

        <h5>Conservación y derechos</h5>
        <p>
          Los datos se conservarán durante el tiempo necesario para atender la solicitud.
          Puedes solicitar acceso, rectificación o supresión escribiendo a info@educonet.es.
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
import Breadcrumbs from '../common/Breadcrumbs.vue'

defineProps({
  title: {
    type: String,
    required: true,
  },
})

defineEmits(['navigate'])
</script>