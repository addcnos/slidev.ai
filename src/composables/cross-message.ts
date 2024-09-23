import { useChatSession } from '@renderer/store'
import { createSharedComposable } from '@vueuse/core'
import { ref } from 'vue'
import { normalizeSlidev2Json, normalizeSlidev2Markdown, CROSS_COMPONENT } from '@renderer/utils/transform/slidev';
import { webcontainerFs } from '@main/webcontainer';

export const useCrossMessage = createSharedComposable(() => {
  const iframeRef = ref()
  const { chat, updateJSONCache } = useChatSession()

  function subscribe() {
    window.addEventListener('message', async (value) => {
      try {
        const data = JSON.parse(value.data)
        chat.value.page = data.data
        if (data.type === 'update') {
          chat.value.content = await normalizeSlidev2Json(await webcontainerFs().readFile('slides.md', 'utf-8'))
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
