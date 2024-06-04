import { Outline } from "../../types/outline"


export function stringifyOutline(outline: Outline[]): string {
  // 生成 Markdown 格式的大纲
  let result = '';
  function dfs(outline: Outline, level: number) {
    result += `${'  '.repeat(level)}- ${outline.order} ${outline.title}${outline.expanded ? ' <!-- 扩写 -->' : ''}\n`;
    outline.children.forEach(child => dfs(child, level + 1));
  }
  outline.forEach(item => dfs(item, 0));
  return result;
}

/**
 * 标准化GPT生成的大纲，输出给用户
 * @param outline 
 */
export function normalizeGpt2Outline(outline: string): Outline[] {
  return JSON.parse(outline.replace('\n', ''));
}

