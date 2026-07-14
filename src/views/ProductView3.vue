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

import { getProductById } from '../services/productService'

const producto = getProductById(id)

</script>