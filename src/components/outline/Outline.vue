<template>
  <div class="outline">
    <!-- 标题 -->
    <div class="outline-title">
      <span class="title">大纲</span>
    </div>

    <!-- 大纲内容 -->
    <div class="outline-ctn">
      <!-- 骨架屏 -->
      <OutlineSkeleton v-if="loading && !treeData?.length" :length="count" />
      <!-- 大纲内容 -->
      <Draggable class="mtl-tree" v-model="treeData" treeLine>
        <template #default="{ node, stat }">
          <OpenIcon
            v-if="stat.children.length"
            :open="stat.open"
            class="mtl-mr"
            @click.native="stat.open = !stat.open"
          />
          <span>{{ node.title }}</span>
        </template>
      </Draggable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, unref } from 'vue';
import { Draggable, OpenIcon } from '@he-tree/vue';
import { useOutlineStore } from '@renderer/store';
import '@he-tree/vue/style/default.css';
import '@he-tree/vue/style/material-design.css';
import OutlineSkeleton from './OutlineSkeleton.vue';

const { outline, loading } = useOutlineStore();
const { count } = useOutlineStore();
const treeData = computed(() => unref(outline).content);

function changeInput(value: string) {

}
</script>

<style scoped lang="scss">
.outline {
  &-title {
    margin-top: 20px;
  }
}
</style>
