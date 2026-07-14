<template>

<button
    class="btn btn-outline-light position-relative"
    data-bs-toggle="offcanvas"
    data-bs-target="#cartOffcanvas"
>

    🛒

    <span
        v-if="cart.totalItems>0"
        class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
    >

        {{ cart.totalItems }}

    </span>

</button>

</template>

<script setup>

import { useCartStore } from '../../stores/cart'

const cart = useCartStore()

</script>