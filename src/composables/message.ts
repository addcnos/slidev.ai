import { createSharedComposable } from '@vueuse/core'
import { ref } from 'vue'

export const useMessage = createSharedComposable(() => {
  const extend = ref(true)

  return {
    extend,
  }
})
