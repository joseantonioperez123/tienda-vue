<template>

<section class="container py-5">

  <h2 class="text-center mb-5">
    Productos destacados
  </h2>

  <div class="row g-4">

    <div
      class="col-md-4"
      v-for="producto in products"
      :key="producto.id"
    >

      <ProductCard
        :nombre="producto.nombre"
        :descripcion="producto.descripcion"
        :imagen="producto.imagen"
        :precio="producto.precio"
        :ruta="'/producto/' + producto.id"
      />

    </div>

  </div>

</section>

</template>

<script setup>

import ProductCard from '../products/ProductCard.vue'

import { getAllProducts } from '../../services/productService'

const products = getAllProducts()

</script>