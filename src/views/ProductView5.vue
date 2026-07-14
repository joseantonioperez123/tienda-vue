<template>

<LoadingSpinner
  v-if="loading"
/>

<div
  v-else-if="producto"
  class="container py-5"
>

  <Breadcrumb
    :items="breadcrumbItems"
  />

  <div class="row">

    <div class="col-md-6">

      <img
        :src="producto.imagen"
        class="img-fluid rounded"
      >

    </div>

    <div class="col-md-6">

      <h1>
        {{ producto.nombre }}
      </h1>

      <p class="lead">
        {{ producto.descripcion }}
      </p>

      <p class="display-6 text-primary">
        {{ producto.precio }} €
      </p>

    </div>

  </div>

</div>

<div
  v-else
  class="container py-5"
>

  <h2>
    Producto no encontrado
  </h2>

</div>

</template>


<script setup>

import { ref, onMounted } from 'vue'

import { useRoute } from 'vue-router'

import { computed } from 'vue'

import LoadingSpinner from '../components/common/LoadingSpinner.vue'

import { getProductById } from '../services/productService'

import Breadcrumb from '../components/common/Breadcrumb.vue'

const route = useRoute()

const producto = ref(null)

const loading = ref(true)

onMounted(async () => {

  producto.value =
    await getProductById(
      route.params.id
    )

  loading.value = false

})

const breadcrumbItems = computed(() => [

  {
    text:'Inicio',
    to:{ name:'home' }
  },
  {
    text:'Productos',
    to:{ name:'products'}
  },
  {
    text: producto.value?.nombre || 'Producto'
  }

])

</script>