import { createSharedComposable, useLocalStorage } from "@vueuse/core";
import { openai } from "../api/openai";
import { genOutlineBySubjectPrompt, iterationModifyOutlinePrompt } from '../utils/prompt/outline'
import { normalizeGpt2Outline } from "@renderer/utils/transform/outline";
import { Outline, OutlineStore } from "@renderer/types/outline";
import { ref } from "vue";
import { ChatStore, Role } from "@renderer/types/chat";
import { normalizeSession2Gpt } from "@renderer/utils/transform/common";
import { nanoid } from 'nanoid'
import { normalizeSlidev2Markdown } from "@renderer/utils/transform/slidev";
import { toolSession } from "@renderer/utils/ai/session";
import { genSingleSlidevPrompt } from "@renderer/utils/prompt/slidev";
import { useIpcEmit } from "@renderer/composables";
import { webcontainerFs } from "@main/webcontainer";

export const useAiStore = createSharedComposable(() => {
  const loading = ref<boolean>(false)
  const preset = ref<string[]>([])
  const activityId = ref<string>(nanoid())
  const outline = useLocalStorage<OutlineStore>('outline', {
    version: 1,
    session: [],
    title: '',
    content: [],
  })
  const chat = ref<ChatStore>({
    version: 1,
    session: [],
    content: [],
  })

  function resetOutline() {
    outline.value = {
      version: 1,
      session: [],
      title: '',
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


  async function sendToolSession(message: string) {
    await toolSession(message, chat.value.session, {
      tool: true,
    })
    save()
  }

  async function genContent() {
    let init = true
    let count = 0
    const len = outline.value.content
    for (const item of outline.value.content) {
      const res = await toolSession(genSingleSlidevPrompt(item.title, `${count + 1}/${len}`), chat.value.session, {
        tool: true,
        init,
        initTitle: outline.value.title,
        preset: preset.value[0],
        role: Role.System,
      })
      init && (init = false)
      chat.value.content.push(...res)
      count++
      // 不建议放开超过3，消耗 token 太大
      if (count >= 2)
        break
    }
    save()
  }

  async function usePreset() {
    // eslint-disable-next-line no-undef
    const files = import.meta.glob('/src/assets/preset/*.md', {
      query: '?raw',
      import: 'default',
    })
    const keys = Object.keys(files)
    for (const key of keys) {
      const content = await files[key]() as string
      preset.value.push(content)
    }
  }


  async function save() {
    await useIpcEmit.fileManager('write', {
      fileName: activityId.value + '.json',
      content: JSON.stringify({
        ...outline.value,
        ...chat.value,
      }),
      dirName: 'json',
    })
    await webcontainerFs().writeFile('slides.md', normalizeSlidev2Markdown(chat.value.content), { encoding: 'utf-8' })
  }

  usePreset()

  return {
    activityId,
    initOutlineContent,
    outline,
    modifyOutlineContent,
    chat,
    loading,
    usePreset,
    preset,
    sendToolSession,
    genContent
  }
})
