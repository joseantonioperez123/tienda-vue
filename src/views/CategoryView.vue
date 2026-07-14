<template>

<div class="container py-5">

  <h1 class="mb-4">Categoría:
    {{ currentCategory?.nombre }}
  </h1>

  <div class="row g-4">

    <div
      class="col-md-4"
      v-for="producto in filteredProducts"
      :key="producto.id"
    >
      <ProductCard
        :product="producto"
      />
      <!--<ProductCard
        :nombre="producto.nombre"
        :descripcion="producto.descripcion"
        :precio="producto.precio"
        :imagen="producto.imagen"
        :ruta="'/producto/' + producto.id"
        :categoryId="producto.categoryId"
        :categoryName="currentCategory?.nombre"
      />-->

    </div>

  </div>

</div>

</template>

<script setup>

import { useCatalogStore } from '../stores/catalog'
const catalog = useCatalogStore()
/*onMounted(() => {
  if ( catalog.products.length === 0 ) {
    catalog.loadCatalog()
  }
})*/

import { computed } from 'vue'

import { useRoute } from 'vue-router'

import ProductCard from '../components/products/ProductCard.vue'

const route = useRoute()

const categoryId = Number(route.params.id)

/*const currentCategory = computed(() => {
  return categories.value.find(
    c => c.id === categoryId
  )
})*/
/*const currentCategory = computed( () => {
    catalog.getCategoryName(Number(categoryId)) 
console.log('Nombre de categoria '+currentCategory)
})*/
/*const currentCategory = computed(() => {
  return catalog.categories.find( c => c.id === categoryId )
})*/

/*const currentCategory = computed(() =>
  catalog.getCategory( Number(route.params.id) )
)

const filteredProducts = computed(() =>
  catalog.products.filter( p => p.categoryId === Number(route.params.id))
)*/

const currentCategory = computed(() =>
  catalog.getCategory(categoryId)
)

const filteredProducts = computed(() =>
  catalog.getProductsByCategory(categoryId)
)
</script>