<template>
  <div class="slidev-wrap">
    <iframe class="slidev-container" :src="iframeSrc" sandbox="allow-same-origin allow-scripts" />
    <div class="write-card">
      <textarea class="content" v-model="writeContent"></textarea>
      <button class="btn" @click="onConfrim">确认更改</button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
const writeContent = ref('')
import { iframeSrc, writeFile } from '@main/webcontainer'
watch(iframeSrc, (url) => {
  console.log('🚀 iframeUrl changed', url);
});
const onConfrim = () => {
  writeFile('slides.md',writeContent.value)
}
</script>

<style lang="scss" scoped>
.slidev-wrap {
  display: flex;
  height: 100%;

  .slidev-container {
    flex: 1;
  }

  .write-card {
    width: 300px;
    height: 100%;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;

    .content {
      flex: 1;
    }

    .btn {
      margin: 10px 0;
    }
  }
}
</style>
