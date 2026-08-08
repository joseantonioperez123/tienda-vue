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
      <!--<div class="d-grid my-4">
          <button
              class="btn btn-primary btn-lg"
              @click="addToCart">
              🛒 Añadir al carrito
          </button>
      </div>-->
      <!--<div class="d-grid my-4">
          <button
              class="btn btn-success btn-lg shadow-sm"
              @click="addToCart">
              <i class="bi bi-cart-plus me-2"></i>
              Añadir al carrito
          </button>
      </div>-->
      <div class="d-grid my-4">
          <button
              class="btn btn-lg shadow-sm"
              :class="added ? 'btn-success' : 'btn-primary'"
              @click="addToCart">
              <template v-if="!added">
                  <i class="bi bi-cart-plus me-2"></i>
                  Añadir al carrito
              </template>
              <template v-else>
                  <i class="bi bi-check-circle-fill me-2"></i>
                  Añadido al carrito
              </template>
          </button>
      </div>
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

import { ref, computed } from 'vue'

import LoadingSpinner from '../components/common/LoadingSpinner.vue'

import Breadcrumb from '../components/common/Breadcrumb.vue'

import { useCartStore } from '@/stores/cart'
//import analyticsService from '@/services/analytics/analyticsService'
import analyticsService from '../services/analytics/analyticsService'

import { useFlyingProductStore } from '@/stores/flyingProduct'

const flying = useFlyingProductStore()

const route = useRoute()

console.log(route.params.id)
console.log(catalog.products)

const cart = useCartStore()

const added = ref(false)

/*function addToCart() {
    cart.addProduct(producto.value)
    analyticsService.addToCart(producto.value)
}*/

async function addToCart() {

    flying.fly(producto.value, event)
    
    cart.addProduct(producto.value)
    analyticsService.addToCart(producto.value)
    added.value = true
    setTimeout(() => {
        added.value = false
    }, 1500)
}

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

<style>

.btn{
    transition: all .25s ease;
}

</style>