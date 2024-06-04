import { ref } from "vue";
import { createSharedComposable } from "@vueuse/core";


export const useOutlineStore = createSharedComposable(() => {
  const visible = ref<boolean>(false)

  // const outlineTree =

  return {
    visible,
  }
})
