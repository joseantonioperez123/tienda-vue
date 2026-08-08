import { defineStore } from 'pinia'

export const useFlyingProductStore = defineStore('flyingProduct', {
    state: () => ({
        visible: false,
        image: '',
        startX: 0,
        startY: 0
    }),
    actions: {
        fly(product, event) {
            this.image = product.imagen
            this.visible = true
            this.startX = event.clientX
            this.startY = event.clientY
        },
        hide() {
            this.visible = false
        }
    }
})