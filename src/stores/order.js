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
      const orderId = await this.saveOrder(order)
      const paymentResult = await paymentService.pay(order)
      await this.updateOrder(orderId, {
        paymentId: paymentResult.paymentId,
        paymentMethod: paymentResult.paymentMethod,
        paymentStatus: paymentResult.paymentStatus,
        status: paymentResult.orderStatus
      })
      this.lastOrder = {
        id: orderId,
        ...order,
        paymentId: paymentResult.paymentId,
        paymentMethod: paymentResult.paymentMethod,
        paymentStatus: paymentResult.paymentStatus,
        status: paymentResult.orderStatus
      }
      return this.lastOrder
    },
    async saveOrder(order) {
        return await createOrder(order)
    },
    async updateOrder(orderId, data) {
        await updateOrderInFirestore(orderId, data)
    }
  }
})