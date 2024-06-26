import { GptSessionContext, Role } from "@renderer/types/chat";
import { ChatCompletion } from "openai/resources/chat/completions";

export function normalizeSession2Gpt(session: GptSessionContext[]) {
  return session.filter((item) => {
    if (item.content.includes('处理中')) {
      return false
    }
    return true
  }).map((item) => ({
    role: item.role,
    content: item.source?.message?.content || item.content,
  }) as ChatCompletion.Choice['message'])
}
