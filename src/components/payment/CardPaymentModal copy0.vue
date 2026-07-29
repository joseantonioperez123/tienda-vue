<template>
  <div
    class="modal fade"
    tabindex="-1"
    ref="modal"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            💳 Pago con tarjeta
          </h5>
          <button
            type="button"
            class="btn-close"
            @click="cancel"
          />
        </div>
        <div class="text-end mb-3">
    <i class="bi bi-credit-card fs-3 me-2"></i>
    <span class="badge bg-primary me-1">
        VISA
    </span>
    <span class="badge bg-danger me-1">
        Mastercard
    </span>
    <span class="badge bg-dark">
        AmEx
    </span>
</div>
        <div class="modal-body">
          <div class="mb-3">
            <label class="form-label">
              Número de tarjeta
            </label>
            <!--<input
              v-model="card.number"
              class="form-control"
              placeholder="4242 4242 4242 4242"
            >-->
            <input :value="card.number" @input="formatCardNumber"
    class="form-control" placeholder="4242 4242 4242 4242"
    maxlength="19">
          </div>
          <div class="mb-3">
            <label class="form-label">
              Titular
            </label>
            <input
              v-model="card.name"
              class="form-control"
            >
          </div>
          <div class="row">
            <div class="col-6">
              <label class="form-label">
                Caducidad
              </label>
              <!--<input
                v-model="card.expiry"
                class="form-control"
                placeholder="MM/AA"
              >-->
              <input
    :value="card.expiry"
    @input="formatExpiry"
    class="form-control"
    placeholder="MM/AA"
    maxlength="5">
            </div>
            <div class="col-6">
              <label class="form-label">
                CVV
              </label>
              <!--<input
                v-model="card.cvv"
                class="form-control"
                placeholder="123"
              >-->
              <input
    :value="card.cvv"
    @input="formatCVV"
    class="form-control"
    placeholder="123"
    maxlength="4">
            </div>
          </div>
          <hr>
          <div class="d-flex justify-content-between">
            <strong>Total</strong>
            <strong>
              {{ total }} €
            </strong>
          </div>
        </div>
        <div
    v-if="error"
    class="alert alert-danger mt-3 mb-0">
    {{ error }}
</div>
    <!-- Éxito -->
    <div v-if="success"
        class="alert alert-success text-center mt-3">
        <div class="display-4">
            ✅
        </div>
        Pago autorizado
    </div>

        <div class="modal-footer">
          <button
            class="btn btn-secondary"
            @click="cancel" :disabled="processing"
          >
            Cancelar
          </button>
          <button
            class="btn btn-primary"
            @click="pay" :disabled="processing || !canPay"
          >
            <!--Pagar-->
            <span v-if="processing"
                class="spinner-border spinner-border-sm me-2">
            </span>
                {{ processing ? 'Procesando...' : 'Pagar' }}
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="small text-muted mt-4">
    <strong>Modo demostración</strong>
    <br>
    4242 4242 4242 4242 → Pago correcto
    <br>
    4000 0000 0000 0002 → Tarjeta rechazada
</div>
</template>

<script setup>

import { ref, reactive, onMounted } from 'vue'
import * as bootstrap from 'bootstrap'

const props = defineProps({
  total: Number
})

const emit = defineEmits([
  'paid',
  'cancel'
])

const modal = ref()

let bsModal

const processing = ref(false)
const error = ref('')
const success = ref(false)

import { computed } from 'vue'

/*const canPay = computed(() => {
    return ( card.number.trim() && card.name.trim() &&
        card.expiry.trim() && card.cvv.trim() )
})*/

const canPay = computed(() => {
    return ( card.number.replace(/\s/g,'').length === 16 &&
        card.name.trim().length > 3 &&
        /^\d{2}\/\d{2}$/.test(card.expiry) &&
        /^\d{3,4}$/.test(card.cvv) )
})

const card = reactive({
  number: '',
  name: '',
  expiry: '',
  cvv: ''
})

onMounted(() => {
  bsModal = new bootstrap.Modal(modal.value)
})

/*function open() {
  bsModal.show()
}*/

function open() {
    error.value = ''
    processing.value = false
    bsModal.show()
}

function close() {
  bsModal.hide()
}

function cancel() {
  close()
  emit('cancel')
}

/*function pay() {
  close()
  emit('paid', {
    number: card.number
  })
}*/

/*async function pay() {
    success.value = true

await new Promise(r => setTimeout(r,800))
close()
success.value = false
emit('paid')*/

/*    error.value = ''
    processing.value = true
    await new Promise(resolve => setTimeout(resolve, 2000))
    processing.value = false
    const number = card.number.replace(/\s/g, '')
    if (number === '4000000000000002') {
        error.value = 'La tarjeta ha sido rechazada.'
        return
    }
    close()
    emit('paid')*/
//}

async function pay() {
    error.value = ''
    success.value = false
    processing.value = true
    await new Promise(resolve => setTimeout(resolve, 2000))
    processing.value = false
    const number = card.number.replace(/\s/g, '')
    if (number === '4000000000000002') {
        error.value = 'La tarjeta ha sido rechazada.'
        return
    }
    success.value = true
    await new Promise(resolve => setTimeout(resolve, 800))
    close()
    success.value = false
    emit('paid')
}

defineExpose({
  open,
  close
})

function formatCardNumber(event) {
  let value = event.target.value.replace(/\D/g, '')
  value = value.substring(0, 16)
  value = value.replace(/(.{4})/g, '$1 ').trim()
  card.number = value
}

function formatExpiry(event) {
    let value = event.target.value.replace(/\D/g, '')
    value = value.substring(0,4)
    if(value.length >=3){
        value =
            value.substring(0,2)
            + '/'
            + value.substring(2)

    }
    card.expiry = value
}

function formatCVV(event){
    card.cvv =
        event.target.value
            .replace(/\D/g,'')
            .substring(0,4)
}

</script>