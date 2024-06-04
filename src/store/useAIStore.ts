import { createSharedComposable } from "@vueuse/core";
import { openai } from "../api/openai";
import { genOutlineBySubjectPrompt, iterationModifyOutlinePrompt } from '../utils/prompt/outline'
import axios from "axios";
import { normalizeGpt2Outline } from "@renderer/utils/transform/outline";
import { Outline, OutlineStore } from "@renderer/types/outline";
import { ref } from "vue";
import { ChatStore, Role } from "@renderer/types/chat";
import { normalizeSession2Gpt } from "@renderer/utils/transform/common";
import { nanoid } from 'nanoid'
axios.defaults.baseURL = 'http://localhost:3030'

export const useAiStore = createSharedComposable(() => {
  const loading = ref<boolean>(false)
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

  function resetOutline() {
    outline.value = {
      version: 1,
      session: [],
      content: [],
    }
  }

  async function initOutlineContent(subject: string) {
    const prompt = genOutlineBySubjectPrompt(subject)
    resetOutline()
    outline.value.session.push({
      role: Role.System,
      timestamp: +Date.now(),
      content: prompt,
      id: nanoid(),
    })
    loading.value = true
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: normalizeSession2Gpt(outline.value.session),
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

  async function modifyOutlineContent(modify: Outline[]) {
    const prompt = iterationModifyOutlinePrompt(modify, outline.value.version + 1)
    outline.value.session.push({
      role: Role.System,
      timestamp: +Date.now(),
      content: prompt,
      id: nanoid(),
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
      id: nanoid(),
    })
    outline.value.content = normalizeGpt2Outline(completion.choices[0].message.content)
  }

  async function freeSession(message: string) {
    const gptChatId = nanoid()
    const userChatId = nanoid()
    chat.value.session.push({
      role: Role.User,
      timestamp: +Date.now(),
      content: message,
      id: userChatId,
      loading: false
    })
    chat.value.session.push({
      role: Role.Gpt,
      timestamp: +Date.now(),
      content: '处理中...',
      id: gptChatId,
      loading: true
    })
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: normalizeSession2Gpt(chat.value.session),
    });
    chat.value.session.map((item) => {
      if (item.id === gptChatId) {
        item.loading = false
        item.content = completion.choices[0].message.content
        item.source = completion.choices[0]
      }
      return item
    })
  }

  return {
    initOutlineContent,
    outline,
    modifyOutlineContent,
    freeSession,
    chat,
    loading
  }
})

// {
//   "id": "chatcmpl-9WKdj3Y0oyQSPMAzLJGoJPybZ4UM3",
//   "object": "chat.completion",
//   "created": 1717492863,
//   "model": "gpt-4o-2024-05-13",
//   "choices": [
//       {
//           "index": 0,
//           "message": {
//               "role": "assistant",
//               "content": "[\n    {\n        \"title\": \"前言\",\n        \"order\": \"1\",\n        \"children\": []\n    },\n    {\n        \"title\": \"如何学日语\",\n        \"order\": \"2\",\n        \"children\": [\n            {\n                \"title\": \"基础阶段\",\n                \"order\": \"2.1\",\n                \"children\": [\n                    {\n                        \"title\": \"学习五十音图\",\n                        \"order\": \"2.1.1\",\n                        \"children\": []\n                    },\n                    {\n                        \"title\": \"掌握基本语法\",\n                        \"order\": \"2.1.2\",\n                        \"children\": []\n                    },\n                    {\n                        \"title\": \"常用单词和短语\",\n                        \"order\": \"2.1.3\",\n                        \"children\": []\n                    }\n                ]\n            },\n            {\n                \"title\": \"进阶阶段\",\n                \"order\": \"2.2\",\n                \"children\": [\n                    {\n                        \"title\": \"日常会话\",\n                        \"order\": \"2.2.1\",\n                        \"children\": []\n                    },\n                    {\n                        \"title\": \"听力训练\",\n                        \"order\": \"2.2.2\",\n                        \"children\": []\n                    },\n                    {\n                        \"title\": \"阅读练习\",\n                        \"order\": \"2.2.3\",\n                        \"children\": []\n                    }\n                ]\n            },\n            {\n                \"title\": \"高级阶段\",\n                \"order\": \"2.3\",\n                \"children\": [\n                    {\n                        \"title\": \"流利表达\",\n                        \"order\": \"2.3.1\",\n                        \"children\": []\n                    },\n                    {\n                        \"title\": \"商务日语\",\n                        \"order\": \"2.3.2\",\n                        \"children\": []\n                    },\n                    {\n                        \"title\": \"日本文化学习\",\n                        \"order\": \"2.3.3\",\n                        \"children\": []\n                    }\n                ]\n            },\n            {\n                \"title\": \"实践与应用\",\n                \"order\": \"2.4\",\n                \"children\": [\n                    {\n                        \"title\": \"参加语言交流活动\",\n                        \"order\": \"2.4.1\",\n                        \"children\": []\n                    },\n                    {\n                        \"title\": \"观看日语影视作品\",\n                        \"order\": \"2.4.2\",\n                        \"children\": []\n                    },\n                    {\n                        \"title\": \"旅游或居住在日本\",\n                        \"order\": \"2.4.3\",\n                        \"children\": []\n                    }\n                ]\n            }\n        ]\n    },\n    {\n        \"title\": \"结论\",\n        \"order\": \"3\",\n        \"children\": []\n    }\n]"
//           },
//           "logprobs": null,
//           "finish_reason": "stop"
//       }
//   ],
//   "usage": {
//       "prompt_tokens": 461,
//       "completion_tokens": 555,
//       "total_tokens": 1016
//   },
//   "system_fingerprint": "fp_319be4768e"
// }