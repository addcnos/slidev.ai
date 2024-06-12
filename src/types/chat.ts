import { SourceSlideInfo } from "@slidev/types"
import { ChatCompletion } from "openai/resources/chat/completions"

/**
 * 对话角色
 */
export enum Role {
  /** 系统 */
  System = 'system',
  /** 用户 */
  User = 'user',
  /** GPT */
  Gpt = 'assistant',
  /** 工具 */
  Tool = 'tool',
}

export interface GptSessionContext {
  /** 角色 */
  role: Role
  /** 时间戳 */
  timestamp: number
  /** 内容 */
  content: string
  /** 源内容 */
  source?: ChatCompletion.Choice
  /** ID */
  id: string
  /** 加载中 */
  loading?: boolean
}

export enum FlowOperate {
  /** 预设模板 */
  Preset,
  /** 初始化 */
  Init,
  /** 样式 */
  Style,
  /** 翻译 */
  Translate,
  /** 扩写 */
  Expand,
  /** 润色 */
  Polish,
  /** 补充 */
  Supplement,
  /** 图片 */
  Picture,
  /** 互动 */
  Interaction,
}

export interface ChatSessionContext extends GptSessionContext {
  /** 操作 */
  operate?: FlowOperate
}

export interface ChatStore {
  session: ChatSessionContext[]
  content: SourceSlideInfo[]
  page: any
}
