<template>
<form @submit.prevent="submitOrder">

  <!-- DATOS PERSONALES -->
  <div class="card mb-4 shadow-sm">

    <div class="card-header">
      <h4 class="mb-0">Datos personales</h4>
    </div>

    <div class="card-body">

      <div class="row">

        <div class="col-md-6 mb-3">
          <label class="form-label">Nombre</label>

          <input
            type="text"
            class="form-control"
            v-model="form.nombre"
            :class="{ 'is-invalid': errors.nombre }">

          <div class="invalid-feedback">
            {{ errors.nombre }}
          </div>
        </div>

        <div class="col-md-6 mb-3">
          <label class="form-label">Apellidos</label>

          <input
            type="text"
            class="form-control"
            v-model="form.apellidos"
            :class="{ 'is-invalid': errors.apellidos }">

          <div class="invalid-feedback">
            {{ errors.apellidos }}
          </div>
        </div>

      </div>

      <div class="row">

        <div class="col-md-6 mb-3">

          <label class="form-label">
            Correo electrónico
          </label>

          <input
            type="email"
            class="form-control"
            v-model="form.email"
            :class="{ 'is-invalid': errors.email }">

          <div class="invalid-feedback">
            {{ errors.email }}
          </div>

        </div>

        <div class="col-md-6 mb-3">

          <label class="form-label">
            Teléfono
          </label>

          <input
            type="tel"
            class="form-control"
            v-model="form.telefono"
            :class="{ 'is-invalid': errors.telefono }">

          <div class="invalid-feedback">
            {{ errors.telefono }}
          </div>

        </div>

      </div>

    </div>

  </div>

  <!-- DIRECCIÓN -->

  <div class="card mb-4 shadow-sm">

    <div class="card-header">
      <h4 class="mb-0">Dirección de envío</h4>
    </div>

    <div class="card-body">

      <div class="mb-3">

        <label class="form-label">
          Dirección
        </label>

        <input
          type="text"
          class="form-control"
          v-model="form.direccion"
          :class="{ 'is-invalid': errors.direccion }">

        <div class="invalid-feedback">
          {{ errors.direccion }}
        </div>

      </div>

      <div class="row">

        <div class="col-md-4 mb-3">

          <label class="form-label">
            Código Postal
          </label>

          <input
            type="text"
            class="form-control"
            v-model="form.codigoPostal"
            :class="{ 'is-invalid': errors.codigoPostal }">

          <div class="invalid-feedback">
            {{ errors.codigoPostal }}
          </div>

        </div>

        <div class="col-md-4 mb-3">

          <label class="form-label">
            Ciudad
          </label>

          <input
            type="text"
            class="form-control"
            v-model="form.ciudad"
            :class="{ 'is-invalid': errors.ciudad }">

          <div class="invalid-feedback">
            {{ errors.ciudad }}
          </div>

        </div>

        <div class="col-md-4 mb-3">

          <label class="form-label">
            Provincia
          </label>

          <input
            type="text"
            class="form-control"
            v-model="form.provincia"
            :class="{ 'is-invalid': errors.provincia }">

          <div class="invalid-feedback">
            {{ errors.provincia }}
          </div>

        </div>

      </div>

    </div>

  </div>

  <!-- ENVÍO -->

  <div class="card mb-4 shadow-sm">

    <div class="card-header">
      <h4 class="mb-0">Método de envío</h4>
    </div>

    <div class="card-body">

      <div class="form-check mb-2">

        <input
          class="form-check-input"
          type="radio"
          value="recogida"
          v-model="form.metodoEnvio">

        <label class="form-check-label">

          Recogida en tienda (Gratis)

        </label>

      </div>

      <div class="form-check mb-2">

        <input
          class="form-check-input"
          type="radio"
          value="estandar"
          v-model="form.metodoEnvio">

        <label class="form-check-label">

          Envío estándar (10 €)

        </label>

      </div>

      <div class="form-check">

        <input
          class="form-check-input"
          type="radio"
          value="urgente"
          v-model="form.metodoEnvio">

        <label class="form-check-label">

          Envío urgente (20 €)

        </label>

      </div>

    </div>

  </div>

  <!-- PAGO -->

  <div class="card mb-4 shadow-sm">

    <div class="card-header">
      <h4 class="mb-0">Método de pago</h4>
    </div>

    <div class="card-body">

      <div class="form-check mb-2">

        <input
          class="form-check-input"
          type="radio"
          value="tarjeta"
          v-model="form.metodoPago">

        <label class="form-check-label">

          Tarjeta de crédito o débito

        </label>

      </div>

      <div class="form-check mb-2">

        <input
          class="form-check-input"
          type="radio"
          value="paypal"
          v-model="form.metodoPago">

        <label class="form-check-label">

          PayPal

        </label>

      </div>

      <div class="form-check">

        <input
          class="form-check-input"
          type="radio"
          value="transferencia"
          v-model="form.metodoPago">

        <label class="form-check-label">

          Transferencia bancaria

        </label>

      </div>

    </div>

  </div>

  <!-- BOTÓN -->

  <div class="text-end">

    <button
      type="submit"
      class="btn btn-primary btn-lg"
      :disabled="loading">

      <span
        v-if="loading"
        class="spinner-border spinner-border-sm me-2">
      </span>

      {{ loading ? 'Procesando pedido...' : 'Realizar pedido' }}

    </button>

  </div>

</form>
</template>

<script setup>

import { ref, reactive, computed } from 'vue'

import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'

const router = useRouter()
const cart = useCartStore()

const loading = ref(false)

const form = reactive({
    nombre: '',
    apellidos: '',
    email: '',
    telefono: '',
    direccion: '',
    codigoPostal: '',
    ciudad: '',
    provincia: '',
    metodoEnvio: 'estandar',
    metodoPago: 'tarjeta'
})

const errors = reactive({
    nombre: '',
    apellidos: '',
    email: '',
    telefono: '',
    direccion: '',
    codigoPostal: '',
    ciudad: '',
    provincia: ''
})

function validateForm() {
return true    

    Object.keys(errors).forEach(key => { errors[key] = '' })
    let valid = true

    if (!form.nombre.trim()) {
        errors.nombre = 'Introduzca su nombre.'
        valid = false
    }
    if (!form.apellidos.trim()) {
        errors.apellidos = 'Introduzca sus apellidos.'
        valid = false
    }
    if (!form.email.trim()) {
        errors.email = 'Introduzca un correo electrónico.'
        valid = false
    }
    else if (!/\S+@\S+\.\S+/.test(form.email)) {
        errors.email = 'Correo electrónico no válido.'
        valid = false
    }
    if (!form.telefono.trim()) {
        errors.telefono = 'Introduzca un teléfono.'
        valid = false
    }
    if (!form.direccion.trim()) {
        errors.direccion = 'Introduzca una dirección.'
        valid = false
    }
    if (!form.codigoPostal.trim()) {
        errors.codigoPostal = 'Introduzca un código postal.'
        valid = false
    }
    if (!form.ciudad.trim()) {
        errors.ciudad = 'Introduzca una ciudad.'
        valid = false
    }
    if (!form.provincia.trim()) {
        errors.provincia = 'Introduzca una provincia.'
        valid = false
    }
    return valid
}

import { useOrderStore } from '../stores/order'

const orderStore = useOrderStore()

async function submitOrder() {
    if (!validateForm()) { return }
    loading.value = true
    await new Promise(resolve => setTimeout(resolve, 1500))
    loading.value = false
const order = {
    number: 'MER-' + Date.now(),
    date: new Date(),
    customer: { ...form },
    items: [...cart.items],
    subtotal: cart.totalPrice,
    shipping: shippingCost.value,
    total: total.value
}
orderStore.saveOrder(order)

    cart.clearCart()
    router.push('/pedido-realizado')
}

const shippingCost = computed(() => {
  switch (form.envio) {
    case 'recogida':
      return 0
    case 'urgente':
      return 20
    default:
      return 10
  }
})

const total = computed(() =>
  cart.totalPrice + shippingCost.value
)

function generarNumeroPedido() {

  const hoy = new Date()

  return `MER-${
    hoy.getFullYear()
  }${
    String(hoy.getMonth()+1).padStart(2,'0')
  }${
    String(hoy.getDate()).padStart(2,'0')
  }-${
    Math.floor(Math.random()*9000+1000)
  }`

}
</script>
