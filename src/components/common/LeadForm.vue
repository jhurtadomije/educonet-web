<template>
  <form class="rd-form app-form" @submit.prevent="submit" v-reveal="{ animation: 'fade-up' }">
    <div class="row row-10">
      <template v-if="type === 'register'">
        <div class="col-md-6">
          <FormInput
            id="register-center"
            v-model="values.center"
            label="Nombre del centro"
            required
          />
        </div>

        <div class="col-md-6">
          <FormInput
            id="register-city"
            v-model="values.city"
            label="Ciudad"
            required
          />
        </div>

        <div class="col-md-6">
          <FormInput
            id="register-name"
            v-model="values.name"
            label="Persona de contacto"
            required
          />
        </div>

        <div class="col-md-6">
          <FormInput
            id="register-role"
            v-model="values.role"
            label="Cargo"
            required
          />
        </div>

        <div class="col-md-6">
          <FormInput
            id="register-email"
            v-model="values.email"
            label="Correo del centro"
            type="email"
            required
          />
        </div>

        <div class="col-md-6">
          <FormInput
            id="register-phone"
            v-model="values.phone"
            label="Teléfono"
            type="tel"
          />
        </div>

        <div class="col-md-6">
          <FormInput
            id="register-students"
            v-model="values.students"
            label="Alumnos aproximados"
          />
        </div>

        <div class="col-md-6">
          <div class="form-wrap">
            <select id="register-interest" v-model="values.interest" class="form-input">
              <option>Tarifas completas</option>
              <option>Mantenimiento TIC</option>
              <option>Web o portal</option>
              <option>Plan integral</option>
            </select>
          </div>
        </div>

        <div class="col-12">
          <FormTextarea
            id="register-message"
            v-model="values.message"
            label="Necesidad principal"
            required
          />
        </div>
      </template>

      <template v-else>
        <div class="col-md-6">
          <FormInput
            id="contact-first-name"
            v-model="values.name"
            label="Nombre"
            required
          />
        </div>

        <div class="col-md-6">
          <FormInput
            id="contact-last-name"
            v-model="values.surname"
            label="Apellidos"
            required
          />
        </div>

        <div class="col-12">
          <FormTextarea
            id="contact-message"
            v-model="values.message"
            label="Mensaje"
            required
          />
        </div>

        <div class="col-md-7 col-xl-8">
          <FormInput
            id="contact-email"
            v-model="values.email"
            label="Correo electrónico"
            type="email"
            required
          />
        </div>
      </template>

      <div class="col-12 d-none">
        <FormInput
          :id="`${type}-website`"
          v-model="values.website"
          label="Web"
        />
      </div>

      <div class="col-12">
        <label class="checkbox-inline privacy-check">
          <input v-model="values.privacy" type="checkbox">
          <span>
            {{ privacyText }}
          </span>
        </label>
      </div>

      <div class="col-md-5 col-xl-4">
        <button
          class="button button-size-1 button-block button-primary"
          type="submit"
          :disabled="sending"
        >
          {{ sending ? 'Enviando...' : submitText }}
        </button>
      </div>

      <div v-if="status" class="col-12">
        <p class="app-form-status">{{ status }}</p>
      </div>
    </div>
  </form>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { buildMailto, submitLead } from '../../services/forms'

const props = defineProps({
  type: {
    type: String,
    required: true,
    validator: value => ['register', 'contact'].includes(value),
  },
})

const values = reactive({
  name: '',
  surname: '',
  center: '',
  city: '',
  role: '',
  email: '',
  phone: '',
  students: '',
  interest: 'Tarifas completas',
  message: '',
  website: '',
  privacy: false,
})

const status = ref('')
const sending = ref(false)

const submitText = computed(() => props.type === 'register' ? 'Registrar centro' : 'Enviar')

const privacyText = computed(() => {
  if (props.type === 'register') {
    return 'Acepto la política de privacidad y el tratamiento de mis datos para gestionar el registro del centro.'
  }

  return 'Acepto la política de privacidad y el tratamiento de mis datos para responder a esta consulta.'
})

function isInvalid() {
  if (values.website) return true
  if (!values.email || !values.message || !values.privacy) return true

  if (props.type === 'register') {
    return !values.center || !values.city || !values.name || !values.role
  }

  return !values.name || !values.surname
}

async function submit() {
  if (isInvalid()) {
    status.value = 'Revisa los campos obligatorios antes de enviar.'
    return
  }

  sending.value = true
  status.value = ''

  try {
    await submitLead(props.type, values)
    status.value = 'Mensaje enviado correctamente.'
  } catch {
    status.value = 'Abrimos tu cliente de correo para completar el envío.'
    window.location.href = buildMailto(props.type, values)
  } finally {
    sending.value = false
  }
}
</script>

<script>
export default {
  components: {
    FormInput: {
      props: {
        id: { type: String, required: true },
        modelValue: { type: String, default: '' },
        label: { type: String, required: true },
        type: { type: String, default: 'text' },
        required: { type: Boolean, default: false },
      },
      emits: ['update:modelValue'],
      template: `
        <div class="form-wrap" :class="{ 'has-value': modelValue }">
          <input
            class="form-input"
            :id="id"
            :type="type"
            :required="required"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
          >
          <label class="form-label app-label" :for="id">{{ label }}</label>
        </div>
      `,
    },

    FormTextarea: {
      props: {
        id: { type: String, required: true },
        modelValue: { type: String, default: '' },
        label: { type: String, required: true },
        required: { type: Boolean, default: false },
      },
      emits: ['update:modelValue'],
      template: `
        <div class="form-wrap" :class="{ 'has-value': modelValue }">
          <textarea
            class="form-input"
            :id="id"
            :required="required"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
          ></textarea>
          <label class="form-label app-label" :for="id">{{ label }}</label>
        </div>
      `,
    },
  },
}
</script>