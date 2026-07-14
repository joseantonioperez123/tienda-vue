<template>

<form @submit.prevent="save">

    <div class="mb-3">

        <label class="form-label">
            Nombre
        </label>

        <input
            v-model="form.nombre"
            class="form-control"
            required
        >

    </div>

    <div class="mb-3">

        <label class="form-label">
            Descripción
        </label>

        <textarea
            v-model="form.descripcion"
            class="form-control"
            rows="3"
        />

    </div>

    <div class="mb-3">

        <label class="form-label">
            Precio
        </label>

        <input
            v-model.number="form.precio"
            type="number"
            class="form-control"
            min="0"
            step="0.01"
            required
        >

    </div>

    <div class="mb-3">

        <label class="form-label">
            Categoría
        </label>

        <select
            v-model.number="form.categoryId"
            class="form-select"
            required
        >

            <option :value="null">
                Seleccione una categoría
            </option>

            <option
                v-for="category in catalog.categories"
                :key="category.id"
                :value="category.id"
            >

                {{ category.nombre }}

            </option>

        </select>

    </div>
    <div class="mb-4">
        <label class="form-label">
            URL de la imagen
        </label>
        <input
            v-model="form.imagen"
            class="form-control"
        >
    </div>
    <!--<button
        class="btn btn-success w-100"
    >
        Guardar producto
    </button>-->
    <div class="d-flex justify-content-end gap-2">

    <button
        type="button"
        class="btn btn-secondary"
        @click="emit('cancel')"
    >
        Cancelar
    </button>

    <button
        type="submit"
        class="btn btn-success"
    >
        Guardar
    </button>

</div>
</form>

</template>

<script setup>

//import { reactive } from 'vue'
import { reactive, watch } from 'vue'

import { useCatalogStore } from '../../stores/catalog'

const catalog = useCatalogStore()

//const emit = defineEmits(['save'])
const emit = defineEmits([
  'save',
  'cancel'
])

const form = reactive({
    id: null,
    nombre: '',
    descripcion: '',
    precio: 0,
    imagen: '',
    categoryId: null
})

function save() {
    emit('save', { ...form })
}


const props = defineProps({
  product: {
    type: Object,
    default: null /*() => ({
      nombre: '',
      descripcion: '',
      precio: 0,
      imagen: '',
      categoryId: null
    })*/
  }
})

watch( () => props.product, (product) => {
    if (!product) {
      form.id = null
      form.nombre = ''
      form.descripcion = ''
      form.precio = 0
      form.imagen = ''
      form.categoryId = null
      return
    }
    Object.assign(form, product)
  },
  { immediate: true }
)


</script>