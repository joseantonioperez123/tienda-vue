<template>

<div class="container py-5">

  <h1>
    Producto {{ id }}
  </h1>

</div>

</template>

<script setup>

import { useRoute }
from 'vue-router'

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