<template>

  <div class="card h-100 shadow-sm">

    <img :src="imagen" :alt="nombre" class="card-img-top">

    <div class="card-body d-flex flex-column">

      <h5 class="card-title">{{ nombre }}</h5>

      <p class="card-text">{{ descripcion }}</p>
   <!--     <span class="badge bg-secondary">
   {{ categoria }}
</span> -->
<!-- hacemos CATEGORIA pinchable para mostrar sus productos -->
      <router-link
        :to="'/categoria/' + categoryId"
        class="btn btn-sm btn-outline-secondary mb-2"
      >
        {{ categoryName }}
      </router-link>
      <div class="mt-auto">
        <p class="fs-4 fw-bold text-primary">{{ precio }} €</p>

        <router-link :to="ruta" class="btn btn-outline-primary w-100">
          Ver producto
        </router-link>
      </div>
    </div>
  </div>

</template>

<script setup>

/*defineProps({
  nombre: String,
  descripcion: String,
  imagen: String,
  precio: Number,
  ruta: String
})
cuando tengamos categoyId*/
import { ref } from 'vue'

import { getCategoryName } from '../../services/categoryService'


const props=defineProps({
  nombre: String,
  descripcion: String,
  imagen: String,
  precio: Number,
  ruta: String,
  categoriaID: Number
})
//const categoria=ref('')
const idcat=props.categoriaID
const categoria = getCategoryName(idcat)
console.log('categoria: '+categoria)

</script>