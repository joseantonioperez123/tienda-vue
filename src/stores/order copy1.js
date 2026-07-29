import { defineStore } from 'pinia'

import {
  createOrder,
  updateOrder as updateOrderInFirestore
} from '../services/orderService'

import * as paymentService from '../services/payment/paymentService'

export const useOrderStore = defineStore('order', {

  state: () => ({
    lastOrder: null
  }),
  actions: {
    async processOrder(order) {
      // 1. Guardar pedido
      //await this.saveOrder(order)
      const orderId = await this.saveOrder(order)
      // 2. Procesar el pago
      /*let paymentResult
      switch (order.paymentMethod) {
        case 'tarjeta':
          paymentResult = await this.processCardPayment(order)
          break
        case 'paypal':
          paymentResult = await this.processPaypalPayment(order)
          break
        case 'transferencia':
          paymentResult = await this.processBankTransfer(order)
          break
      }*/
     const paymentResult = await paymentService.pay(order)
      /*await this.updateOrder(orderId, {
        paymentStatus: paymentResult.paymentStatus,
        status: paymentResult.status
    })*/
   /*await this.updateOrder(orderId, {
    paymentId: paymentResult.paymentId,
    paymentMethod: paymentResult.paymentMethod,
    paymentStatus: paymentResult.status,
    status: paymentResult.status
})*/
await this.updateOrder(orderId, {

    paymentId: paymentResult.paymentId,

    paymentMethod: paymentResult.paymentMethod,

    paymentStatus: paymentResult.paymentStatus,

    status: paymentResult.orderStatus

})
      // 3. Actualizar el pedido con el resultado del pago
//      order.paymentStatus = paymentResult.paymentStatus
  //    order.status = paymentResult.status
      // 4. Guardarlo para OrderSuccessView
      //this.lastOrder = order
      //return order
      /*this.lastOrder = {
    id: orderId,
    ...order,
    paymentStatus: paymentResult.paymentStatus,
    status: paymentResult.status
}*/
  this.lastOrder = {
    id: orderId,
    ...order,
    paymentId: paymentResult.paymentId,
    paymentMethod: paymentResult.paymentMethod,
    //paymentStatus: paymentResult.status,
    //status: paymentResult.status
    paymentStatus: paymentResult.paymentStatus,

status: paymentResult.orderStatus
}

return this.lastOrder
    },
/*    async processCardPayment(order) {
      await new Promise(r => setTimeout(r, 1000))
      return {
        paymentStatus: 'paid',
        status: 'paid'
      }
    },
    async processPaypalPayment(order) {
      await new Promise(r => setTimeout(r, 1000))
      return {
        paymentStatus: 'paid',
        status: 'paid'
      }
    },
    async processBankTransfer(order) {
      return {
        paymentStatus: 'pending',
        status: 'waiting_transfer'
      }
    },*/
    async saveOrder(order) {

        return await createOrder(order)

    },

    async updateOrder(orderId, data) {

        await updateOrderInFirestore(orderId, data)

    }
  }
})