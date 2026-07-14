<template>

<footer class="cart-footer">

    <div class="d-flex justify-content-between mb-3">

        <strong>Total</strong>

        <strong>{{ cart.totalPrice.toFixed(2) }} €</strong>

    </div>

    <button
        v-if="cart.items.length"
        class="btn btn-outline-danger w-100 mb-2"
        @click="cart.clearCart()"
    >
        Vaciar carrito
    </button>

    <button
        v-if="cart.items.length"
        class="btn btn-primary w-100"
        @click="$emit('checkout')"
    >
        Finalizar pedido
    </button>

</footer>

</template>

<script setup>
import { useCartStore } from '../../stores/cart'

const cart = useCartStore()

defineEmits(['checkout'])
</script>