<template>
<!-- breadcrumb = migas de pan, ruta al producto -->
<nav aria-label="breadcrumb">

  <ol class="breadcrumb">
<li>y esto qué es &nbsp;</li>
    <li
      v-for="item in items"
      :key="item.text"
      class="breadcrumb-item"
      :class="{ active: !item.to }"
    >

      <router-link
        v-if="item.to"
        :to="item.to"
      >
        {{ item.text }}
      </router-link>

      <span v-else>
        {{ item.text }}
      </span>

    </li>

  </ol>

</nav>

</template>

<script setup>

defineProps({
  items: Array
})

</script>