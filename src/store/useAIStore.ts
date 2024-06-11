import { createSharedComposable, useLocalStorage } from "@vueuse/core";
import { ref } from "vue";
import { nanoid } from 'nanoid'
import { normalizeSlidev2Markdown } from "@renderer/utils/transform/slidev";
import { useIpcEmit } from "@renderer/composables";
import { webcontainerFs } from "@main/webcontainer";
import { useChatSession } from "./useChatSession";
import { useOutlineStore } from "./useOutlineStore";

export const useAiStore = createSharedComposable(() => {
  const activityId = ref<string>(nanoid())

  const {
    outline
  } = useOutlineStore()

  const {
    chat,
  } = useChatSession()

  async function save() {
    await useIpcEmit.fileManager('write', {
      fileName: activityId.value + '.json',
      content: JSON.stringify({
        ...outline.value,
        ...chat.value,
      }),
      dirName: 'json',
    })
    await webcontainerFs().writeFile(
      'slides.md',
      normalizeSlidev2Markdown(chat.value.content),
      { encoding: 'utf-8' }
    )
  }

  return {
    activityId,
  }
})
