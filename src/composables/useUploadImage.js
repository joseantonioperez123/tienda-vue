import { ref } from 'vue'

export function useUploadImage() {
  const uploading = ref(false)
  async function execute(task) {
    uploading.value = true
    try {
      return await task()
    }
    finally {
      uploading.value = false
    }
  }
  return { uploading, execute }
}