<template>

  <AppHeader />
  <AppNavbar />
  <main>
    <router-view />
  </main>

  <AppToast />
  <ConfirmDialog />
  <AppFooter />

</template>

<script setup>

  import AppHeader from './components/layout/AppHeader.vue'
  import AppFooter from './components/layout/AppFooter.vue'

  import AppNavbar from './components/layout/AppNavbar.vue'
  import AppToast from './components/common/AppToast.vue'
  import ConfirmDialog from './components/common/ConfirmDialog.vue'

  import { onMounted } from 'vue'

  import { useCatalogStore } from './stores/catalog'

  const catalog = useCatalogStore()

const IMPORTAR_FIRESTORE = false
// importar datos desde el servidor JSON a Firestore
  import { importData } from './scripts/importData'

  onMounted(async () => { 
    await catalog.loadCatalog() 
    if (IMPORTAR_FIRESTORE) await importData()
  })



/* probar Firestore */
/*import { getAllProductsFirestore } from './services/productService'

onMounted(async () => {
  const productos = await getAllProductsFirestore()
  console.log(productos)
})*/


</script>

<style>

  body{
    margin:0;
    font-family: Arial, Helvetica, sans-serif;
  }

</style>
