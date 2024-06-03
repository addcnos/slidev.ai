export enum SlidevBlockType {
  Header,
  Block,
  CrossComponent = 'cross-component'
}

export interface SlidevBlock {
  type: SlidevBlockType
  content: string
}
