<template>

<div
    class="toast-container position-fixed top-0 end-0 p-3"
    style="z-index:2000"
>
<!-- cola de mensajes 
  <div
    ref="toastElement"
    class="toast border-0"
    :class="'text-bg-' + toast.current?.type"
>-->
<div
  ref="toastElement"
  class="toast fade border-0"
  :class="toast.current ? 'text-bg-' + toast.current.type : ''"
>
    <div class="d-flex">
        <div class="toast-body">
            {{ toast.current?.message }}
        </div>
        <button
            class="btn-close btn-close-white me-2 m-auto"
            data-bs-dismiss="toast"
        />
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
    bsToast = new bootstrap.Toast(
        toastElement.value,
        {
            delay: 3000
        }
    )
    toastElement.value.addEventListener(
        'hidden.bs.toast',
        () => {
            toast.hide()
        }
    )
})

/*watch(
    () => toast.visible,
    visible => {
        if (visible) {
            bsToast.show()
        }
    }
)*/

/* cola de mensajes */
watch(
  () => toast.current,
  current => {
    console.log('Toast actual:', current)
    if (current) {
      bsToast.show()
    }
  }
)
</script>