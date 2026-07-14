<template>
<div class="container py-5">
  <div class="row mb-4">
    <div class="col-md-6">
<!--      <select v-model="selectedCategory" class="form-select"> -->
      <select v-model.number="selectedCategory" class="form-select">
        <option :value="null">Todas las categorías</option>
        <option v-for="category in categories" :key="category.id"
          :value="category.id">
          {{ category.nombre }}
        </option>
      </select>
    </div>
    <div class="col-md-6">
      <select v-model="sortBy" class="form-select">
        <option value="">Ordenar por...</option>
        <option value="priceAsc">Precio: menor a mayor</option>
        <option value="priceDesc">Precio: mayor a menor</option>
        <option value="nameAsc">Nombre A-Z</option>
        <option value="nameDesc">Nombre Z-A</option>
      </select>
    </div>
  </div>

  <h1 class="mb-4">
    Catálogo de productos
  </h1>

  <LoadingSpinner v-if="loading"/>
  <SearchBar v-model="searchTerm"/>

  <div v-if="filteredProducts.length === 0" class="alert alert-warning">
    No se encontraron productos.
  </div>
  <p v-else class="text-muted">
    {{ filteredProducts.length }} productos encontrados
  </p>

  <div class="row g-4">

    <div
      v-for="producto in filteredProducts"
      :key="producto.id"
      class="col-md-4"
    >
<!-- cuando tengamos categoryID 
      <ProductCard
        :nombre="producto.nombre"
        :descripcion="producto.descripcion"
        :precio="producto.precio"
        :imagen="producto.imagen"
        :ruta="'/producto/' + producto.id"
      />
      -->
      <!--<ProductCard
        :nombre="producto.nombre"
        :descripcion="producto.descripcion"
        :precio="producto.precio"
        :imagen="producto.imagen"
        :ruta="'/producto/' + producto.id"
        :categoriaID="producto.categoryId"
          v-if="!loading"
      />-->
      <ProductCard
        :nombre="producto.nombre"
        :descripcion="producto.descripcion"
        :imagen="producto.imagen"
        :precio="producto.precio"
        :ruta="'/producto/' + producto.id"
        :category-id="producto.categoryId"
        :category-name="getCategoryName(producto.categoryId)"
        v-if="!loading"
      />
    </div>

  </div>

</div>

</template>

<script setup>

import { ref, computed, onMounted } from 'vue'

import ProductCard from '../components/products/ProductCard.vue'

import SearchBar from '../components/products/SearchBar.vue'

import { getAllProducts } from '../services/productService'

import LoadingSpinner from '@/components/common/LoadingSpinner.vue'

import { getAllCategories } from '../services/categoryService'

const products = ref([])

const searchTerm = ref('')

const loading = ref(true)

const categories = ref([])

const selectedCategory = ref(null)

const sortBy = ref('')

onMounted(async () => {
  categories.value = await getAllCategories()
  products.value = await getAllProducts()

  loading.value=false
})


/*const filteredProducts = computed(() => {

  return products.value.filter(product =>

    product.nombre
      .toLowerCase()
      .includes(
        searchTerm.value.toLowerCase()
      )

  )

})*/

/*const filteredProducts = computed( () => {
  return products.value.filter(product =>
    product.nombre
      .toLowerCase()
      .includes( searchTerm.value.toLowerCase() )
    ||
    product.descripcion
      .toLowerCase()
      .includes( searchTerm.value.toLowerCase() )
  )
})*/

const filteredProducts = computed(() => {
  let result = [...products.value]
  // búsqueda
  result = result.filter(product =>
    product.nombre
      .toLowerCase()
      .includes(searchTerm.value.toLowerCase())
  )
  // categoría
  if (selectedCategory.value) {
    result = result.filter(product =>
      product.categoryId === selectedCategory.value
    )
  }
  // ordenación
  switch(sortBy.value) {
    case 'priceAsc':
      result.sort(
        (a,b) => a.precio - b.precio
      )
      break
    case 'priceDesc':
      result.sort(
        (a,b) => b.precio - a.precio
      )
      break
    case 'nameAsc':
      result.sort(
        (a,b) =>
          a.nombre.localeCompare(b.nombre)
      )
      break
    case 'nameDesc':
      result.sort(
        (a,b) =>
          b.nombre.localeCompare(a.nombre)
      )
      break
  }
  return result
})

</script>