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
        <Button @click="visible = true">展示大纲</Button>
      </div>
    </div>

    <OutLine />
  </div>
</template>

<script setup>
import { nextTick, ref, watch } from 'vue'
import { useAiStore, useOutlineStore } from '@renderer/store'
import { iframeSrc, writeFile, getInitalContent } from '@main/webcontainer'
import OutLine from './components/outline/index.vue'
import Message from './components/message/index.vue'
import { useCrossMessage, useIpcEmit } from '@renderer/composables'

const { visible } = useOutlineStore()

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
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    width: 300px;
    height: 100%;

    &-ctn {
      position: relative;
      display: flex;
      flex: 1;
      flex-direction: column;
    }

    .content {
      flex: 1;
    }

    .btns {
      display: flex;
      justify-content: space-around;
      margin: 10px 0;
    }
  }
}
</style>
