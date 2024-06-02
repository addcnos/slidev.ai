export interface Outline {
  /** 标题 */
  title: string;
  /** 顺序 */
  order: number;
  /** 子节点 */
  children: Outline[];
}
