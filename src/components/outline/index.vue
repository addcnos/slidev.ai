<template>
  <div class="outline" :class="[isExpand && 'expand']">
    <!-- 头部 -->
    <Header />
    <!-- 标题 -->
    <Title />
    <!-- 大纲内容 -->
    <Tree />
  </div>
</template>

<script setup lang="ts">
import { useOutlineStore } from '@renderer/store';
import Header from './Header.vue'
import Title from './Title.vue'
import Tree from './Tree.vue'

const { isExpand } = useOutlineStore();
</script>

<style lang="scss" scoped>
.outline {
  position: absolute;
  margin: 0 2px;
  bottom: 4px;
  width: calc(100% - 4px);
  height: 500px;
  background-color: rgba(0,0,0,.5);
  overflow: auto;

  &.expand {
    height: 100%;
  }
}
</style>
