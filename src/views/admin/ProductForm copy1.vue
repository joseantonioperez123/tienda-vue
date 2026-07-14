<template>

<div class="row">

  <div class="col-lg-7">

    <!-- TODO EL FORMULARIO -->



<!-- <form @submit.prevent="submit"> valida nuestra función -->
<form @submit.prevent="submit" novalidate>
    <div class="mb-3">
        <label class="form-label">
            Nombre
        </label>
        <!--<input
            v-model="form.nombre"
            class="form-control"
            required
        >-->
        <!--<input
            v-model="form.nombre"
            class="form-control"
            :class="{ 'is-invalid': errors.nombre }"
            />-->
        <!--<input
  v-model="form.nombre"
  @input="clearError('nombre')"
/>-->
<input
  v-model="form.nombre"
  class="form-control"
  :class="{ 'is-invalid': errors.nombre }"
  @input="errors.nombre = ''"
/>
        <div class="invalid-feedback">
        {{ errors.nombre }}
        </div>
    </div>
    <div class="mb-3">
        <label class="form-label">
            Descripción
        </label>
        <!--<textarea
            v-model="form.descripcion"
            class="form-control"
            rows="3"
            :class="{ 'is-invalid': errors.descripcion }"
        />-->
  <textarea
  v-model="form.descripcion"
  class="form-control"
  :class="{ 'is-invalid': errors.descripcion }"
  @input="errors.descripcion = ''"
/>
        <div class="invalid-feedback">
          {{ errors.descripcion }}
        </div>
    </div>
    <div class="mb-3">
        <label class="form-label">
            Precio
        </label>
        <!--<input
            v-model.number="form.precio"
            type="number"
            class="form-control"
            min="0"
            step="0.01"
            required
            :class="{ 'is-invalid': errors.precio }"
        >-->
<input
  v-model.number="form.precio"
  type="number"
  class="form-control"
  :class="{ 'is-invalid': errors.precio }"
  @input="errors.precio = ''"
/>
        <div class="invalid-feedback">
            {{ errors.precio }}
        </div>
    </div>
    <div class="mb-3">
        <label class="form-label">
            Categoría
        </label>
        <!--<select
            v-model.number="form.categoryId"
            class="form-select"
            required
            :class="{ 'is-invalid': errors.categoryId }"
        >-->

<select
  v-model="form.categoryId"
  class="form-select"
  :class="{ 'is-invalid': errors.categoryId }"
  @change="errors.categoryId = ''"
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
        <div class="invalid-feedback">
            {{ errors.categoryId }}
        </div>
    </div>

    <div class="mb-3">
        <label class="form-label">
            URL de la imagen
        </label>
        <!--<input
            v-model="form.imagen"
            type="text"
            class="form-control"
            placeholder="https://..."
            :class="{ 'is-invalid': errors.imagen }"
        >-->
<input
  v-model="form.imagen"
  type="text"
  class="form-control"
  :class="{ 'is-invalid': errors.imagen }"
  @input="
    errors.imagen = '',
    imageError = false
  "
/>
        <div class="invalid-feedback">
            {{ errors.imagen }}
        </div>
    </div>

    <div class="image-preview">
        <img
            v-if="form.imagen && !imageError"
            :src="form.imagen"
            class="preview-image"
            @load="imageError = false"
            @error="imageError = true"
        >
        <div
            v-else
            class="image-placeholder"
        >
            🖼️
            <div class="mt-2">
                {{ form.imagen ? 'No se pudo cargar la imagen' : 'Vista previa de la imagen' }}
            </div>
        </div>
    </div>

    <div class="d-flex justify-content-end gap-2">
        <button
            type="button"
            class="btn btn-secondary"
            @click="emit('cancel')"
        >
            Cancelar
        </button>
        <!--<button
            type="submit"
            class="btn btn-success"
        >
            Guardar
        </button>-->

<button
  type="submit"
  class="btn btn-primary"
  :disabled="saving"
>
  <span
    v-if="saving"
    class="spinner-border spinner-border-sm me-2"
  ></span>
  {{ saving ? 'Guardando...' : 'Guardar' }}
</button>

    </div>
</form>

  </div>

  <div class="col-lg-5 preview-card">
    <ProductCard
      :product="form"
      :readonly="true"
    />
  </div>

</div>

</template>

<script setup>

import { ref, reactive, watch } from 'vue'

import { useCatalogStore } from '../../stores/catalog'

const catalog = useCatalogStore()

import ProductCard from '../../components/products/ProductCard.vue'

const imageError = ref(false)

const saving = ref(false)

//const emit = defineEmits(['save'])
const emit = defineEmits([
  'save',
  'cancel'
])

function submit() {
  if (!validate()) {
    return
  }
  saving.value = true
  emit(
    'save',
    { ...form }
  )
  saving.value = false
}

/*sync function submit() {
  if (!validate()) {
    return
  }
  saving.value = true
  try {
    await emit('save', { ...form })
  } finally {
    saving.value = false
  }
}*/

const form = reactive({
    id: null,
    nombre: '',
    descripcion: '',
    precio: 0,
    imagen: '',
    categoryId: null
})

watch(
  () => form.imagen,
  () => { imageError.value = false }
)

const errors = reactive({
  nombre: '',
  descripcion: '',
  precio: '',
  imagen: '',
  categoryId: ''
})

function validate() {
  errors.nombre = ''
  errors.descripcion = ''
  errors.precio = ''
  errors.imagen = ''
  errors.categoryId = ''

  let valid = true

  // Nombre
  if (!form.nombre.trim()) {
    errors.nombre = 'El nombre es obligatorio'
    valid = false
  }
  else if (form.nombre.length < 3) {
    errors.nombre = 'Debe tener al menos 3 caracteres'
    valid = false
  }
  // Descripción
  if (!form.descripcion.trim()) {
    errors.descripcion = 'La descripción es obligatoria'
    valid = false
  }
  else if (form.descripcion.length < 10) {
    errors.descripcion = 'Debe tener al menos 10 caracteres'
    valid = false
  }
  // Precio
  if (form.precio <= 0) {
    errors.precio = 'Debe ser mayor que cero'
    valid = false
  }
  // Categoría
  if (!form.categoryId) {
    errors.categoryId = 'Seleccione una categoría'
    valid = false
  }
  // Imagen
  if (!form.imagen.trim()) {
    errors.imagen = 'La imagen es obligatoria'
    valid = false
  }
  return valid
}

function clearError(field) {
  errors[field] = ''
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

function resetForm() {
  Object.assign(form, {
    id: null,
    nombre: '',
    descripcion: '',
    precio: 0,
    imagen: '',
    categoryId: null
  })

  imageError.value = false

  Object.keys(errors).forEach(key => {
    errors[key] = ''
  })
}

/*watch(
  () => props.product,
  (product) => {
    Object.assign(form, product)
    imageError.value = false
    Object.keys(errors).forEach(key => (errors[key] = ''))
  },
  { immediate: true }
)*/

watch(
  () => props.product, (product) => {
    if (product) { Object.assign(form, product)
    } else {
      resetForm()
    }
    imageError.value = false
    Object.keys(errors).forEach(key => { errors[key] = '' })
  },
  { immediate: true }
)

/*watch( () => props.product, (product) => {
    if (product) {
      Object.assign(form, product)
    } else {
      resetForm()
    }
  },
  { immediate: true }
)*/

/*watch( () => props.product, (product) => {
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
)*/


</script>

<style>
.image-preview {
  width: 100%;
  height: 220px;
  border: 2px dashed #ced4da;
  border-radius: 8px;
  overflow: hidden;
  background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: opacity .25s ease;
}

.image-placeholder {
  color: #6c757d;
  text-align: center;
  font-size: 1rem;
}

.image-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.image-placeholder {
  font-size: 3rem;
}

.preview-card {
    position: sticky;
    top: 20px;
}

</style>