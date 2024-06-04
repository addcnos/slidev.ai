<template>
  <div class="outline">
    <!-- 标题 -->
    <div class="outline-title">
      <span class="title">大纲</span>
    </div>

    <!-- 大纲内容 -->
  </div>
  <Draggable class="mtl-tree" v-model="treeData" treeLine>
    <template #default="{ node, stat }">
      <OpenIcon
        v-if="stat.children.length"
        :open="stat.open"
        class="mtl-mr"
        @click.native="stat.open = !stat.open"
      />
      <!-- <input
        class="mtl-checkbox mtl-mr"
        type="checkbox"
        v-model="stat.checked"
      /> -->
      <!-- TODO: change components -->
      <!-- <input class="mtl-ml" v-model="node.text" @input="changeInput"/> -->
      <span>{{ node.text }}</span>
    </template>
  </Draggable>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Draggable, OpenIcon } from '@he-tree/vue';
import '@he-tree/vue/style/default.css';
import '@he-tree/vue/style/material-design.css';

const treeData = ref([
  {
    text: 'Projects',
    children: [
      {
        text: 'Frontend',
        children: [
          {
            text: 'Vue',
            children: [
              {
                text: 'Nuxt',
              },
            ],
          },
          {
            text: 'React',
            children: [
              {
                text: 'Next',
              },
            ],
          },
          {
            text: 'Angular',
          },
        ],
      },
      {
        text: 'Backend',
      },
    ],
  },
  { text: 'Photos' },
  { text: 'Videos' },
]);

function changeInput(value: string) {

}
</script>

<style scoped scss>
.mtl-tree {
  margin-top: 20px;
}

.mtl-mr {
  margin-right: 10px;
}

.mtl-ml {
  margin-left: 10px;
}
</style>
