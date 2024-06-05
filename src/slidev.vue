<template>
  <div class="slidev-wrap">
    <div class="slidev-container">
      <div class="spin-pane" v-show="!loaded">
        <ProgressSpinner style="width: 30px; height: 30px;" strokeWidth="8" animationDuration="3s"
          aria-label="Custom ProgressSpinner" />
        <div class="spin-pane-item" v-show="serverProcess === +key" v-for="(content, key) in serverProcessMap"
          :key="key">
          <span class="txt">{{ content }}</span>
        </div>
      </div>
      <iframe v-if="iframeSrc" v-show="loaded" class="wrap" :src="iframeSrc" allow="fullscreen" ref="iframeRef" />
    </div>
    <div class="write-card">
      <Message />
      <!-- <div class="btns">
        <button class="sync" @click="onWrite">写入文件</button>
        <button class="submit" @click="onRead">读取文件</button>
        <Button @click="visible = true">展示大纲</Button>
      </div> -->
    </div>

    <OutLine />
  </div>
</template>

<script setup>
import { nextTick, ref } from 'vue'
import { useAiStore, useOutlineStore } from '@renderer/store'
import { iframeSrc, serverProcess, serverProcessMap } from '@main/webcontainer'
import OutLine from './components/outline/index.vue'
import Message from './components/message/index.vue'
import { useCrossMessage } from '@renderer/composables'
import { useDebounceFn } from '@vueuse/core'
const { visible } = useOutlineStore()
const loaded = ref(false)
const { iframeRef, subscribe } = useCrossMessage()
subscribe()
useAiStore()

const count = ref(0)
const onLoad = useDebounceFn(() => {
  nextTick(() => {
    loaded.value = true
  })
}, 500)

window.addEventListener('message', (event) => {
  const { data } = event
  try {
    const { type } = JSON.parse(data)
    if (type === 'loaded') {
      if (count.value === 0) onLoad()
      count.value++
    }
  } catch {}
})

</script>

<style lang="scss" scoped>
.slidev-wrap {
  display: flex;
  height: 100%;

  .slidev-container {
    flex: 1;
    margin-right: 12px;
    background: linear-gradient(90deg, rgb(36 36 62 / 100%) 0%, rgb(69 62 141 / 100%) 50%, rgb(15 12 41 / 100%) 100%);
    /* stylelint-disable-next-line max-line-length */
    // background: linear-gradient(90deg, rgb(240 172 247 / 100%) 0%, rgb(172 247 240 / 100%) 50%, rgb(247 240 172 / 100%) 100%);
    border-radius: 0 4px 4px 0;

    .spin-pane {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      font-size: 18px;
      color: #fff;

      .spin-pane-item {
        margin-top: 16px;
      }
    }

    .wrap {
      width: 100%;
      height: 100%;
      border: none;
    }
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
