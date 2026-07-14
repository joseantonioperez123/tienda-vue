<!-- Toast realizado con Vue porque con Bootstrap no integra bien -->

<template>
  <div
    v-if="toast.current"
    class="toast-container position-fixed top-0 end-0 p-3"
    style="z-index: 2000"
  >
    <div
      class="toast show border-0"
      :class="'text-bg-' + toast.current.type"
    >
      <div class="d-flex">
        <div class="toast-body">
          {{ toast.current.message }}
        </div>

        <button
          type="button"
          class="btn-close btn-close-white me-2 m-auto"
          @click="close"
        ></button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { useToastStore } from '../../stores/toast'

const toast = useToastStore()

let timer = null

watch(
  () => toast.current,
  current => {
    if (!current) return
    clearTimeout(timer)
    timer = setTimeout(() => {
      toast.hide()
    }, 3000)
  }
)

function close() {
  clearTimeout(timer)
  toast.hide()
}
</script>