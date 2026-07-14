<template>

<div
    v-if="confirm.visible"
    class="modal-backdrop-custom"
>
    <div class="confirm-dialog">
        <h5>
            {{ confirm.title }}
        </h5>
        <p>
            {{ confirm.message }}
        </p>
        <div class="d-flex justify-content-end gap-2">
            <button
                class="btn btn-secondary"
                @click="confirm.cancel()"
            >
                Cancelar
            </button>
            <button
                class="btn btn-danger"
                @click="confirm.accept()"
            >
                Eliminar
            </button>
        </div>
    </div>
</div>

</template>

<script setup>

import { useConfirmStore } from '../../stores/confirm'

const confirm = useConfirmStore()

</script>

<style scoped>

.modal-backdrop-custom{
    position:fixed;
    inset:0;
    background:rgba(0,0,0,.45);
    display:flex;
    justify-content:center;
    align-items:center;
    z-index:3000;
}

.confirm-dialog{
    width:420px;
    max-width:90%;
    background:white;
    border-radius:12px;
    padding:24px;
    box-shadow:0 15px 40px rgba(0,0,0,.2);
}

</style>