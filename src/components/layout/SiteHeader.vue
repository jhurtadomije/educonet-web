<template>
  <header class="section page-header rd-navbar-transparent-wrap app-header">
    <div class="rd-navbar-wrap">
      <nav class="rd-navbar rd-navbar-transparent app-navbar" :class="{ 'is-open': open }">
        <div class="rd-navbar-aside-outer rd-navbar-collapse">
          <div class="rd-navbar-aside">
            <div class="rd-navbar-info">
              <div class="icon novi-icon mdi mdi-phone"></div>
              <a :href="contact.phoneHref">{{ contact.phone }}</a>
            </div>

            <ul class="list-lined">
              <li>
                <a href="/registro-centros" @click.prevent="go('/registro-centros')">
                  Acceso centros
                </a>
              </li>
              <li>
                <a href="/tarifas" @click.prevent="go('/tarifas')">
                  Tarifas
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="rd-navbar-main-outer">
          <div class="rd-navbar-main-inner">
            <div class="rd-navbar-main">
              <div class="rd-navbar-panel">
                <button
                  class="rd-navbar-toggle app-nav-toggle"
                  type="button"
                  aria-label="Abrir navegación"
                  @click="open = !open"
                >
                  <span></span>
                </button>

                <div class="rd-navbar-brand">
                  <a class="brand" href="/" @click.prevent="go('/')">
                    <img
                      class="brand-logo-light"
                      src="/images/educonet-logo.png"
                      alt="EduConet logo"
                      width="200"
                      height="133"
                    >
                  </a>
                </div>
              </div>

              <div class="rd-navbar-main-element">
                <div class="rd-navbar-nav-wrap">
                  <ul class="rd-navbar-nav">
                    <li
                      v-for="item in navItems"
                      :key="item.path"
                      class="rd-nav-item"
                      :class="{ active: route === item.path }"
                    >
                      <a
                        class="rd-nav-link"
                        :href="item.path"
                        @click.prevent="go(item.path)"
                      >
                        {{ item.label }}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { contact, navItems } from '../../data/site'

defineProps({
  route: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['navigate'])

const open = ref(false)

function go(path) {
  open.value = false
  emit('navigate', path)
}
</script>