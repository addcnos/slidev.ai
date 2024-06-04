<template>
  <Dialog v-model:visible="visible" modal header="Edit Profile" :style="{ width: '25rem' }">
    <div class="outline">
      <!-- 头部 -->
      <Header />
      <!-- 标题 -->
      <Title />
      <!-- 大纲内容 -->
      <Tree />
    </div>
    <div class="flex justify-content-end gap-2">
        <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
        <Button type="button" label="Save" @click="visible = false"></Button>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { useOutlineStore } from '@renderer/store';
import Header from './Header.vue'
import Title from './Title.vue'
import Tree from './Tree.vue'

const { visible } = useOutlineStore();
</script>

<style lang="scss" scoped>
.outline {
  position: absolute;
  bottom: 4px;
  width: calc(100% - 4px);
  height: 500px;
  margin: 0 2px;
  overflow: auto;
  background-color: rgb(0 0 0 / 50%);

  &.expand {
    height: 100%;
  }
}
</style>
