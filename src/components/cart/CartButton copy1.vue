<template>

<button class="btn btn-outline-light position-relative"
                            @click="cart.toggleCart()">
    <span class="cart-icon" :class="{ bounce: cart.bounceCart }">
        🛒
    </span>
    <!--<i class="bi bi-cart3"
        :class="{ bounce: cart.bounceCart }">
    </i>-->
    <span
        v-if="cart.totalItems > 0"
        class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
    >
        {{ cart.totalItems }}
    </span>
</button>


</template>

<script setup>

import { useCartStore } from '../../stores/cart'

const cart = useCartStore()
//console.log(cart)
//console.log(Object.keys(cart))
</script>

<style>

.cart-icon{
    display:inline-block;
}

@keyframes cartBounce {
    0%   { transform: scale(1); }
    30%  { transform: scale(1.5); }
    60%  { transform: scale(.9); }
    100% { transform: scale(1); }
}

.bounce{
    animation: cartBounce .6s ease;
}

</style>