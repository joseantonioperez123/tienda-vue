import { ref } from 'vue'

import { getAllProducts } from '../services/productService'

import { getAllCategories } from '../services/categoryService'

export function useCatalog() {
  const products = ref([])
  const categories = ref([])
  const loading = ref(false)

  async function loadCatalog() {
    loading.value = true
    products.value = await getAllProducts()
    categories.value = await getAllCategories()
    loading.value = false
  }

  function getCategoryName(id) {
    const category = categories.value.find( c => c.id === id )
    return category ? category.nombre : 'Sin categoría'
  }

  function getCategory(id){return categories.value.find(c => c.id === id)}
  
  return {
    products,
    categories,
    loading,
    loadCatalog,
    getCategory,
    getCategoryName
  }

}