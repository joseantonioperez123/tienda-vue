<template>

<section class="container py-5">

  <h2 class="text-center mb-5">
    Nuestras secciones
  </h2>

    <div class="row g-4">

    <div
        class="col-md-4"
        v-for="categoria in categorias"
        :key="categoria.ruta"
    >

        <CategoryCard
            :titulo="categoria.titulo"
            :descripcion="categoria.descripcion"
            :imagen="categoria.imagen"
            :ruta="categoria.ruta"
        />

    </div>

    </div>

</section>

</template>

<script setup>

import CategoryCard
from '../categories/CategoryCard.vue'

const categorias = [
  {
    titulo:'Muebles',
    descripcion:'Salones, dormitorios y mobiliario.',
    imagen:'/muebles.jpg',
    ruta:'/muebles'
  },
  {
    titulo:'Cocinas',
    descripcion:'Diseños modernos y personalizados.',
    imagen:'/cocinas.jpg',
    ruta:'/cocinas'
  },
  {
    titulo:'Electrodomésticos',
    descripcion:'Las mejores marcas.',
    imagen:'/electrodomesticos.jpg',
    ruta:'/electrodomesticos'
  }
]
</script>