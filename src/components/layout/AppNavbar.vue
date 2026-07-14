<template>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark">

  <div class="container">

    <router-link class="navbar-brand" to="/">
      Muebles Merino
    </router-link>

    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarMenu"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarMenu">

      <ul class="navbar-nav ms-auto">

        <li class="nav-item">
          <router-link class="nav-link" to="/">
            Inicio
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/productos">
            Productos
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/cocinas">
            Cocinas
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/contacto">
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
    to="/admin/productos">
    Administración
  </RouterLink>
</li>


        <li v-if="!auth.isAuthenticated" class="nav-item">
          <RouterLink class="nav-link" to="/auth">
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



  <button
    class="nav-link btn btn-link border-0 text-white"
    @click="showUserMenu = !showUserMenu"
  >
    {{ auth.user.email }}
  </button>

  <ul
    v-if="showUserMenu"
    class="dropdown-menu dropdown-menu-end show"
  >
    <li>
      <button
        class="dropdown-item"
        @click="logout"
      >
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

import { ref, onMounted } from 'vue'
import * as bootstrap from 'bootstrap'

import { useRouter } from 'vue-router'

const router = useRouter()

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


  import { onBeforeUnmount } from 'vue'

/*function closeMenu(event) {
  if (!event.target.closest('.user-menu')) {
    showUserMenu.value = false
  }
}*/

function closeMenu(event) {
  if (
    userMenu.value &&
    !userMenu.value.contains(event.target)
  ) {
    showUserMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeMenu)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', closeMenu)
})
</script>