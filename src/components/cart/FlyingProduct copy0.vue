<template>
    <img
        v-if="visible"
        :src="image"
        class="flying-product"
        :style="styleObject"
    >
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)
const image = ref('')

const styleObject = ref({})
</script>

<style scoped>

.flying-product{
    position:fixed;
    width:80px;
    height:80px;
    object-fit:cover;
    border-radius:10px;
    pointer-events:none;
    z-index:5000;
    transition:
        left .8s cubic-bezier(.25,.8,.25,1),
        top .8s cubic-bezier(.25,.8,.25,1),
        transform .8s;

}

</style>