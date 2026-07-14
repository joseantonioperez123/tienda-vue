<template>

<div class="card mb-3">
  <div class="row g-0">
    <div class="col-4">
      <img
        :src="item.product.imagen"
        class="img-fluid rounded-start"
        :alt="item.product.nombre" >
    </div>
    <div class="col-8">
      <div class="card-body py-2">
        <h6 class="card-title">
          {{ item.product.nombre }}
        </h6>
        <p class="mb-1">
          {{ item.product.precio }} €
        </p>
        <p class="text-muted mb-2">
          Subtotal: {{ item.product.precio * item.quantity }} €
        </p>
<!--        <span class="badge bg-secondary">
          Cantidad: {{ item.quantity }}
        </span> -->
        <div class="d-flex align-items-center mt-3">
            <button
                class="btn btn-outline-secondary btn-sm"
                @click="cart.decrement(item.product.id)" >
                −
            </button>
            <span class="mx-3 fw-bold">
                {{ item.quantity }}
            </span>
            <button
                class="btn btn-outline-secondary btn-sm"
                @click="cart.increment(item.product.id)" >
                +
            </button>
            <button
                class="btn btn-outline-danger btn-sm ms-auto"
                @click="cart.removeProduct(item.product.id)" >
                🗑
            </button>
        </div>
      </div>
    </div>
  </div>
</div>

</template>

<script setup>

defineProps({
  item: {
    type: Object,
    required: true
  }
})

import { useCartStore } from '../../stores/cart'

const cart = useCartStore()

</script>