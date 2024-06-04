import { ref } from "vue";
import { createSharedComposable } from "@vueuse/core";


export const useOutlineStore = createSharedComposable(() => {
  const visible = ref<boolean>(false)
  const theme = ref<string>('如何学习日语') // 大纲标题
  const count = ref<number>(10) // 大纲数量

  return {
    visible,
    count,
    theme,
  }
})
