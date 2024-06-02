<template>
  <div class="outline">
    <!-- 头部 -->
    <Header />
    <!-- 标题 -->
    <Title />
    <!-- 大纲内容 -->
    <Tree />
  </div>
</template>

<script setup lang="ts">
import Header from './Header.vue'
import Title from './Title.vue'
import Tree from './Tree.vue'
</script>

<style lang="scss" scoped>
.outline {
  position: absolute;
  margin: 0 2px;
  bottom: 4px;
  width: calc(100% - 4px);
  background-color: rgba(0,0,0,.5);
}
</style>
