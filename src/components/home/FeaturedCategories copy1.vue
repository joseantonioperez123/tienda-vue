<template>

<section class="container py-5">

  <h2 class="text-center mb-5">
    Nuestras secciones
  </h2>

  <div class="row g-4">

    <div class="col-md-4">

      <CategoryCard
        titulo="Muebles"
        descripcion="Salones, dormitorios y mobiliario para toda la casa."
        imagen="/muebles.jpg"
        ruta="/muebles"
      />

    </div>

    <div class="col-md-4">

      <CategoryCard
        titulo="Cocinas"
        descripcion="Diseños modernos y personalizados."
        imagen="/cocinas.jpg"
        ruta="/cocinas"
      />

    </div>

    <div class="col-md-4">

      <CategoryCard
        titulo="Electrodomésticos"
        descripcion="Las mejores marcas para tu hogar."
        imagen="/electrodomesticos.jpg"
        ruta="/electrodomesticos"
      />

    </div>

  </div>

</section>

</template>

<script setup>

import CategoryCard
from '../categories/CategoryCard.vue'

</script>