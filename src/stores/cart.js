import { defineStore } from 'pinia'
import { loadCart, saveCart, clearCartStorage } from '../services/cartStorageService'

export const useCartStore = defineStore('cart', {
  /*state: () => ({ items: [] }),*/
  /*state: () => ({ items: loadCart() }),*/
  state: () => ({ items: loadCart(), isOpen: false, bounceCart: false }),
  getters: {
    totalItems: state =>
      state.items.reduce( (total, item) => total + item.quantity, 0 ),
    totalPrice: state =>
      state.items.reduce(
        (total, item) => total + item.product.precio * item.quantity, 0 )
  },
  actions: {
    openCart() { this.isOpen = true },
    closeCart() { this.isOpen = false },
    toggleCart() { this.isOpen = !this.isOpen },
    addProduct(product) {
      const item = this.items.find( i => i.product.id === product.id )
      if (item) {
        item.quantity++
      } else {
        this.items.push({ product, quantity: 1 })
      }
      saveCart(this.items)
      //this.isOpen = true    para que no abra el carrito cada vez que añadimos un producto
      this.triggerBounce()
    },
    triggerBounce() {
    this.bounceCart = false

    requestAnimationFrame(() => {
        this.bounceCart = true
    })
},
    increment(productId) {
        const item = this.items.find( i => i.product.id === productId )
        if (item) { item.quantity++ }
        saveCart(this.items)
    },
    decrement(productId) {
        const item = this.items.find( i => i.product.id === productId )
        if (!item) return
        if (item.quantity > 1) { item.quantity-- }
        else { this.removeProduct(productId) }
        saveCart(this.items)
    },
    /*removeProduct(productId) {
        this.items = this.items.filter( i => i.product.id !== productId )
        saveCart(this.items)
    },*/
    removeProduct(productId) {
        const item = this.items.find( i => i.product.id === productId )
        if (!item) return
        /*analyticsService.removeFromCart(
            item.product,
            '',          // luego mejoraremos esto
            item.quantity
        )*/
       analyticsService.removeFromCart( item.product, item.quantity )
        this.items = this.items.filter( i => i.product.id !== productId )
        saveCart(this.items)
    },
    clearCart() {
        this.items = []
        saveCart(this.items)
        clearCartStorage()
    }
  }
})