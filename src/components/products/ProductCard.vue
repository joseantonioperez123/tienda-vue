<template>

  <div class="card h-100 shadow-sm">

    <!--<img :src="props.product.imagen" :alt="props.product.nombre" 
      class="card-img-top">-->
<img
  :src="props.product.imagen || '/camara.png'"
  :alt="props.product.nombre"
  class="card-img-top"
>
    <div class="card-body d-flex flex-column">
      <h5 class="card-title">{{ props.product.nombre }}</h5>
      <p class="card-text">{{ props.product.descripcion }}</p>
   <!--     <span class="badge bg-secondary">
   {{ categoria }}
</span> -->
<!-- hacemos CATEGORIA pinchable para mostrar sus productos -->
      <router-link v-if="!readonly"
        :to="'/categoria/' + props.product.categoryId"
        class="btn btn-sm btn-outline-secondary mb-2">
      {{ categoryName }} Categ </router-link>
      <router-link v-else class="btn btn-sm btn-outline-secondary mb-2">
               {{ categoryName }} Categ </router-link>
      <div class="mt-auto">
        <p class="fs-4 fw-bold text-primary">{{ props.product.precio }} €</p>

        <!--<router-link :to="ruta" class="btn btn-outline-primary w-100">
          Ver producto
        </router-link>-->
        <router-link v-if="!readonly" :to="'/producto/' + props.product.id"
                  class="btn btn-outline-primary w-100">
          Ver producto
        </router-link>

        <!--<button class="btn btn-success w-100 mt-2"
                    @click="addToCart">
          Añadir al carrito
        </button>-->

<button v-if="!readonly" class="btn btn-primary w-100"
  @click="cart.addProduct(product)"
>
  Añadir al carrito
</button>
<button v-else class="btn btn-outline-secondary w-100"
  disabled
>
  Vista previa
</button>

      </div>
    </div>
  </div>

</template>

<script setup>

/*defineProps({
  nombre: String,
  descripcion: String,
  imagen: String,
  precio: Number,
  ruta: String
})
cuando tengamos categoyId*/
//import { ref } from 'vue'

//import { getCategoryName } from '../../services/categoryService'

import { computed } from 'vue'

/*defineProps({

  nombre: String,
  descripcion: String,
  imagen: String,
  precio: Number,
  ruta: String,

  categoryId: Number,
  categoryName: String

})*/

/*const props = defineProps({
  product: Object
})*/
/*const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})*/

/* para reutilizar ProductCard.vue al editar productos o dar alta */
const props = defineProps({
  product: Object,
  readonly: {
    type: Boolean,
    default: false
  }
})

import { useCatalogStore } from '../../stores/catalog'
const catalog = useCatalogStore()

const categoryName = computed(() =>
  catalog.getCategoryName(props.product.categoryId)
)


import { useCartStore } from '../../stores/cart'

const cart = useCartStore()

function addToCart() {
  //console.log('Añadiendo:', props.product)
  cart.addProduct(props.product)
}
</script>