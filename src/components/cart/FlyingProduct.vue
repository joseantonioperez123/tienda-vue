<template>

    <img
        v-if="store.visible"
        :src="store.image"
        class="flying-product"
        :style="styleObject"
    >

</template>

<script setup>

import { computed, watch, onBeforeUnmount } from 'vue'
import { useFlyingProductStore } from '@/stores/flyingProduct'
import { useCartStore } from '@/stores/cart'

const cart = useCartStore()

const store = useFlyingProductStore()

let animationFrame = null
let startTime = null

const duration = 700

function animate(timestamp) {

    if (!startTime) {
        startTime = timestamp
    }

    const elapsed = timestamp - startTime

    let progress = elapsed / duration

    if (progress >= 1) {
        progress = 1
    }

    store.progress = progress

    if (progress < 1) {

        animationFrame = requestAnimationFrame(animate)

    } else {
cart.triggerBounce()
        store.hide()

        startTime = null
        animationFrame = null
    }
}

function startAnimation() {
console.log('startAnimation()', {
        startX: store.startX,
        startY: store.startY,
        cartX: store.cartX,
        cartY: store.cartY
    })

    if (animationFrame) {
        cancelAnimationFrame(animationFrame)
    }

    startTime = null

    animationFrame = requestAnimationFrame(animate)
}

watch(
    () => store.visible,
    visible => {
console.log('FlyingProduct visible:', visible)
        if (visible) {
            console.log('Iniciando la animación')
            startAnimation()
        }

    }
)

const styleObject = computed(() => {

    const p = store.progress

    const x =
        store.startX +
        (store.cartX - store.startX) * p

    const y =
        store.startY +
        (store.cartY - store.startY) * p

    // arco de la trayectoria
    const arc = -120 * Math.sin(Math.PI * p)

    // reducción progresiva
    const scale = 1 - (0.65 * p)

    return {
        left: `${x - 35}px`,
        top: `${y + arc - 35}px`,
        transform: `scale(${scale})`
    }
})

onBeforeUnmount(() => {
    if (animationFrame) {
        cancelAnimationFrame(animationFrame)
    }
})
</script>

<style scoped>

.flying-product {

    position: fixed;

    width: 70px;
    height: 70px;

    object-fit: cover;

    border-radius: 10px;

    pointer-events: none;

    z-index: 9999;

    box-shadow:
        0 8px 20px rgba(0, 0, 0, .25);

    will-change:
        transform,
        left,
        top;
}

</style>