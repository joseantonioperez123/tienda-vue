import { defineStore } from 'pinia'

export const useFlyingProductStore = defineStore('flyingProduct', {
    state: () => ({
        visible: false,
        image: '',

        startX: 0,
        startY: 0,

        cartX: 0,
        cartY: 0,

        progress: 0
    }),

    actions: {

        setCartPosition(element) {
            const rect = element.getBoundingClientRect()

            this.cartX = rect.left + rect.width / 2
            this.cartY = rect.top + rect.height / 2
        },

        fly(product, event) {
console.log('FLY()', product, event)
            this.image = product.imagen

            this.startX = event.clientX
            this.startY = event.clientY

            this.progress = 0
            this.visible = true
            console.log('FlyingProduct state:', {
        image: this.image,
        startX: this.startX,
        startY: this.startY,
        cartX: this.cartX,
        cartY: this.cartY,
        visible: this.visible
    })
        },

        hide() {
            this.visible = false
            this.progress = 0
        }
    }
})