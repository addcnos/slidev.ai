import { ref } from 'vue'
import { ChatSessionContext, ChatStore, Role } from '@renderer/types/chat'
import { nanoid } from 'nanoid'
import { genSingleSlidevPrompt, initSlidevPrompt, initUsePreset } from '@renderer/utils/prompt/slidev'
import { createSharedComposable, useDebounceFn } from "@vueuse/core";
import { GPT_MODEL, openai } from "@renderer/api/openai";
import { tools } from "@renderer/utils/ai/tools";
import { normalizeSession2Gpt } from '@renderer/utils/transform/common';
import { normalizeSlidev2Json, normalizeSlidev2Markdown } from '@renderer/utils/transform/slidev';
import { useOutlineStore } from './useOutlineStore';
import { useIpcEmit } from "@renderer/composables";
import { webcontainerFs } from "@main/webcontainer";
import dayjs from 'dayjs'
import { Outline } from '@renderer/types/outline';
import { ChatCompletion } from 'openai/resources';


export const useChatSession = createSharedComposable(() => {
  const activityId = ref<string>(nanoid())
  const updateCapturePage = ref(false)
  const initLoading = ref(false)
  const chat = ref<ChatStore>({
    session: [],
    content: [],
    page: {},
    imageStyle: '卡通',
    waitImage: [],
  })

  function resetSession() {
    updateActivityId(nanoid())
    chat.value = {
      session: [],
      content: [],
      page: {},
      imageStyle: '卡通',
      waitImage: [],
    }
  }


  function initPrompt(theme: string) {
    // pushSession({ content: initUsePreset() })
    pushSession({ content: initSlidevPrompt(theme) })
  }

  async function initSlidevContent() {
    const { outline } = useOutlineStore()
    resetSession()

    initPrompt(outline.value.title)
    const flatOutline = (outline: Outline[]): Outline[] => outline.flatMap(item => [item, ...flatOutline(item.children || [])])
    const allOutline = flatOutline(outline.value.content)
    const len = allOutline.length
    try {
      initLoading.value = true
      for (let idx = 0; idx < len; idx++) {
        const item = allOutline[idx];

        const _json = await sendSession(
          genSingleSlidevPrompt(`${idx + 1}`, item.title),
          {
            completeText: idx + 1 === len ? '好的，已经处理了！请查收！' : `快好了，${idx + 1}/${len}...`,
            role: Role.System,
          }
        )

        chat.value.content.push(..._json)

        updateJSONCache()

        if (idx >= 4) {
          break
        }
      }
    } finally {
      initLoading.value = false
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
      promptFunc,
      insert,
      role,
      completeText,
    }: {
      promptFunc?: (...args: unknown[]) => string,
      role?: Role,
      completeText?: string,
      insert?: boolean
    } = {}
  ) {
    const current = chat.value?.page?.nav?.currentPage || 1
    pushSession({
      role: role || Role.User,
      content: message,
      source: {
        message: {
          content: promptFunc ? promptFunc(current, message, await normalizeSlidev2Markdown([chat.value.content[current - 1]])) : message,
        }
      } as ChatCompletion.Choice
    })
    const func = variableSession({ role: Role.Gpt, content: '处理中...' })

    const runner = await openai.beta.chat.completions.runTools({
      model: GPT_MODEL,
      tools,
      messages: normalizeSession2Gpt(chat.value.session),
      temperature: 0.2,
    })

    const result = await runner.finalChatCompletion();

    func({
      content: completeText || '好的，已经处理了！请查收！',
      source: result.choices[0],
    })
    const content = result.choices[0].message.content
    if (promptFunc) {
      if (insert) {
        chat.value.content.splice(current - 1, 0, ...await normalizeSlidev2Json(content + '\n'))
      }
      else {
        chat.value.content.splice(current - 1, 1, ...await normalizeSlidev2Json(content + '\n'))
      }
      updateJSONCache()
      return
    }

    updateJSONCache()
    return await normalizeSlidev2Json(content + '\n')
  }

  async function updateJSONCache(skip = false) {
    const { outline } = useOutlineStore()

    !skip && await useIpcEmit.fileManager('write', {
      fileName: activityId.value + '.json',
      content: JSON.stringify({
        outline: outline.value,
        chat: { ...chat.value, waitImage: [] },
        createTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        id: activityId.value,
      }),
      dirName: 'json',
    })

    await syncMarkdown()

    updateCapturePage.value = true

    console.log(normalizeSlidev2Markdown(chat.value.content))
    console.log(chat.value)
  }

  async function syncMarkdown() {
    try {
      await webcontainerFs().writeFile(
        'slides.md',
        normalizeSlidev2Markdown(chat.value.content),
        { encoding: 'utf-8' }
      )
    } catch (e) {
      console.log(e, 'syncMarkdown error')
    }

  }

  function updateActivityId(id: string) {
    activityId.value = id
    useIpcEmit.updateActiveId(id)
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
    updateJSONCache,
    syncMarkdown: useDebounceFn(syncMarkdown, 1000),
    updateActivityId,
    resetSession,
    initLoading,
  }
})
