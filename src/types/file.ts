import { SourceSlideInfo } from "@slidev/types"
import { Outline } from "./outline"
import { ChatSessionContext } from "./chat"

/**
 * 流程步骤
 */
export enum FlowStep {
  /** 大纲 */
  Outline,
  /** 内容 */
  Slidev,
}

/**
 * GPT 会话ID
 */
export type SessionName = 'chatId' | 'outlineId'

/**
 * JSON 文件保存内容
 */
export interface JsonFile {
  /** 标题 */
  title: string,
  /** 步骤 */
  step: FlowStep,
  /** 大纲 */
  outline: Outline[]
  /** 会话相关状态 ID */
  session: Record<Partial<SessionName>, string>,
  /** Slidev 内容 */
  content: SourceSlideInfo[],
  /** Chat */
  chat: ChatSessionContext[]
  realContent: string[]
}
