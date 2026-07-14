import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import ProductsView from '../views/ProductsView.vue'
import ProductView from '../views/ProductView.vue'
import CategoryView from '@/views/CategoryView.vue'
import CheckoutView from '../views/CheckoutView.vue'
  import { useOrderStore } from '../stores/order'
import { useAuthStore } from '../stores/auth'

import { pinia } from '../stores'
import { useToastStore } from '../stores/toast'


const routes = [
  {
    path:'/',
    name: 'home',
    component: HomeView
  },
  {
    path:'/productos',
    name: 'products',
    component: ProductsView
  },
  {
    path:'/producto/:id',
    name: 'pruducto',
    component: ProductView
  },
  {
    path:'/categoria/:id',
    name:'category',
    component: CategoryView
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: CheckoutView
  },
 /* {
    path: '/pedido-realizado',
    name: 'pedido-realizado',
    component: () => import('../views/OrderSuccessView.vue')
  }*/
  {
    path: '/pedido-realizado',
    name: 'pedido-realizado',
    component: () => import('../views/OrderSuccessView.vue'),
    /* para evitar ser llamado si el usuario lo escribe en la url */
    beforeEnter: () => {
        const orderStore = useOrderStore()

        if (!orderStore.lastOrder) {
            return '/productos'
        }
    }
  },
  {
    path: '/admin/productos',
    name: 'admin-products',
    component: () => import('../views/admin/AdminProductsView.vue'),
    meta: {
      requiresAdmin: true
    }
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('../views/auth/AuthView.vue')
  }
  /*,
  {
    path: '/admin/categorias',
    name: 'admin-categories',
    component: () => import('../views/admin/AdminCategoriesView.vue')
  }*/
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

/*export default createRouter({
  history:createWebHistory(),
  routes
})*/

/* guard global */
/*router.beforeEach((to) => {
  const auth = useAuthStore()
  if ( to.meta.requiresAdmin && !auth.isAdmin ) {
    return '/'
  }
})*/

router.beforeEach((to) => {
  const auth = useAuthStore(pinia)
  const toast = useToastStore(pinia)
  console.log('Usuario:', auth.user)
console.log('Email:', auth.user?.email)
console.log('isAdmin:', auth.isAdmin)
  if (to.meta.requiresAdmin && !auth.isAdmin) {
    toast.show(
      'No tienes permisos para acceder a esta página.',
      'warning'
    )
    return '/'
  }
})



import { watch } from 'vue'
//import { useRouter } from 'vue-router'

//const router = useRouter()
const auth = useAuthStore(pinia)
watch(
  () => auth.isAdmin,
  (isAdmin) => {
    if (!isAdmin) {
      router.replace('/')
    }
  }
)


export default router