<!-- <template>

<div class="container">

  <h2>Bienvenidos</h2>

  <p>
    Tienda de muebles y cocinas.
  </p>

</div>

</template>
-->


<template>

  <HeroSection />
  
  <FeaturedCategories />

  <FeaturedProducts />

  <ServicesSection />
  
</template>

<script setup>

import HeroSection from '../components/home/HeroSection.vue'
import ServicesSection from './ServicesSection.vue';
import FeaturedCategories from '../components/home/FeaturedCategories.vue';
import FeaturedProducts from '../components/home/FeaturedProducts.vue'
</script>