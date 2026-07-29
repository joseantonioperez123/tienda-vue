<template>
<div
    class="modal fade"
    tabindex="-1"
    ref="modal">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content shadow">
            <div class="modal-header">
                <h4 class="mb-0">
                    Transferencia bancaria
                </h4>
                <button
                    class="btn-close"
                    @click="close">
                </button>
            </div>
            <div class="modal-body">
                <div class="alert alert-info">
                    El pedido quedará registrado y comenzará a prepararse
                    cuando recibamos la transferencia.
                </div>
                <table class="table">
                    <tbody>
                        <tr>
                            <th>Beneficiario</th>
                            <td>Merino Muebles S.L.</td>
                        </tr>
                        <tr>
                            <th>IBAN</th>
                            <td>
                                ES14 2100 1234 5678 9012 3456
                            </td>
                        </tr>
                        <tr>
                            <th>BIC</th>
                            <td>CAIXESBBXXX</td>
                        </tr>
                        <tr>
                            <th>Concepto</th>
                            <td>{{ orderNumber }}</td>
                        </tr>
                        <tr>
                            <th>Importe</th>
                            <td>{{ total }} €</td>
                        </tr>
                    </tbody>
                </table>
                <div class="form-check my-4">
                    <input
                        id="confirmTransfer"
                        class="form-check-input"
                        type="checkbox"
                        v-model="confirmed">
                    <label
                        class="form-check-label"
                        for="confirmTransfer">
                        Confirmo que realizaré esta transferencia.
                    </label>
                </div>
                <button
                    class="btn btn-success w-100"
                    :disabled="!confirmed"
                    @click="finish">
                    He realizado la transferencia
                </button>
            </div>
        </div>
    </div>
</div>

</template>

<script setup>

import { ref } from 'vue'
import * as bootstrap from 'bootstrap'

const props = defineProps({
    total: Number,
    orderNumber: String
})

const emit = defineEmits([
    'paid'
])

const modal = ref()

let bsModal

const confirmed = ref(false)

function open() {
    confirmed.value = false
    if (!bsModal)
        bsModal = new bootstrap.Modal(modal.value)

    bsModal.show()
}

function close() {
    bsModal.hide()
}

function finish() {
    bsModal.hide()
    emit('paid')
}

defineExpose({
    open
})

</script>