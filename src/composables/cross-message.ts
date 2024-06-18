import { useChatSession } from '@renderer/store'
import { createSharedComposable } from '@vueuse/core'
import { ref } from 'vue'

export const useCrossMessage = createSharedComposable(() => {
  const iframeRef = ref()

  function subscribe() {
    window.addEventListener('message', (value) => {
      try {
        useChatSession().chat.value.page = JSON.parse(value.data).data
      } catch (_) {
        // TOOD
      }
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
