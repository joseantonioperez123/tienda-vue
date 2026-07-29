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
            <!--💳--><div class="chip"></div> Pago con tarjeta
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
            <!--<div class="credit-card mb-4">-->
            <div
    class="credit-card mb-4"
    :class="cardClass"
>
    <!--<div class="brand">
        MERINO HOME
    </div>-->
    <div class="d-flex justify-content-between align-items-center mb-4">
    <div class="brand">
        MERINO HOME
    </div>
    <div class="brand-logo">
        <img
    :src="cardBrandLogo"
    class="card-brand-logo"
    :alt="cardBrand">
        {{ cardBrand }}
    </div>
</div>
    <div class="chip">
        💳
    </div>
    <div class="number">
        {{ displayNumber }}
    </div>
    <div class="bottom">
        <div>
            <small>TITULAR</small>
            <div>
                {{ displayName }}
            </div>
        </div>
        <div>
            <small>CAD.</small>
            <div>
                {{ displayExpiry }}
            </div>
        </div>
    </div>
</div>
          <div class="mb-3">
            <label class="form-label">
              Número de tarjeta
            </label>
            <input :value="card.number" @input="formatCardNumber"
    class="form-control" placeholder="4242 4242 4242 4242"
    maxlength="19" :class="{
        'is-valid': card.number && cardNumberValid,
        'is-invalid': card.number && !cardNumberValid
    }">
          </div>
          <div class="mb-3">
            <label class="form-label">
              Titular
            </label>
            <input
              v-model="card.name"
              class="form-control" :class="{
        'is-valid': card.name && cardNameValid,
        'is-invalid': card.name && !cardNameValid
    }">
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
    maxlength="5" :class="{
        'is-valid': card.expiry && cardExpiryValid,
        'is-invalid': card.expiry && !cardExpiryValid
    }">
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
    maxlength="4" :class="{
        'is-valid': card.cvv && cardCvvValid,
        'is-invalid': card.cvv && !cardCvvValid
    }">>
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
<div
    v-if="processing"
    class="mt-3">

    <div class="progress">

        <div
            class="progress-bar progress-bar-striped progress-bar-animated"
            style="width:100%">
        </div>

    </div>

    <div class="text-center mt-2">

        Autorizando pago...

    </div>

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

import visaLogo from '@/assets/cards/visa.svg'
import mastercardLogo from '@/assets/cards/mastercard.svg'
import amexLogo from '@/assets/cards/americanexpress.svg'
import genericLogo from '@/assets/cards/generic.svg'

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

const displayNumber = computed(() =>
    card.number || '•••• •••• •••• ••••'
)

const displayName = computed(() =>
    card.name
        ? card.name.toUpperCase()
        : 'NOMBRE APELLIDOS'
)

const displayExpiry = computed(() =>
    card.expiry || 'MM/AA'
)

const cardNumberValid = computed(() =>
    card.number.replace(/\s/g,'').length === 16
)

const cardNameValid = computed(() =>
    card.name.trim().length > 3
)

const cardExpiryValid = computed(() =>
    /^\d{2}\/\d{2}$/.test(card.expiry)
)

const cardCvvValid = computed(() =>
    /^\d{3,4}$/.test(card.cvv)
)

const cardBrand = computed(() => {
    const number = card.number.replace(/\s/g, '')
    if (number.startsWith('4')) { return 'VISA' }
    /*if ( number.startsWith('5') || /^2[2-7]/.test(number) ) {
        return 'MASTERCARD'
    }*/
    if (/^(5[1-5]|2[2-7])/.test(number)) {
    return 'MASTERCARD'
}
    if ( number.startsWith('34') || number.startsWith('37') ) {
        return 'AMEX'
    }
    return 'TARJETA'
})

const cardBrandLogo = computed(() => {
    switch (cardBrand.value) {
        case 'VISA':
            return visaLogo
        case 'MASTERCARD':
            return mastercardLogo
        case 'AMEX':
            return amexLogo
        default:
            return genericLogo
    }
})

const cardClass = computed(() => {
    switch (cardBrand.value) {
        case 'VISA':
            return 'visa-card'
        case 'MASTERCARD':
            return 'mastercard-card'
        case 'AMEX':
            return 'amex-card'
        default:
            return 'generic-card'
    }
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

<style scoped>

/*.credit-card{
    background: linear-gradient(
        135deg,
        #0d6efd,
        #0b3d91
    );
    color:white;
    border-radius:16px;
    padding:24px;
    box-shadow:0 8px 25px rgba(0,0,0,.25);
}*/

.brand{
    font-size:1.1rem;
    font-weight:bold;
    margin-bottom:25px;
}

.chip{
    font-size:2rem;
    margin-bottom:20px;
}

.chip{
    width:52px;
    height:38px;
    border-radius:8px;
    background:
        linear-gradient(
            135deg,
            #f6d365,
            #fda085
        );
    margin-bottom:24px;
}

/*.number{
    font-size:1.35rem;
    letter-spacing:3px;
    margin-bottom:30px;
    font-family:monospace;
}*/

.number{
    font-size:1.45rem;
    letter-spacing:4px;
    font-family:monospace;
    transition:.2s;
}

.bottom{
    display:flex;
    justify-content:space-between;
    align-items:flex-end;
}

.bottom small{
    opacity:.8;
    font-size:.7rem;
}

.brand-logo{
    font-size:1.1rem;
    font-weight:bold;
    letter-spacing:1px;
    opacity:.9;
}

.card-brand-logo{
    height:32px;
    width:auto;
    object-fit:contain;
}
/*.card-brand-logo{
    max-width:100%;
    max-height:100%;
    object-fit:contain;
}*/

/*.card-brand-logo{
    height:36px;
    transition:.3s;
    filter:drop-shadow(0 2px 6px rgba(0,0,0,.25));
}*/

/*.card-brand-logo{
    transition:
        transform .3s,
        opacity .3s;
    transform:scale(1.15);
}*/

.card-brand{
    width:70px;
    height:40px;
    display:flex;
    align-items:center;
    justify-content:center;
}


.credit-card{
    color:white;
    border-radius:18px;
    padding:24px;
    min-height:220px;
    transition:all .35s ease;
    box-shadow:0 15px 35px rgba(0,0,0,.25);
}

.credit-card{
    position:relative;
    overflow:hidden;
}

.credit-card::before{
    content:"";
    position:absolute;
    top:-30%;
    left:-20%;
    width:180%;
    height:60%;
    background:
        rgba(255,255,255,.12);
    transform:rotate(-20deg);
}

.generic-card{
    background: linear-gradient(135deg,#3d3d3d,#111);
}

.visa-card{
    background: linear-gradient(135deg,#0057b8,#1f8fff);
}

.mastercard-card{
    background: linear-gradient(135deg,#d62828,#7f0000);
}

.amex-card{
    background: linear-gradient(135deg,#0d8f72,#1bc5a3);
}

input.is-valid{
    border-color:#28a745;
}

input.is-invalid{
    border-color:#dc3545;
}

</style>