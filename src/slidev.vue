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
      <iframe v-if="iframeSrc" v-show="loaded" class="wrap" :src="iframeSrc" :allow="iframeAllow" ref="iframeRef" />
    </div>
    <div class="write-card" :class="{'hide': !extend}">
      <div class="toggle-btn" v-if="!extend" @click="extend = true">
        <i class="pi pi-angle-left" style="font-size: 20px;"></i>
      </div>
      <Message />
    </div>

    <OutLine />
    <button @click="visible = true">打开</button>
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
import { useMessage } from './composables/message';
const iframeAllow = 'fullscreen; geolocation; encrypted-media;'
const { extend } = useMessage()
const loaded = ref(false)
const { iframeRef, subscribe } = useCrossMessage()
subscribe()
useAiStore()

const { visible } = useOutlineStore()
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
    position: relative;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    width: 300px;
    height: 100%;
    transition: 0.5s;

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

    .toggle-btn {
      position: absolute;
      top: 50%;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 76px;
      font-size: 20px;
      text-align: center;
      cursor: pointer;
      background: #fff;
      border: 1.5px solid #e0e0e0;
      border-radius: 8px 0 0 8px;
      box-shadow: -16px 2px 20px #0000001a;
      transform: translateY(-50%);

      &:hover {
        background: #f0f0f0;
      }
    }
  }

  .hide {
    width: 0;
    transform: translate(100%);
  }
}
</style>
