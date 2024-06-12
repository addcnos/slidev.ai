<template>
  <div class="slidev-wrap">
    <div class="slidev-container">
      <div class="spin-pane" v-show="!loaded">
        <div class="toolbar">
          <span class="item" :class="{ active: currentBg === key }" v-for="(item, key) in bgVideos" :key="key" @click="currentBg = key">{{ item.name }}</span>
        </div>
        <video class="bg" :src="currentBgVideo" autoplay loop muted playsinline></video>
        <div class="spin-pane-item" v-show="serverProcess === +key" v-for="(content, key) in serverProcessMap"
          :key="key">
          <span class="txt">{{ content }}</span>
        </div>
      </div>
      <iframe v-if="iframeSrc" v-show="loaded" class="wrap" :src="iframeSrc" :allow="iframeAllow" ref="iframeRef" />
    </div>
    <div class="write-card" :class="{ 'hide': !extend }">
      <div class="toggle-btn" v-if="!extend" @click="extend = true">
        <i class="pi pi-angle-left" style="font-size: 20px;"></i>
      </div>
      <Message />
    </div>

    <OutLine />
    <button @click="visible = true">打开</button>
    <button @click="onCapturePage">截图</button>
  </div>
</template>

<script setup>
import { computed, nextTick, ref } from 'vue'
import { useOutlineStore } from '@renderer/store'
import { iframeSrc, serverProcess, serverProcessMap } from '@main/webcontainer'
import OutLine from './components/outline/index.vue'
import Message from './components/message/index.vue'
import { useCrossMessage, useIpcEmit } from '@renderer/composables'
import { useDebounceFn, useElementBounding } from '@vueuse/core'
import { useMessage } from './composables/message';
import WaveVideo from '@renderer/assets/videos/wave.mp4'
import StarVideo from '@renderer/assets/videos/star.mp4'
import SunVideo from '@renderer/assets/videos/sun.mp4'

const iframeAllow = 'fullscreen; geolocation; encrypted-media;'
const { extend } = useMessage()
const loaded = ref(false)
const { iframeRef, subscribe } = useCrossMessage()
const {x ,y, width,height} = useElementBounding(iframeRef)
subscribe()
const bgVideos = {
  'wave': {
    src: WaveVideo,
    name: '海浪'
  },
  'star': {
    src: StarVideo,
    name: '星空'
  },
  'sun': {
    src: SunVideo,
    name: '落日'
  }
}
const currentBg = ref('wave')
const currentBgVideo = computed(() => bgVideos[currentBg.value].src)

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
  } catch { }
})

const onCapturePage = async () => {
  await useIpcEmit.capturePage({
    x: x.value,
    y: y.value,
    width: width.value,
    height: height.value,
    fileName: 'test.png'
  })
}

</script>

<style lang="scss" scoped>
.slidev-wrap {
  display: flex;
  height: 100%;

  .slidev-container {
    flex: 1;
    background: linear-gradient(90deg, rgb(127 127 213 / 100%) 0%, rgb(134 168 231 / 100%) 50%, rgb(145 234 228) 100%);
    border-radius: 0 4px 4px 0;

    .spin-pane {
      position: relative;
      display: flex;
      flex-direction: column;
      height: 100%;
      font-size: 20px;
      color: #fff;

      .toolbar {
        position: absolute;
        top: 16px;
        left: 16px;
        z-index: 1;
        display: flex;

        .item {
          padding: 2px 4px;
          font-size: 16px;
          color: #fff;
          cursor: pointer;
          border-radius: 4px;
          box-shadow: 0 2px 4px #0000001a;
          transition: 0.3s;

          & + .item {
            margin-left: 8px;
          }

          &.active {
            color: #91eae4;
          }

          &:hover {
            color: #91eae4;
          }
        }
      }

      .bg {
        width: 100%;
        height: calc(100% - 80px);
        object-fit: cover;
      }

      .spin-pane-item {
        position: absolute;
        bottom: 40px;
        left: 20px;
        background: linear-gradient(90deg, #ff7e5f, #feb47b);
        background-clip: text;
        transform: translateY(50%);
        -webkit-text-fill-color: transparent;
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
