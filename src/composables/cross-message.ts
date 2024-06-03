import { createSharedComposable } from '@vueuse/core'
import { ref } from 'vue'

export const useCrossMessage = createSharedComposable(() => {
  const iframeRef = ref()

  function subscribe() {
    window.addEventListener('message', (value) => {
      // todo: handle message
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
