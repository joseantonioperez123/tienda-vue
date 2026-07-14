<template>

<section class="container py-5">

  <h2 class="text-center mb-5">
    Productos destacados
  </h2>

  <LoadingSpinner
    v-if="loading"
  />

  <div
    v-else
    class="row g-4"
  >

    <div
      class="col-md-4"
      v-for="producto in products"
      :key="producto.id"
    >

<!--  <ProductCard
        :nombre="producto.nombre"
        :descripcion="producto.descripcion"
        :imagen="producto.imagen"
        :precio="producto.precio"
        :ruta="'/producto/' + producto.id"
      />
      cuanto tengamos categoriaID -->
      <ProductCard
        :nombre="producto.nombre"
        :descripcion="producto.descripcion"
        :imagen="producto.imagen"
        :precio="producto.precio"
        :ruta="'/producto/' + producto.id"
        :categoriaID="producto.categoryId"
        :categoryName="sdf"
        v-if="!loading"
      />    <!-- v-if="!loading" -->

    </div>

  </div>

</section>

</template>


<script setup>

import { ref, onMounted } from 'vue'

import ProductCard from '../products/ProductCard.vue'

import LoadingSpinner from '../common/LoadingSpinner.vue'

import { getAllProducts } from '../../services/productService'

const products = ref([])

const loading = ref(true)

onMounted(async () => {
  products.value =
    await getAllProducts()
  loading.value = false
})

</script>