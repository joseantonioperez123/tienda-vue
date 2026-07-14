<template>
<div class="container py-5">
    <div v-if="order"
            class="card shadow mx-auto"
            style="max-width:900px">
        <div class="card-body">
            <div class="text-center mb-4">
                <div class="display-2 text-success">
                    ✅
                </div>
                <h1>
                    ¡Pedido realizado!
                </h1>
                <p class="lead">
                    Gracias por su compra.
                </p>
            </div>
            <hr>
            <div class="row">
                <div class="col-md-6">
                    <h5>Pedido</h5>
                    <p><strong>Número:</strong> {{ order.number }}</p>
                    <p>
                        <strong>Fecha:</strong>
                        {{ order.date.toLocaleString() }}
                    </p>
                </div>
                <div class="col-md-6">
                    <h5>Cliente</h5>
                    <p>
                        {{ order.customer.nombre }}
                        {{ order.customer.apellidos }}
                    </p>
                    <p>{{ order.customer.email }}</p>
                </div>
            </div>
            <hr>
            <h5 class="mb-3">
                Productos
            </h5>
            <table class="table">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th class="text-end">
                            Importe
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in order.items"
                            :key="item.product.id">
                        <td>
                            {{ item.product.nombre }}
                        </td>
                        <td>
                            {{ item.quantity }}
                        </td>
                        <td class="text-end">
                            {{ item.product.precio * item.quantity }} €
                        </td>
                    </tr>
                </tbody>
            </table>
            <hr>
            <div class="text-end">
                <h4>
                    Total:
                    {{ order.total }} €
                </h4>
            </div>
            <router-link to="/productos"
                    class="btn btn-primary mt-3">
                Seguir comprando
            </router-link>
        </div>
    </div>
</div>
</template>

<script setup>

import { useOrderStore } from '../stores/order'

const orderStore = useOrderStore()

const order = orderStore.lastOrder

import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
    if (!orderStore.lastOrder) {
        /* replace en lugar de push evita que se pueda volver a la página */
        router.replace('/productos')
    }
})

</script>