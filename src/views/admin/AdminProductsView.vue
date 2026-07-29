<template>

<div class="container py-5">
    <div class="d-flex justify-content-between mb-4">
        <h2>Administración de productos</h2>
<!--<button
    class="btn btn-success"
    @click="showForm = true"
>-->
        <button
            class="btn btn-success"
            @click="openModal(null)"
        >
            + Nuevo producto
        </button>
    </div>
    <table class="table table-hover align-middle">
        <thead>
            <tr><th>ID</th><th>Imagen</th><th>Nombre</th><th>Categoría</th>
                <th>Precio</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr
                v-for="product in catalog.products"
                :key="product.id"
            >
                <td>{{ product.id }}</td>
                <td>
                    <img :src="product.imagen" width="70">
                </td>
                <td>
                    {{ product.nombre }}
                </td>
                <td>{{ product.categoryId }}
                    {{ catalog.getCategoryName(product.categoryId) }}
                </td>
                <td>
                    {{ product.precio }} €
                </td>
                <td>
                    <button class="btn btn-warning btn-sm me-2"
                            @click="editProduct(product)">
                        Editar
                    </button>
                    <button class="btn btn-danger btn-sm"
                            @click="removeProduct(product)">
                        Eliminar
                    </button>
                </td>
            </tr>
        </tbody>
    </table>

<!--<ProductForm
    v-if="showForm"
    @save="saveProduct"
/>-->

    <div
        class="modal fade"
        tabindex="-1"
        ref="modal"
    >
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <!--<h5 class="modal-title">Nuevo producto</h5>-->
                    <h5 class="modal-title">
                      {{ selectedProduct ? 'Editar producto' : 'Nuevo producto' }}
                    </h5>
                    <button class="btn-close" data-bs-dismiss="modal"/>
                </div>
                <div class="modal-body">
                    <!--<ProductForm  @save="saveProduct" /> -->
                    <!--<ProductForm :product="selectedProduct"
                            @save="saveProduct"/>-->
                            <ProductForm
    :product="selectedProduct"
    @save="saveProduct"    
    @cancel="closeModal"
/> <!-- si el hijo (ProductForm) emite save => ejecuta saveProduct -->
                </div>
            </div>
        </div>
    </div>
</div>

</template>

<script setup>

import { onMounted } from 'vue'
import * as bootstrap from 'bootstrap'
//import ProductForm from '../../components/admin/ProductForm.vue'
import ProductForm from './ProductForm.vue'

import { useToastStore } from '../../stores/toast'

const toast = useToastStore()

import { useConfirmStore } from '../../stores/confirm'

const confirm = useConfirmStore()

import { ref } from 'vue'

import { uploadImage } from '../../services/storageService'

const showForm = ref(false)

const modal = ref(null)

let bsModal

const selectedProduct = ref(null)



import { useCatalogStore } from '../../stores/catalog'

const catalog = useCatalogStore()

//console.log(catalog)
//console.log(Object.keys(catalog))



/*onMounted(() => {
    catalog.loadCatalog()
})*/

/*onMounted(async () => {
  await catalog.loadCatalog()
  bsModal = new bootstrap.Modal(modal.value)
})*/

onMounted(() => {
    bsModal = new bootstrap.Modal(modal.value)
    modal.value.addEventListener(
        'hidden.bs.modal',
        () => { selectedProduct.value = null }
    )
    console.log("Categorías:", catalog.categories)
    console.log("Primer producto:", catalog.products[0])

console.log(
  "CategoryId:",
  catalog.products[0].categoryId
)

console.log(
  "Categoría encontrada:",
  catalog.categories.find(
    c => c.id === catalog.products[0].categoryId
  )
)
})

/*
async function removeProduct(product) {
  const confirmed = confirm(`¿Eliminar "${product.nombre}"?`)
  if (!confirmed) return
  try {
    await catalog.deleteProduct(product.id)
    
    toast.show('Producto eliminado correctamente','danger')
  } catch (error) {
    alert(error.message)
  }
}*/

function editProduct(product) {
  selectedProduct.value = { ...product }
  bsModal.show()
}

/* nuestro propio componente ConfirmDialog */
async function removeProduct(product) {
    //console.log('1. AdminProductsView', product)
  const accepted = await confirm.open(
    'Eliminar producto',
    `¿Desea eliminar "${product.nombre}"?`
  )
  if (!accepted) {
    return
  }
  //await catalog.deleteProduct(product.id)
  /* para borrar imagen del bucket le pasamos product */
  await catalog.deleteProduct(product)
  toast.show('Producto eliminado correctamente', 'danger')
}

/*function openModal(product = null) {
  selectedProduct.value = product
  bsModal.show()
}*/

const EMPTY_PRODUCT = {
  id: null,
  nombre: '',
  descripcion: '',
  precio: 0,
  imagen: '',
  categoryId: null
}

function openModal(product = null) {
  selectedProduct.value = product
    ? { ...product }
    : { ...EMPTY_PRODUCT }

  bsModal.show()
}

/*function openModal(product) {
  selectedProduct.value = product ?? null
  bsModal.show()
}*/

/*function openModal(product = null) {
  if (product instanceof MouseEvent) {
    product = null
  }
  selectedProduct.value = product
  bsModal.show()
}*/

/*function openModal() {  bsModal.show() }*/

function closeModal() {
    selectedProduct.value = null
    bsModal.hide()
}
/*async function saveProduct(product) {
    await catalog.createProduct(product)
    showForm.value = false
}*/

/*async function saveProduct(product) {
    await catalog.createProduct(product)
    bsModal.hide()
}*/

async function saveProduct(product) {
      //console.log('A')
  //console.log(product)
  //console.log(product.id)

  if (product.id) {
    //console.log('B - Voy a llamar a updateProduct')
    await catalog.updateProduct(product)
    //console.log('C - He vuelto de updateProduct')
    toast.show('Producto actualizado correctamente','primary')
  } else {
    //console.log('D - Voy a crear')
    await catalog.createProduct(product)
    toast.show('Producto creado correctamente','primary')
  }
  selectedProduct.value = null
  //bsModal.hide()
  closeModal()
}

</script>