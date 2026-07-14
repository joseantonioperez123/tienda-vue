import { defineStore } from 'pinia'

import { getAllProducts } from '../services/productService'

import { getAllCategories } from '../services/categoryService'

export const useCatalogStore = defineStore('catalog', {
  state: () => ({ products: [], categories: [], loading: false }),
  actions: {
    async loadCatalog() {
      this.loading = true
      this.products = await getAllProducts()
      this.categories = await getAllCategories()
      this.loading = false
    }
  },
  getters: {
    getCategoryName: state => id => {
      const category = state.categories.find( c => c.id === id )
      return category ? category.nombre : ''
    }
  }
})

/* Mejoras en getters:

getters: {
  getCategory: state => id => {
    return state.categories.find(
      c => c.id === id
    )
  },
  getCategoryName: state => id => {
    const category =
      state.categories.find(
        c => c.id === id
      )
    return category
      ? category.nombre
      : ''
  }
}*/