<template>
<div
    class="modal fade"
    tabindex="-1"
    ref="modal">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content shadow">
            <div class="modal-header border-0">
                <img
                    src="@/assets/paypal/paypal.svg"
                    class="paypal-logo"
                    alt="PayPal">
                <button
                    class="btn-close"
                    @click="close">
                </button>
            </div>
            <div class="modal-body">
                <h4 class="text-center mb-4">
                    Iniciar sesión en PayPal
                </h4>
                <div class="mb-3">
                    <label class="form-label">
                        Correo electrónico
                    </label>
                    <input
                        v-model="email"
                        type="email"
                        class="form-control">
                </div>
                <div class="mb-4">
                    <label class="form-label">
                        Contraseña
                    </label>
                    <input
                        v-model="password"
                        type="password"
                        class="form-control">
                </div>
                <div class="alert alert-light text-center">
                    <strong>Total:</strong>
                    {{ total }} €
                </div>
                <button
                    class="btn btn-primary w-100"
                    :disabled="loading || !canPay"
                    @click="pay">
                    <span
                        v-if="loading"
                        class="spinner-border spinner-border-sm me-2">
                    </span>
                    {{ loading
                        ? 'Conectando con PayPal...'
                        : 'Pagar con PayPal'
                    }}
                </button>
                <div
                    v-if="success"
                    class="alert alert-success mt-4 text-center">
                    <div class="display-4">
                        ✅
                    </div>
                    Pago realizado correctamente
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script setup>

import { ref, computed } from 'vue'

import * as bootstrap from 'bootstrap'

const props = defineProps({
    total: Number
})

const emit = defineEmits([
    'paid'
])

const modal = ref()

let bsModal

const email = ref('')
const password = ref('')

const loading = ref(false)
const success = ref(false)

const canPay = computed(() => {
    return email.value.includes('@')
        && password.value.length >= 6
})

function open() {
    success.value = false
    loading.value = false
    email.value = ''
    password.value = ''
    if (!bsModal)
        bsModal = new bootstrap.Modal(modal.value)
    bsModal.show()
}

function close() {
    bsModal.hide()
}

async function pay() {
    loading.value = true
    await new Promise(resolve => setTimeout(resolve,1500))
    loading.value = false
    success.value = true
    setTimeout(() => {
        bsModal.hide()
        emit('paid')
    },1000)
}

defineExpose({
    open
})

</script>

<style scoped>

.paypal-logo{
    height:40px;
    display:block;
    margin:auto;
}

.modal-content{
    border-radius:18px;
}

.btn-primary{
    background:#0070ba;
    border:none;
}

.btn-primary:hover{
    background:#005ea6;
}

</style>