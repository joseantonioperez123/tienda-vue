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
        :nombre="producto.nombre"
        :descripcion="producto.descripcion"
        :precio="producto.precio"
        :imagen="producto.imagen"
        :ruta="'/producto/' + producto.id"
        :categoryId="producto.categoryId"
        :categoryName="currentCategory?.nombre"
      />

    </div>

  </div>

</div>

</template>

<script setup>

/*import { useCatalog } from '../composables/useCatalog'

const { products, categories, loading, loadCatalog, 
    getCategory, getCategoryName } = useCatalog()

onMounted(loadCatalog)
*/
import { useCatalogStore } from '../stores/catalog'
const catalog = useCatalogStore()
onMounted(() => {
  if ( catalog.products.length === 0 ) {
    catalog.loadCatalog()
  }
})

import { ref, computed, onMounted } from 'vue'

import { useRoute } from 'vue-router'

import ProductCard from '../components/products/ProductCard.vue'

////import { getAllProducts } from '../services/productService'

//import { getAllCategories } from '../services/categoryService'

const route = useRoute()

const categoryId = Number(route.params.id)

///const products = ref([])

//const categories = ref([])

/*onMounted(async () => {
  products.value = await getAllProducts()
  categories.value = await getAllCategories()
})*/

/*const currentCategory = computed(() => {
  return categories.value.find(
    c => c.id === categoryId
  )
})*/
/*const currentCategory = computed( () => {
    catalog.getCategoryName(Number(categoryId)) 
console.log('Nombre de categoria '+currentCategory)
})*/
const currentCategory = computed(() => {
  return catalog.categories.find( c => c.id === categoryId )
})
const filteredProducts = computed(() => {
  /*return catalog.products.value.filter(*/
  return catalog.products.filter(
    p => p.categoryId === categoryId
  )
})

</script>