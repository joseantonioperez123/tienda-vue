<template>

  <AppHeader v-if="showHeader" />
  <!--<AppNavbar />-->
  <!--<AppNavbar :fixed="navbarFixed" />-->
  <div class="navbar-wrapper" :class="{ fixed: navbarFixed }">
  <AppNavbar />
</div>
  <main class="app-main">
    <router-view />
  </main>

  <AppToast />
  <ConfirmDialog />

  <FlyingProduct />

  <AppFooter />

</template>

<script setup>

  import AppHeader from './components/layout/AppHeader.vue'
  import AppFooter from './components/layout/AppFooter.vue'

  import AppNavbar from './components/layout/AppNavbar.vue'
  import AppToast from './components/common/AppToast.vue'
  import ConfirmDialog from './components/common/ConfirmDialog.vue'

  import FlyingProduct from '@/components/cart/FlyingProduct.vue'

  import { useCatalogStore } from './stores/catalog'

  const catalog = useCatalogStore()

  import { useRoute } from 'vue-router'

  const route = useRoute()

  import { ref, computed, onMounted, onBeforeUnmount} from 'vue'

  const showHeader = computed(() => route.path === '/')

  const IMPORTAR_FIRESTORE = false
// importar datos desde el servidor JSON a Firestore
//  import { importData } from './scripts/importData'

  onMounted(async () => { 
    await catalog.loadCatalog() 
//    if (IMPORTAR_FIRESTORE) await importData()
    window.addEventListener('scroll', handleScroll)
  })

const navbarFixed = ref(false)

function handleScroll() {
  navbarFixed.value = window.scrollY > 50
}

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
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

.app-main {
  padding-top: 56px;
}

.navbar-wrapper {
  width: 100%;
  height: 56px;
}

.navbar-wrapper.fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1030;
}

</style>
