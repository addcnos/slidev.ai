import { ref } from "vue";
import { createSharedComposable } from "@vueuse/core";


export const useOutlineStore = createSharedComposable(() => {
  const visible = ref<boolean>(true)
  const theme = ref<string>('') // 大纲标题
  const count = ref<number>(10) // 大纲数量

  return {
    visible,
    count,
    theme,
  }
})
