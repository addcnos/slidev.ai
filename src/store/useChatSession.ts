import { ref } from 'vue'
import { ChatSessionContext, ChatStore, Role } from '@renderer/types/chat'
import { nanoid } from 'nanoid'
import { genSingleSlidevPrompt, initSlidevPrompt, initUsePreset } from '@renderer/utils/prompt/slidev'
import { createSharedComposable } from "@vueuse/core";
import { openai } from "@renderer/api/openai";
import { tools } from "@renderer/utils/ai/tools";
import { normalizeSession2Gpt } from '@renderer/utils/transform/common';
import { normalizeSlidev2Json, normalizeSlidev2Markdown } from '@renderer/utils/transform/slidev';
import { useOutlineStore } from './useOutlineStore';
import { useIpcEmit } from "@renderer/composables";
import { webcontainerFs } from "@main/webcontainer";
import dayjs from 'dayjs'


export const useChatSession = createSharedComposable(() => {
  const activityId = ref<string>(nanoid())
  const preset = ref<string[]>([])
  const updateCapturePage = ref(false)
  const chat = ref<ChatStore>({
    session: [],
    content: [],
  })

  async function initPreset() {
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

  initPreset()

  function initPrompt(theme: string, presetIdx?: number) {
    preset !== undefined && pushSession({ content: initUsePreset(preset.value[presetIdx]) })
    pushSession({ content: initSlidevPrompt(theme) })
  }

  async function initSlidevContent() {
    const { outline } = useOutlineStore()

    initPrompt(outline.value.title, 0)
    const len = outline.value.content.length

    for (let idx = 0; idx < len; idx++) {
      const item = outline.value.content[idx];

      const _json = await sendSession(
        genSingleSlidevPrompt(item.title, `${idx + 1}/${len}`),
        { completeText: idx + 1 === len ? '好的，已经处理了！请查收！' : `快好了，${idx + 1}/${len}...`, role: Role.System }
      )

      chat.value.content.push(..._json)

      updateJSONCache()

      if (idx >= 2)
        break

    }
  }

  function pushSession(context: Partial<ChatSessionContext>) {
    chat.value.session.push({
      timestamp: +Date.now(),
      id: nanoid(),
      role: Role.System,
      ...context,
    } as ChatSessionContext)
    return chat.value.session.length - 1
  }

  function variableSession(context: Partial<ChatSessionContext>) {
    const idx = pushSession({
      loading: true,
      ...context,
    })
    return (context: Partial<ChatSessionContext>) => Object.assign(chat.value.session[idx], {
      loading: false,
      ...context
    })
  }

  async function sendSession(
    message: string,
    {
      role,
      completeText,
    }: { role?: Role, completeText?: string } = {}
  ) {
    pushSession({ role: role || Role.User, content: message })
    const func = variableSession({ role: Role.Gpt, content: '处理中...' })

    const runner = await openai.beta.chat.completions.runTools({
      model: 'gpt-4o',
      tools,
      messages: normalizeSession2Gpt(chat.value.session),
    })

    const result = await runner.finalChatCompletion();

    func({
      content: completeText || '好的，已经处理了！请查收！',
      source: result.choices[0],
    })

    return await normalizeSlidev2Json(result.choices[0].message.content)
  }

  async function updateJSONCache() {
    const { outline } = useOutlineStore()

    updateCapturePage.value = true

    await useIpcEmit.fileManager('write', {
      fileName: activityId.value + '.json',
      content: JSON.stringify({
        ...outline.value,
        ...chat.value,
        createTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        id: activityId.value,
      }),
      dirName: 'json',
    })

    await webcontainerFs().writeFile(
      'slides.md',
      normalizeSlidev2Markdown(chat.value.content),
      { encoding: 'utf-8' }
    )

    console.log(normalizeSlidev2Markdown(chat.value.content))
  }

  return {
    chat,
    pushSession,
    variableSession,
    initPrompt,
    sendSession,
    initSlidevContent,
    activityId,
    updateCapturePage,
  }
})
