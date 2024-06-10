import { openai } from "@renderer/api/openai";
import { ChatSessionContext, Role } from "@renderer/types/chat";
import { nanoid } from "nanoid";
import { normalizeSession2Gpt } from "../transform/common";
import { normalizeSlidev2Json } from "../transform/slidev";
import { tools } from "./tools";
import { initUsePreset } from "../prompt/slidev";

export async function toolSession(
  message: string,
  session: ChatSessionContext[],
  {
    tool,
    init,
    preset, // 仅在 init 为 true 时生效
  }: { tool?: boolean, init?: boolean, preset?: string } = {}
) {

  if (init) {
    session.splice(0, session.length)
    preset && session.push({
      role: Role.System,
      timestamp: +Date.now(),
      content: initUsePreset(preset),
      id: nanoid(),
    })
  }

  session.push({
    role: Role.User,
    timestamp: +Date.now(),
    content: message,
    id: nanoid(),
    loading: false
  })
  session.push({
    role: Role.Gpt,
    timestamp: +Date.now(),
    content: '处理中...',
    id: nanoid(),
    loading: true
  })

  const runner = await openai.beta.chat.completions.runTools({
    model: 'gpt-4o',
    tools: tool ? tools : undefined,
    messages: normalizeSession2Gpt(session),
  })

  const result = await runner.finalChatCompletion();

  session.pop()
  // TODO 可能要加一个工具消息进入
  session.push({
    role: Role.Gpt,
    timestamp: +Date.now(),
    content: result.choices[0].message.content,
    id: nanoid(),
    source: result.choices[0],
    loading: false
  })

  return await normalizeSlidev2Json(result.choices[0].message.content)
}
