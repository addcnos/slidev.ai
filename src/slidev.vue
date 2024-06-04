<template>
  <div class="slidev-wrap">
    <iframe class="slidev-container" :src="iframeSrc" allow="fullscreen" ref="iframeRef" />
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
      <div class="btns">
        <button class="sync" @click="onWrite">写入文件</button>
        <button class="submit" @click="onRead">读取文件</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { nextTick, ref, watch } from 'vue'
import { useAiStore } from './store/ai'
import { iframeSrc, writeFile, getInitalContent } from '@main/webcontainer'
import OutLine from './components/outline/index.vue'
import Message from './components/message/index.vue'
import { useCrossMessage, useIpcEmit } from '@renderer/composables'

const writeContent = ref('')
const { iframeRef, subscribe } = useCrossMessage()
subscribe()

watch(iframeSrc, async (url) => {
  console.log('🚀 iframeUrl changed', url);
});

const onWrite = async () => {
  useIpcEmit.fileManager('write', {
    fileName: 'test.txt',
    content: 'hello world',
    append: true
  })
}
const onRead = async () => {
  const content = await useIpcEmit.fileManager('read', {
    fileName: 'test.txt'
  })
  console.log('🚀 content', content);
}
useAiStore()
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
