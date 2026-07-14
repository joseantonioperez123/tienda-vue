import { defineStore } from 'pinia'

export const useOrderStore = defineStore('order', {
    state: () => ({ lastOrder: null }),
    actions: {
        saveOrder(order) { this.lastOrder = order },
        clearOrder() { this.lastOrder = null }
    }
})