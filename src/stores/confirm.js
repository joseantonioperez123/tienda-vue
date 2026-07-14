import { defineStore } from 'pinia'

export const useConfirmStore = defineStore('confirm', {
  state: () => ({
    visible: false,
    title: '',
    message: '',
    resolve: null
  }),
  actions: {
    open(title, message) {
      this.title = title
      this.message = message
      this.visible = true
      return new Promise(resolve => {
        this.resolve = resolve
      })
    },
    accept() {
      this.visible = false
      this.resolve?.(true)
    },
    cancel() {
      this.visible = false
      this.resolve?.(false)
    }
  }
})