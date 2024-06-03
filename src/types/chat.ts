/**
 * 对话角色
 */
export enum Role {
  /** 用户 */
  User,
  /** GPT */
  Gpt,
}

export enum FlowOperate {
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

export interface Message {
  /** 角色 */
  role: Role
  /** 时间戳 */
  timestamp: number
  /** 内容 */
  content: string
  /** 操作 */
  operate?: FlowOperate
}
