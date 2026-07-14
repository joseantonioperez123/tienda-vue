<template>

<section class="container py-5">

  <h2 class="text-center mb-5">
    Productos destacados
  </h2>

  <LoadingSpinner
    v-if="catalog.loading"
  />

  <div
    v-else
    class="row g-4"
  >
<!--<ProductCard
  v-for="product in featuredProducts"
  :key="product.id"
  :product="product"
/>-->
    <div
      class="col-md-4"
      v-for="producto in featuredProducts"
      :key="producto.id"
    >
      <ProductCard
        :product="producto"
        v-if="!catalog.loading"
      />

      <!--<ProductCard
        :nombre="producto.nombre"
        :descripcion="producto.descripcion"
        :imagen="producto.imagen"
        :precio="producto.precio"
        :ruta="'/producto/' + producto.id"
        :categoriaID="producto.categoryId"
        :categoryName="catalog.getCategoryName(producto.categoryId)"
        v-if="!catalog.loading"
      />  -->  <!-- v-if="!loading" -->

    </div>

  </div>

</section>

</template>


<script setup>

import { computed } from 'vue'

import { useCatalogStore } from '../../stores/catalog'
const catalog = useCatalogStore()

/*const featuredProducts = computed(() =>
  catalog.products.slice(0,2)
)*/
const featuredProducts = computed(() =>
  catalog.featuredProducts
)

import ProductCard from '../products/ProductCard.vue'

import LoadingSpinner from '../common/LoadingSpinner.vue'
//import { getCategoryName } from '@/services/categoryService'

</script>