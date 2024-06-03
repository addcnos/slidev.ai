<template>
  <div class="slidev-wrap">
    <iframe class="slidev-container" :src="iframeSrc" allow="fullscreen" />
    <div class="write-card">
      <Message />
      <!-- <div class="write-card-ctn">
        <textarea class="content" v-model="writeContent"></textarea>
        <OutLine />
      </div>
      <div class="btns">
        <button class="sync" @click="syncContent">同步内容</button>
        <button class="submit" @click="onConfrim">确认更改</button>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { nextTick, ref, watch } from 'vue'
// import { useAiStore } from './store/ai'
import { iframeSrc, writeFile, getInitalContent } from '@main/webcontainer'
import OutLine from './components/outline/index.vue'
import Message from './components/message/index.vue'

const writeContent = ref('')

watch(iframeSrc, async (url) => {
  console.log('🚀 iframeUrl changed', url);
});
const syncContent = async () => {
  writeContent.value = await getInitalContent()
}
const onConfrim = async () => {
  await writeFile('slides.md', writeContent.value)
}
// useAiStore()
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

    &-ctn {
      position: relative;
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .content {
      flex: 1;
    }

    .btns {
      margin: 10px 0;
      display: flex;
      justify-content: space-around;
    }
  }
}
</style>
