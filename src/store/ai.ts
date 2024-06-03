import { createSharedComposable } from "@vueuse/core";
import { openai } from "../api/openai";
import { ref } from "vue";
import { genOutlineBySubjectPrompt } from '../utils/prompt/outline'
import axios from "axios";
axios.defaults.baseURL = 'http://localhost:3030'

export const useAiStore = createSharedComposable(() => {
  const currentCtx = ref<string>('')

  async function initOutlineContent(subject: string) {
    // const completion = await openai.chat.completions.create({
    //   model: 'gpt-4o',
    //   messages: [{ role: 'user', content: genOutlineBySubjectPrompt(subject) }],
    // });
    const completion = await axios.post('/proxy/openai')
    console.log(completion);
  }

  initOutlineContent('如何学习日语')

  return {
    currentCtx,
    initOutlineContent,
  }
})
