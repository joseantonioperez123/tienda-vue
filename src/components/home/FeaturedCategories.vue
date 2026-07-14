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
      v-for="category in featuredCategories"
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

import { computed } from 'vue'

import { useCatalogStore } from '../../stores/catalog'
const catalog = useCatalogStore()

const featuredCategories = computed(() => catalog.categories )

import LoadingSpinner from '@/components/common/LoadingSpinner.vue'

import CategoryCard from '../categories/CategoryCard.vue'

</script>