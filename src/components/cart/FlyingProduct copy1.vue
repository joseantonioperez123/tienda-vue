<template>

    <img
        v-if="store.visible"
        :src="store.image"
        class="flying-product"
        :style="styleObject"
    >

</template>

<script setup>

import { computed } from 'vue'
import { useFlyingProductStore } from '@/stores/flyingProduct'

const store = useFlyingProductStore()

const styleObject = computed(() => {

    const p = store.progress

    const x = store.startX + (store.endX - store.startX) * p
    const y = store.startY + (store.endY - store.startY) * p

    const scale = 1 - (0.6 * p)

    return {
        left: `${x - 35}px`,
        top: `${y - 35}px`,
        transform: `scale(${scale})`
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
    box-shadow: 0 8px 20px rgba(0,0,0,.25);
}

</style>