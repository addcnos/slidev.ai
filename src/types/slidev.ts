export enum SlidevBlockType {
  Header,
  Block,
  CrossComponent
}

export interface SlidevBlock {
  type: SlidevBlockType
  content: string
}
