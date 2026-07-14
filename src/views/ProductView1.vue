<template>

<div
  class="container py-5"
  v-if="producto"
>

  <div class="row">

    <div class="col-md-6">

      <img
        :src="producto.imagen"
        class="img-fluid rounded"
      >

    </div>

    <div class="col-md-6">

      <h1>
        {{ producto.nombre }}
      </h1>

      <p class="lead">
        {{ producto.descripcion }}
      </p>

      <p class="display-6 text-primary">

        {{ producto.precio }} €

      </p>

      <button
        class="btn btn-primary"
      >
        Solicitar información
      </button>

    </div>

  </div>

</div>

<div
  class="container py-5"
  v-else
>

  <h2>
    Producto no encontrado
  </h2>

</div>

</template>

<script setup>

import { useRoute } from 'vue-router'

const route = useRoute()

const id = route.params.id

const productos = [

  {
    id:1,
    nombre:'Sofá Modular',
    descripcion:'Sofá moderno.',
    precio:1299,
    imagen:'/productos/sofa.jpg'
  },

  {
    id:2,
    nombre:'Cocina Black',
    descripcion:'Cocina moderna.',
    precio:6490,
    imagen:'/productos/cocina.jpg'
  },

  {
    id:3,
    nombre:'Frigorífico Premium',
    descripcion:'Alta eficiencia.',
    precio:1199,
    imagen:'/productos/frigorifico.jpg'
  }

]

const producto = productos.find(
  p => p.id === Number(id)
)

</script>