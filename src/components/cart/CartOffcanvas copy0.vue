<template>

<div
    class="offcanvas offcanvas-end"
    tabindex="-1"
    id="cartOffcanvas">

    <div class="offcanvas-header">
        <h5>
            Mi carrito
        </h5>

        <button class="btn-close"
            data-bs-dismiss="offcanvas"></button>
    </div>

    <div class="offcanvas-body">
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
            <div class="d-flex justify-content-between">
                <strong>Total</strong>
                <strong>
                {{ cart.totalPrice }} €
                </strong>
            </div>
        </div>
        <button v-if="!cart.items.length==0"
            class="btn btn-outline-danger w-100 mt-3"
                    @click="cart.clearCart()">
            Vaciar carrito
        </button>
        <!--<router-link
                to="/checkout"
                class="btn btn-primary w-100 mt-3"
                data-bs-dismiss="offcanvas">
            Finalizar compra
        </router-link>-->
        <button class="btn btn-primary w-100 mt-3"
            @click="goToCheckout">
            Finalizar compra
        </button>
    </div>
</div>

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
  const element = document.getElementById('cartOffcanvas')
 // const offcanvas = Offcanvas.getInstance(element)

//offcanvas.hide()

setTimeout(() => {
  router.push('/checkout')
}, 300)


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
</script>
