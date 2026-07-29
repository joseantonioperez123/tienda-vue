import { defineStore } from 'pinia'

export const useOrderStore = defineStore('order', {
    state: () => ({ lastOrder: null }),
    actions: {
        saveOrder(order) { this.lastOrder = order },
        clearOrder() { this.lastOrder = null },
        async processOrder(order) {
            // 1. Guardar pedido
            await this.saveOrder(order)
            // 2. Procesar pago
            switch (order.paymentMethod) {
                case 'tarjeta':
                    await this.processCardPayment(order)
                    break
                case 'paypal':
                    await this.processPaypalPayment(order)
                    break
                case 'transferencia':
                    await this.processBankTransfer(order)
                    break
            }
        },
        async processCardPayment(order) {
            await new Promise(r => setTimeout(r,1000))
            order.paymentStatus = 'paid'
            order.status = 'paid'
        },
        async processPaypalPayment(order) {
            await new Promise(r => setTimeout(r,1000))
            order.paymentStatus = 'paid'
            order.status = 'paid'
        },
        async processBankTransfer(order) {
            order.paymentStatus = 'pending'
            order.status = 'waiting_transfer'
        }
    }
})

