<template>

<button
    ref="cartButton"
    class="btn btn-outline-light position-relative"
    @click="cart.toggleCart()"
>
    <span class="cart-icon" :class="{ bounce: cart.bounceCart }">
        🛒
    </span>

    <span
        v-if="cart.totalItems > 0"
        class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
    >
        {{ cart.totalItems }}
    </span>
</button>

</template>

<script setup>

import { ref, onMounted, onBeforeUnmount } from 'vue'

import { useCartStore } from '../../stores/cart'
import { useFlyingProductStore } from '../../stores/flyingProduct'

const cart = useCartStore()

const cartButton = ref(null)

const flyingProduct = useFlyingProductStore()

function updateCartPosition() {
    if (cartButton.value) {
        flyingProduct.setCartPosition(cartButton.value)
    }
}

onMounted(() => {
    updateCartPosition()
    window.addEventListener('resize', updateCartPosition)
    window.addEventListener('scroll', updateCartPosition)
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', updateCartPosition)
    window.removeEventListener('scroll', updateCartPosition)
})
</script>

<style>

.cart-icon {
    display: inline-block;
}

@keyframes cartBounce {
    0%   { transform: scale(1); }
    30%  { transform: scale(1.5); }
    60%  { transform: scale(.9); }
    100% { transform: scale(1); }
}

.bounce {
    animation: cartBounce .6s ease;
}

</style>