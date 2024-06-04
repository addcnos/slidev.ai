import { GptSessionContext } from "@renderer/types/chat";
import { ChatCompletion } from "openai/resources/chat/completions";

export function normalizeSession2Gpt(session: GptSessionContext[]) {
  return session.map((item) => ({
    role: item.role,
    content: item.content,
  }) as ChatCompletion.Choice['message'])
}
