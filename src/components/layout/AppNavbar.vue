<template>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark app-navbar">
<!--<nav class="navbar navbar-expand-lg navbar-dark bg-dark app-navbar"
      :class="{ 'navbar-fixed': fixed }">-->
  <div class="container">
    <router-link class="navbar-brand" to="/">
      Muebles Merino
    </router-link>
    <!--<button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarMenu"
    >-->

<button
  class="navbar-toggler"
  type="button"
  :aria-expanded="menuOpen"
  aria-controls="navbarMenu"
  @click="menuOpen = !menuOpen"
>

      <span class="navbar-toggler-icon"></span>
    </button>
    <!--<div class="collapse navbar-collapse" id="navbarMenu">-->

<div
  ref="navbarMenu"
  class="collapse navbar-collapse"
  :class="{ show: menuOpen }"
  id="navbarMenu"
>

      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/" @click="menuOpen = false">
            Inicio
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/productos" @click="menuOpen = false">
            Productos
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/cocinas" @click="menuOpen = false">
            Cocinas
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/contacto" @click="menuOpen = false">
            Contacto
          </router-link>
        </li>
        <!-- administración, más adelante con autenticación -->
        <!--<li class="nav-item">
            <router-link class="nav-link" to="/admin/productos">
                Administración
            </router-link>
        </li>-->
        <li v-if="auth.isAdmin" class="nav-item">
          <RouterLink
            class="nav-link"
            to="/admin/productos" @click="menuOpen = false">
            Administración
          </RouterLink>
        </li>
        <li v-if="!auth.isAuthenticated" class="nav-item">
          <RouterLink class="nav-link" to="/auth" @click="menuOpen = false">
            Iniciar sesión
          </RouterLink>
        </li>
        <!--<li v-if="auth.isAuthenticated" class="nav-item dropdown">-->
        <li ref="userMenu"
          v-if="auth.isAuthenticated"
          class="nav-item position-relative user-menu"
        >
          <!--<a class="nav-link dropdown-toggle" href="#"
            data-bs-toggle="dropdown">
            {{ auth.user.email }}
          </a>-->
<!--<button
  class="nav-link dropdown-toggle btn btn-link border-0"
  type="button"
  data-bs-toggle="dropdown"
  aria-expanded="false"
>
  {{ auth.user.email }}
</button>-->
<!--<button
  ref="dropdownButton"
  class="nav-link dropdown-toggle btn btn-link border-0"
  type="button"
  data-bs-toggle="dropdown"
>
  {{ auth.user.email }}
</button>
          <ul class="dropdown-menu">
            <li>
              <button class="dropdown-item" @click="logout">
                Cerrar sesión
              </button>
            </li>
          </ul>
        </li>-->
        <button class="nav-link btn btn-link border-0 text-white"
                    @click="showUserMenu = !showUserMenu">
          {{ auth.user.email }}
        </button>
        <ul v-if="showUserMenu"
            class="dropdown-menu dropdown-menu-end show">
          <li>
            <button class="dropdown-item" @click="logout">
              Cerrar sesión
            </button>
          </li>
        </ul>
      </li>
 <!--       <span class="badge bg-danger">
  {{ cart.totalItems }}
</span>
        <li class="nav-item">
          🛒 {{ cart.totalItems }}
        </li>-->
      </ul>
    </div>
    <div class="d-flex align-items-center">
      <CartButton/>
      <CartDrawer />
    </div>
  </div> 
</nav>
<!--<CartOffcanvas/>-->
</template>

<script setup>

import { ref, onMounted, onBeforeUnmount } from 'vue'
//import * as bootstrap from 'bootstrap'

import { useRouter } from 'vue-router'

const router = useRouter()

/*const props = defineProps({
  fixed: {
    type: Boolean,
    default: false
  }
})*/

async function logout() {
  await auth.logout()
  showUserMenu.value = false
  await router.push('/') /* si estábamos en admin nos echa */
}
/*const dropdownButton = ref()

onMounted(() => {
  new bootstrap.Dropdown(dropdownButton.value)
})*/

const showUserMenu = ref(false)
const menuOpen = ref(false)
const navbarMenu = ref(null)

import { useCartStore } from '../../stores/cart'

const cart = useCartStore()

import CartButton from '../cart/CartButton.vue'

import CartDrawer from '../cart/CartDrawer.vue'
//import CartOffcanvas from '../cart/CartOffcanvas.vue'

import { useAuthStore } from '../../stores/auth'

const auth = useAuthStore()

  //async function logout() { await auth.logout() }
  
  /*async function logout() {
    await auth.logout()
    showUserMenu.value = false
  }*/

const userMenu = ref(null)

/*function closeMenu(event) {
  if (!event.target.closest('.user-menu')) {
    showUserMenu.value = false
  }
}*/

function closeMenu(event) {
  if ( userMenu.value && !userMenu.value.contains(event.target) ) {
    showUserMenu.value = false
  }
}

function closeNavbarMenu(event) {
  if (
    menuOpen.value &&
    navbarMenu.value &&
    !navbarMenu.value.contains(event.target) &&
    !event.target.closest('.navbar-toggler')
  ) {
    menuOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeMenu)
  document.addEventListener('click', closeNavbarMenu)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', closeMenu)
  document.removeEventListener('click', closeNavbarMenu)
})

//onMounted(() => { document.addEventListener('click', closeMenu) })

//onBeforeUnmount(() => { document.removeEventListener('click', closeMenu) })
</script>

<style>


    /*z-index: 1030;    usado en cabeceras Bootstrap para que el
                      contenido no pase por encima */
    /*background: white;*/

/*.app-navbar {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    width: 100% !important;
    z-index: 999999 !important;
}*/

.app-navbar {
    width: 100%;
    z-index: 1030;
}

/*.navbar-fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
}*/

/*body {
    overflow: visible !important;
}

html {
    overflow: visible !important;
}*/

</style>