<template>
<div class="container py-5">
    <div class="card shadow text-center mx-auto" style="max-width:700px">
        <div class="card-body">
            <div class="display-1 text-success mb-3">
                ✅
            </div>
            <h1 class="mb-3">
                ¡Pedido realizado!
            </h1>
            <p class="lead">
                Gracias por confiar en Merino Muebles.
            </p>
            <hr>
            <div class="text-start">
                <p>
                    <strong>Número de pedido:</strong>
                    {{ orderNumber }}
                </p>
                <p>
                    <strong>Fecha:</strong>
                    {{ today }}
                </p>
                <p>
                    <strong>Total:</strong>
                    {{ total }} €
                </p>
            </div>
            <router-link
                to="/productos"
                class="btn btn-primary mt-4">
                Seguir comprando
            </router-link>
        </div>
    </div>
</div>
</template>

<script setup>

import { computed } from 'vue'

const orderNumber =
    'MER-' + Date.now()

const today =
    new Date().toLocaleString()

const total =
    0

</script>