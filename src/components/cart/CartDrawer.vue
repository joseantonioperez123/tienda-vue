

<template>
<Transition name="drawer">
  <div v-if="cart.isOpen" class="cart-backdrop"
            @click.self="cart.closeCart()">
    <aside class="cart-panel">
        <!-- Cabecera -->
        <header class="cart-header">
            <h5>Mi carrito</h5>
            <button class="btn-close" @click="cart.closeCart()"></button>
        </header>
    
        <!-- Productos -->
        <main class="cart-body">
            <p v-if="cart.items.length==0">
                El carrito está vacío.
            </p>
            <div v-else>
                <CartItem
                    v-for="item in cart.items"
                    :key="item.product.id"
                    :item="item"/>
                <hr>
            </div>
        </main>
        <!-- Total -->
        <CartSummary @checkout="goToCheckout"/>
    </aside>
</div>

</Transition>
</template>


<script setup>
import CartItem from './CartItem.vue'
import CartSummary from './CartSummary.vue'
import { useCartStore } from '../../stores/cart'

const cart=useCartStore()

import { useRouter } from 'vue-router'

const router = useRouter()

function goToCheckout() {
    cart.closeCart()
    router.push('/checkout')
}

import { watch } from 'vue'

watch(
  () => cart.isOpen,
  (open) => { document.body.style.overflow = open ? 'hidden' : '' }
)
</script>

<style>

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