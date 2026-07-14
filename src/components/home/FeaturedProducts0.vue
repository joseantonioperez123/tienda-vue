<template>

<section class="container py-5">

  <h2 class="text-center mb-5">
    Productos destacados
  </h2>

  <div class="row g-4">

    <div
      class="col-md-4"
      v-for="producto in productos"
      :key="producto.id"
    >

      <ProductCard
        :nombre="producto.nombre"
        :descripcion="producto.descripcion"
        :imagen="producto.imagen"
        :precio="producto.precio"
        :ruta="'/producto/' + producto.id"
      />

    </div>

  </div>

</section>

</template>

<script setup>

import ProductCard from '../products/ProductCard.vue'

const productos = [

  {
    id:1,
    nombre:'Sofá Modular',
    descripcion:'Sofá moderno de cinco plazas.',
    precio:1299,
    imagen:'/productos/sofa.jpg'
  },

  {
    id:2,
    nombre:'Cocina Black',
    descripcion:'Diseño contemporáneo.',
    precio:6490,
    imagen:'/productos/cocina.jpg'
  },

  {
    id:3,
    nombre:'Frigorífico Premium',
    descripcion:'Alta eficiencia energética.',
    precio:1199,
    imagen:'/productos/frigorifico.jpg'
  }

]

</script>