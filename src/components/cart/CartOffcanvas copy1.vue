

<template>
<Transition name="drawer">
<!--<div
    class="offcanvas offcanvas-end"
    tabindex="-1"
    id="cartOffcanvas">

    <div class="offcanvas-header">-->


<!--<div v-if="cart.isOpen" class="cart-overlay"
    @click.self="cart.closeCart()">-->
  <div
    v-if="cart.isOpen"
    class="cart-backdrop"
    @click.self="cart.closeCart()">
<aside class="cart-panel">
      <!-- Cabecera -->
    <!--<div class="offcanvas-panel">  -->
    <header class="cart-header">
        <h5>Mi carrito</h5>
        <!--<button class="btn-close"
            data-bs-dismiss="offcanvas"></button>-->
            <button
    class="btn-close"
    @click="cart.closeCart()">
</button>
    </header>
    <!--</div>-->
    <!-- Productos -->
    <!--<div class="offcanvas-body">-->
    <main class="cart-body">
        <p v-if="cart.items.length==0">
            El carrito está vacío.
        </p>
        <div v-else>
            <CartItem
                v-for="item in cart.items"
                :key="item.product.id"
                :item="item"
            />
            <hr>
            <!-- Total -->
            <!--<div class="d-flex justify-content-between">
                <strong>Total</strong>
                <strong>
                {{ cart.totalPrice }} €
                </strong>
            </div>-->
        </div>
        <!--<button v-if="cart.items.length"
            class="btn btn-outline-danger w-100 mt-3"
                    @click="cart.clearCart()">
            Vaciar carrito
        </button>
        <button class="btn btn-primary w-100 mt-3"
            @click="goToCheckout">
            Finalizar compra
        </button>-->
    <!--</div>-->
    </main>

<footer class="cart-footer">

    <div class="d-flex justify-content-between mb-3">
        <strong>Total</strong>
        <strong>{{ cart.totalPrice }} €</strong>
    </div>

    <button
        v-if="cart.items.length"
        class="btn btn-outline-danger w-100 mb-2"
        @click="cart.clearCart()"
    >
        Vaciar carrito
    </button>

    <button
        v-if="cart.items.length"
        class="btn btn-primary w-100"
        @click="goToCheckout"
    >
        Finalizar pedido
    </button>

</footer>
    </aside>
</div>

</Transition>
</template>


<script setup>
import CartItem from './CartItem.vue'
import { useCartStore } from '../../stores/cart'

const cart=useCartStore()

import { useRouter } from 'vue-router'
//import { Offcanvas } from 'bootstrap'

const router = useRouter()

/*function goToCheckout() {
  const element = document.getElementById('cartOffcanvas')
  const offcanvas = Offcanvas.getInstance(element)
  if (offcanvas) { offcanvas.hide() }
  router.push('/checkout')
}*/

function goToCheckout() {
  //const element = document.getElementById('cartOffcanvas')
 // const offcanvas = Offcanvas.getInstance(element)

//offcanvas.hide()

/*setTimeout(() => {
  router.push('/checkout')
}, 300)*/

cart.closeCart()

router.push('/checkout')

/*  if (offcanvas) {
    element.addEventListener(
      'hidden.bs.offcanvas', () => {
        router.push('/checkout')
      },
      { once: true }
    )
    offcanvas.hide()
  } else {
    router.push('/checkout')
  }*/
}


import { watch } from 'vue'

watch(
  () => cart.isOpen,
  (open) => {

    document.body.style.overflow = open ? 'hidden' : ''

  }
)
</script>

<style>
/*.cart-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,.45);
    z-index: 1050;
    display: flex;
    justify-content: flex-end;
}

.offcanvas-panel {
    width: 420px;
    max-width: 100%;
    height: 100%;
    background: white;
    overflow-y: auto;
}*/

.cart-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1055;

  display: flex;
  justify-content: flex-end;

  background: rgba(0,0,0,.45);
}

.cart-panel {

  width: 420px;
  max-width: 100%;

  height: 100vh;

  background: white;

  display: flex;
  flex-direction: column;

  overflow: hidden;
}


.cart-header{

    padding:1rem;

    border-bottom:1px solid #ddd;

    display:flex;

    justify-content:space-between;

    align-items:center;

    flex-shrink:0;

}

.cart-body{

    flex:1;

    overflow-y:auto;

    padding:1rem;

}

.cart-footer{

    padding:1rem;

    border-top:1px solid #ddd;

    background:white;

    flex-shrink:0;

}

.drawer-enter-active,
.drawer-leave-active{

    transition:all .3s ease;

}

.drawer-enter-from{

    opacity:0;

}

.drawer-leave-to{

    opacity:0;

}

.drawer-enter-from .cart-panel{

    transform:translateX(100%);

}

.drawer-leave-to .cart-panel{

    transform:translateX(100%);

}

</style>