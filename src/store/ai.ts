import { createSharedComposable } from "@vueuse/core";
import { openai } from "../api/openai";
import { genOutlineBySubjectPrompt, iterationModifyOutlinePrompt } from '../utils/prompt/outline'
import axios from "axios";
import { normalizeGpt2Outline } from "@renderer/utils/transform/outline";
import { Outline, OutlineStore } from "@renderer/types/outline";
import { ref } from "vue";
import { ChatStore, Role } from "@renderer/types/chat";
import { normalizeSession2Gpt } from "@renderer/utils/transform/common";
axios.defaults.baseURL = 'http://localhost:3030'

export const useAiStore = createSharedComposable(() => {
  const outline = ref<OutlineStore>({
    version: 1,
    session: [],
    content: [],
  })
  const chat = ref<ChatStore>({
    version: 1,
    session: [],
    content: '',
  })

  async function initOutlineContent(subject: string) {
    const prompt = genOutlineBySubjectPrompt(subject)
    outline.value.session = [
      {
        role: Role.System,
        timestamp: +Date.now(),
        content: prompt,
      }
    ]
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: normalizeSession2Gpt(outline.value.session),
    });
    outline.value.session.push({
      role: Role.Gpt,
      timestamp: +Date.now(),
      content: completion.choices[0].message.content,
      source: completion.choices[0],
    })
    outline.value.content = normalizeGpt2Outline(completion.choices[0].message.content)
  }

  async function modifyOutlineContent(modify: Outline[]) {
    const prompt = iterationModifyOutlinePrompt(modify, outline.value.version + 1)
    outline.value.session.push({
      role: Role.System,
      timestamp: +Date.now(),
      content: prompt,
    })
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: normalizeSession2Gpt(outline.value.session),
    });
    outline.value.session.push({
      role: Role.Gpt,
      timestamp: +Date.now(),
      content: completion.choices[0].message.content,
      source: completion.choices[0],
    })
    outline.value.content = normalizeGpt2Outline(completion.choices[0].message.content)
  }

  async function freeSession(message: string) {
    chat.value.session = [{
      role: Role.User,
      timestamp: +Date.now(),
      content: message,
    }]
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages:  normalizeSession2Gpt(chat.value.session),
    });
    chat.value.session.push({
      role: Role.Gpt,
      timestamp: +Date.now(),
      content: completion.choices[0].message.content,
      source: completion.choices[0],
    })
  }

  async function continueFreeSession(message: string) {
    chat.value.session.push({
      role: Role.User,
      timestamp: +Date.now(),
      content: message,
    })
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: normalizeSession2Gpt(chat.value.session),
    });
    chat.value.session.push({
      role: Role.Gpt,
      timestamp: +Date.now(),
      content: completion.choices[0].message.content,
      source: completion.choices[0],
    })
  }


  // initOutlineContent('如何学习日语')
  // freeSession('你好呀')

  return {
    initOutlineContent,
    outline,
    modifyOutlineContent,
    freeSession,
    continueFreeSession,
  }
})
