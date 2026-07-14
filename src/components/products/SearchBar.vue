<template>

<!-- <div class="mb-4">

  <input
    v-model="search"
    type="text"
    class="form-control form-control-lg"
    placeholder="Buscar productos..."
  >

</div> -->

<div class="input-group mb-4">

  <span class="input-group-text">
    🔍
  </span>

  <input
    v-model="search"
    type="text"
    class="form-control"
    placeholder="Buscar productos..."
  >

</div>

</template>

<script setup>

const search = defineModel()

</script>