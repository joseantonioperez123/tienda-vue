<template>

<section class="container py-5">

  <h2 class="text-center mb-5">
    Nuestras secciones
  </h2>

  <LoadingSpinner
    v-if="catalog.loading"
  />

  <div
    v-else
    class="row g-4"
  >

    <div
      class="col-md-4"
      v-for="category in catalog.categories"
      :key="category.id"
    >

      <CategoryCard
        :titulo="category.nombre"
        :descripcion="category.descripcion"
        :imagen="category.imagen"
        :ruta="'/categoria/' + category.id"
      />

    </div>

  </div>

</section>

</template>


<script setup>

import { onMounted } from 'vue'

import { useCatalogStore } from '../../stores/catalog'
const catalog = useCatalogStore()
onMounted(() => {
  if ( catalog.products.length === 0 ) {
    catalog.loadCatalog()
  }
})
//import { useCatalog } from '../../composables/useCatalog'

//const { categories, loading, loadCatalog } = useCatalog()

//onMounted(loadCatalog)

import LoadingSpinner from '@/components/common/LoadingSpinner.vue'

//import { ref, onMounted } from 'vue'

import CategoryCard from '../categories/CategoryCard.vue'

//import { getAllCategories } from '../../services/categoryService'

</script>