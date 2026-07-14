/* cola de mensajes */

import { defineStore } from 'pinia'

export const useToastStore = defineStore('toast', {
  state: () => ({
    queue: [],
    current: null
  }),
  actions: {
    show(message, type = 'success') {
      this.queue.push({ message, type })
      if (!this.current) {
        this.next()
      }
    },
    next() {
      if (this.queue.length === 0) {
        this.current = null
        return
      }
      this.current = this.queue.shift()
    },
    hide() {
      this.current = null
      this.next()
    }
  }
})