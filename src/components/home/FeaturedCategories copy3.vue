<template>

<section class="container py-5">

  <h2 class="text-center mb-5">
    Nuestras secciones
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
      v-for="category in categories"
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

import { ref, onMounted } from 'vue'

import CategoryCard from '../categories/CategoryCard.vue'

import { getAllCategories } from '../../services/categoryService'

const categories = ref([])

const loading = ref(true)

onMounted(async () => {

  categories.value =
    await getAllCategories()

  loading.value = false

})

</script>