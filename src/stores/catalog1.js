import { defineStore } from 'pinia'

import { getAllProducts } from '../services/productService'

import { getAllCategories } from '../services/categoryService'

export const useCatalogStore = defineStore('catalog', {
  state: () => ({ products: [], categories: [], loading: false }),
  actions: {
    async loadCatalog() {
      if ( this.products.length && this.categories.length ) return

      this.loading = true
      this.products = await getAllProducts()
      this.categories = await getAllCategories()
      this.loading = false
    }
  },
  getters: {
    getCategory: state => id =>
      state.categories.find( c => c.id === id ),
    getCategoryName: state => id => {
      const category = state.categories.find( c => c.id === id )
      return category ? category.nombre : ''
    },
    getProduct: state => id =>
      state.products.find( p => p.id === id )
  }
})