import { createSharedComposable } from "@vueuse/core";
import { openai } from "../api/openai";
import { ref } from "vue";
import { genOutlineBySubjectPrompt } from '../utils/prompt/outline'


export const useAiStore = createSharedComposable(() => {
  const currentCtx = ref<string>('')

  async function initOutlineContent(subject: string) {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: genOutlineBySubjectPrompt(subject) }],
    });
    console.log(completion);
  }

  initOutlineContent('如何学习日语')

  return {
    currentCtx,
    initOutlineContent,
  }
})
