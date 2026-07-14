<template>

  <div class="card h-100 shadow-sm">

    <img :src="props.product.imagen" :alt="props.product.nombre" class="card-img-top">

    <div class="card-body d-flex flex-column">

      <h5 class="card-title">{{ props.product.nombre }}</h5>

      <p class="card-text">{{ props.product.descripcion }}</p>
   <!--     <span class="badge bg-secondary">
   {{ categoria }}
</span> -->
<!-- hacemos CATEGORIA pinchable para mostrar sus productos -->
      <router-link
        :to="'/categoria/' + props.product.categoryId"
        class="btn btn-sm btn-outline-secondary mb-2"
      >
        {{ categoryName }} Categ
      </router-link>
      <div class="mt-auto">
        <p class="fs-4 fw-bold text-primary">{{ props.product.precio }} €</p>

        <!--<router-link :to="ruta" class="btn btn-outline-primary w-100">
          Ver producto
        </router-link>-->
        <router-link :to="'/producto/' + props.product.id"
                  class="btn btn-outline-primary w-100">
          Ver producto
        </router-link>
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
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

import { useCatalogStore } from '../../stores/catalog'
const catalog = useCatalogStore()

const categoryName = computed(() =>
  catalog.getCategoryName(props.product.categoryId)
)


//const categoria=ref('')
/*const idcat=props.categoriaID
const categoria = getCategoryName(idcat)
console.log('categoria: '+categoria)*/


</script>