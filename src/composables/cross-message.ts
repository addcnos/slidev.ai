import { useChatSession } from '@renderer/store'
import { createSharedComposable } from '@vueuse/core'
import { ref } from 'vue'

export const useCrossMessage = createSharedComposable(() => {
  const iframeRef = ref()
  const { chat, updateJSONCache } = useChatSession()

  function subscribe() {
    window.addEventListener('message', (value) => {
      try {
        const data = JSON.parse(value.data)
        chat.value.page = data.data
        if (data.type === 'update') {
          chat.value.content = data.nav.slides.map((i: any) => i.meta.slide)
          updateJSONCache(false, true)
        }
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
