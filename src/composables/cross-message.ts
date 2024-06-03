import { createSharedComposable } from '@vueuse/core'
import { ref } from 'vue'

export const useCrossMessage = createSharedComposable(() => {
  const iframeRef = ref()

  function subscribe() {
    window.addEventListener('message', (value) => {
      console.log('123', value)
    })
  }

  function messageToIframe(message: any) {
    iframeRef.value?.contentWindow?.postMessage(message, '*')
  }

  return {
    iframeRef,
    subscribe,
    messageToIframe,
  }
})
