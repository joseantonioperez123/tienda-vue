<template>

  <div class="card h-100 shadow-sm">

    <img
      :src="imagen"
      class="card-img-top"
      :alt="titulo"
    >

    <div class="card-body">

      <h5 class="card-title">
        {{ titulo }}
      </h5>

      <p class="card-text">
        {{ descripcion }}
      </p>

      <router-link
        :to="ruta"
        class="btn btn-primary"
      >
        Ver más
      </router-link>

    </div>

  </div>

</template>

<script setup>

defineProps({
  titulo: String,
  descripcion: String,
  imagen: String,
  ruta: String
})

</script>