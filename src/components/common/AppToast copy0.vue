<template>
  <div
    class="toast-container position-fixed top-0 end-0 p-3"
    style="z-index: 2000"
  >
    <div
      ref="toastElement"
      class="toast align-items-center text-bg-success border-0"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="d-flex">
        <div class="toast-body" :class="`text-bg-${toast.type}`">
          {{ toast.message }}
        </div>
        <button
          type="button"
          class="btn-close btn-close-white me-2 m-auto"
          data-bs-dismiss="toast"
        ></button>
      </div>
    </div>
  </div>
</template>

<script setup>

import { ref, watch, onMounted } from 'vue'
import * as bootstrap from 'bootstrap'

import { useToastStore } from '../../stores/toast'

const toast = useToastStore()

const toastElement = ref(null)

let bsToast

onMounted(() => {
  bsToast = new bootstrap.Toast(toastElement.value, {
    delay: 2500
  })
  toastElement.value.addEventListener(
    'hidden.bs.toast',
    () => { toast.hide() }
  )
})

watch(
  () => toast.visible,
  visible => { if (visible) { bsToast.show() } }
)

</script>