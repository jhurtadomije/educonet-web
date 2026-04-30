<template>
  <div>
    <Breadcrumbs current="Contacto" @navigate="$emit('navigate', $event)" />

    <section class="section section-md">
      <div class="container">
        <h2 v-reveal="{ animation: 'fade-up' }">Contacto</h2>

        <div class="row row-40">
          <div class="col-md-10 col-lg-6" v-reveal="{ animation: 'fade-right' }">
            <h5>Nuestra oficina</h5>

            <div class="group-lg group-wrap-3">
              <div class="group-item">
                <dl class="list-terms-2">
                  <dt>Teléfono:</dt>
                  <dd>
                    <a :href="contact.phoneHref">{{ contact.phone }}</a>
                  </dd>
                </dl>

                <dl class="list-terms-2">
                  <dt>Email:</dt>
                  <dd>
                    <a
                      class="d-inline-block font-weight-bold big link-underline"
                      :href="contact.emailHref"
                    >
                      {{ contact.email }}
                    </a>
                  </dd>
                </dl>
              </div>

              <div class="group-item">
                <ul class="list list-0">
                  <li class="text-secondary">
                    {{ contact.address[0] }}
                    <br>
                    {{ contact.address[1] }}
                  </li>
                  <li>{{ contact.schedule }}</li>
                </ul>
              </div>
            </div>

            <figure class="figure-light contact-visual">
              <img
                class="img-responsive"
                src="/images/educonet-team-school.jpg"
                alt="Equipo EduConet revisando necesidades digitales en un centro educativo"
              >
            </figure>
          </div>

          <div class="col-md-10 col-lg-6">
            <h5 v-reveal="{ animation: 'fade-left' }">Escríbenos</h5>
            <LeadForm type="contact" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import Breadcrumbs from '../common/Breadcrumbs.vue'
import LeadForm from '../common/LeadForm.vue'
import { contact } from '../../data/site'

defineEmits(['navigate'])
</script>