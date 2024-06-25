import { ref, computed } from "vue";
import { GPT_MODEL, openai } from "@renderer/api/openai";
import { createSharedComposable, useLocalStorage } from "@vueuse/core";
import { Outline, OutlineStore } from "@renderer/types/outline";
import { Role } from "@renderer/types/chat";
import { genOutlineBySubjectPrompt, iterationModifyOutlinePrompt } from "@renderer/utils/prompt/outline";
import { normalizeSession2Gpt } from "@renderer/utils/transform/common";
import { normalizeGpt2Outline } from "@renderer/utils/transform/outline";
import { nanoid } from "nanoid";


export const useOutlineStore = createSharedComposable(() => {
  const visible = ref<boolean>(false)
  const theme = useLocalStorage<string>('苏州旅游计划', '') // 大纲标题
  const count = ref<number>(10) // 大纲数量
  const loading = ref(false)

  const outline = useLocalStorage<OutlineStore>('outline', { // 开发阶段，保持缓存，避免重复请求
    session: [],
    title: '',
    content: [],
  })

  const outlineCount = computed(() => getTreeCount(outline.value.content))

  // const outline = ref<OutlineStore>({
  //   session: [],
  //   title: '',
  //   content: [],
  // })

  function resetOutline() {
    outline.value = {
      session: [],
      title: '',
      content: [],
    }
  }

  async function initOutlineContent(subject: string) {
    loading.value = true
    const prompt = genOutlineBySubjectPrompt(subject)
    resetOutline()
    outline.value.session.push({
      role: Role.System,
      timestamp: +Date.now(),
      content: prompt,
      id: nanoid(),
    })
    const completion = await openai.chat.completions.create({
      model: GPT_MODEL,
      messages: normalizeSession2Gpt(outline.value.session),
      response_format: {
        type: 'json_object',
      }
    });
    loading.value = false
    outline.value.session.push({
      role: Role.Gpt,
      timestamp: +Date.now(),
      content: completion.choices[0].message.content,
      source: completion.choices[0],
      id: nanoid(),
    })
    outline.value.content = normalizeGpt2Outline(completion.choices[0].message.content)
  }

  function getTreeCount(tree: Outline[]) {
    let count = 0
    tree.forEach((item) => {
      count++
      if (item.children) {
        count += getTreeCount(item.children)
      }
    })
    return count
  }

  return {
    visible,
    count,
    theme,
    loading,
    outline,
    outlineCount,
    initOutlineContent,
  }
})
