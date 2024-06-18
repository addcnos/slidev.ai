import { ref } from 'vue'
import { ChatSessionContext, ChatStore, Role } from '@renderer/types/chat'
import { nanoid } from 'nanoid'
import { genSingleSlidevPrompt, initSlidevPrompt, initUsePreset } from '@renderer/utils/prompt/slidev'
import { createSharedComposable, useDebounceFn } from "@vueuse/core";
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
  const updateCapturePage = ref(false)
  const chat = ref<ChatStore>({
    session: [],
    content: [],
    page: {},
  })


  function initPrompt(theme: string) {
    pushSession({ content: initUsePreset() })
    pushSession({ content: initSlidevPrompt(theme) })
  }

  async function initSlidevContent() {
    const { outline } = useOutlineStore()

    initPrompt(outline.value.title)
    const len = outline.value.content.length

    for (let idx = 0; idx < len; idx++) {
      const item = outline.value.content[idx];

      const _json = await sendSession(
        genSingleSlidevPrompt(item.title, `${idx + 1}/${len}`),
        { completeText: idx + 1 === len ? '好的，已经处理了！请查收！' : `快好了，${idx + 1}/${len}...`, role: Role.System }
      )

      chat.value.content.push(..._json)

      updateJSONCache()

      if (idx >= 1)
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
      promptFunc,
      role,
      completeText,
    }: { promptFunc?: any; role?: Role, completeText?: string } = {}
  ) {
    const current = chat.value.page.nav.currentPage
    pushSession({
      role: role || Role.User,
      content: promptFunc ? promptFunc(current, message) : message
    })
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

    if (promptFunc) {
      // 把当前页的内容替换为新的内容
      chat.value.content.splice(current - 1, 1, ...await normalizeSlidev2Json(result.choices[0].message.content))
      updateJSONCache()
      return
    }

    return await normalizeSlidev2Json(result.choices[0].message.content)
  }

  async function updateJSONCache(skip = false) {
    const { outline } = useOutlineStore()

    !skip && await useIpcEmit.fileManager('write', {
      fileName: activityId.value + '.json',
      content: JSON.stringify({
        outline: outline.value,
        chat: chat.value,
        createTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        id: activityId.value,
      }),
      dirName: 'json',
    })

    await syncMarkdown()

    updateCapturePage.value = true

    console.log(normalizeSlidev2Markdown(chat.value.content))
  }

  async function syncMarkdown() {
    await webcontainerFs().writeFile(
      'slides.md',
      normalizeSlidev2Markdown(chat.value.content),
      { encoding: 'utf-8' }
    )
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
  }
})
