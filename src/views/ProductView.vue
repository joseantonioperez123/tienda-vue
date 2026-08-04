<template>

<LoadingSpinner
  v-if="catalog.loading"
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

import { useCatalogStore } from '../stores/catalog'

const catalog = useCatalogStore()

import { useRoute } from 'vue-router'

import { computed } from 'vue'

import LoadingSpinner from '../components/common/LoadingSpinner.vue'

import Breadcrumb from '../components/common/Breadcrumb.vue'

import analyticsService from '../services/analytics/analyticsService'

const route = useRoute()

console.log(route.params.id)
console.log(catalog.products)

/*const producto = computed(() =>
  catalog.getProduct(Number(route.params.id))
)*/

const producto = computed(() =>
  catalog.getProduct(route.params.id)
)

const breadcrumbItems = computed(() => [
  { text:'Inicio', to:{ name:'home' } },
  { text:'Productos', to:{ name:'products'} },
  { text: producto.value?.nombre || 'Producto' }
])

console.log({
    producto: producto.value.nombre,
    categoria: catalog.getCategoryName(producto.value.categoryId),
    precio: producto.value.precio
})

import { watch } from 'vue'

watch(
    producto,
    (nuevoProducto) => {
        if (!nuevoProducto) return
        /*analyticsService.viewProduct(
            nuevoProducto,
            catalog.getCategoryName(nuevoProducto.categoryId)
        )*/
        analyticsService.viewProduct(producto.value)
    },
    { immediate: true }
)

/*analyticsService.viewProduct(
    producto.value,
    catalog.getCategoryName(producto.value.categoryId)
)*/

</script>