import { defineStore } from 'pinia'

/*import {
  getAllProducts,
  createProduct as apiCreateProduct,
  deleteProduct as apiDeleteProduct
} from '../services/productService'*/
//import { getAllProducts, deleteProduct as apiDeleteProduct } from '../services/productService'
import {
  getAllProducts,
  createProduct as apiCreateProduct,
  updateProduct as apiUpdateProduct,
  deleteProduct as apiDeleteProduct
} from '../services/productService'

import { getAllCategories } from '../services/categoryService'

export const useCatalogStore = defineStore('catalog', {
  state: () => ({ products: [], categories: [], loading: false }),
  actions: {
    async loadCatalog() {
      // Evita volver a cargar los datos
      if (this.products.length && this.categories.length) {
        return
      }
      this.loading = true
      try {
        this.products = await getAllProducts()
        this.categories = await getAllCategories()
      } finally {
        this.loading = false
      }
    },
    /*async deleteProduct(id) {
      await apiDeleteProduct(id)
      this.products = this.products.filter(product => product.id !== id)
    }*/
   /* pasamos product en lugar de id porque necesitamos la imagen
    del bucket */
    async deleteProduct(product) {
      console.log('2. catalog', product)
      await apiDeleteProduct(product)
      this.products = this.products.filter( p => p.id !== product.id )
    },
    async createProduct(product) {
      const newProduct = await apiCreateProduct(product)
      this.products.push(newProduct)
    },
    async updateProduct(product) {
      console.log('E - Dentro de catalog.updateProduct')
      console.log(product)
console.log(product.imageFile)
      const updated = await apiUpdateProduct(product)
      console.log('F - Después de apiUpdateProduct')
      const index = this.products.findIndex( p => p.id === updated.id )
      if (index !== -1) { this.products[index] = updated }
    }
  },
  getters: {
    // ===============================
    // PRODUCTOS
    // ===============================
    getProduct: state => id => state.products.find( p => p.id === id ),
    featuredProducts: state => state.products.slice(0, 2),
    // ===============================
    // CATEGORÍAS
    // ===============================
    getCategory: state => id => state.categories.find( c => c.id === id ),
    getCategoryName: state => id => {
      const category = state.categories.find( c => c.id === id )
      return category ? category.nombre : ''
    },
    // ===============================
    // RELACIONES
    // ===============================
    getProductsByCategory: state => categoryId =>
      state.products.filter( p => p.categoryId === categoryId ),
    filterProducts: state => ({ text, categoryId }) => {
      return state.products.filter(product => {
        const coincideTexto =
          product.nombre.toLowerCase().includes(text.toLowerCase()) ||
          product.descripcion.toLowerCase().includes(text.toLowerCase())
        const coincideCategoria =
          !categoryId || product.categoryId === categoryId
        return coincideTexto && coincideCategoria
      })
    }
  }
})