<template>
  <div class="slidev-ai-container">
    <div class="spin-pane" v-show="!loaded">
      <div class="toolbar">
        <span class="item" :class="{ active: currentBg === key }" v-for="(item, key) in bgVideos" :key="key"
          @click="currentBg = key">{{ item.name }}</span>
      </div>
      <video class="bg" :src="currentBgVideo" autoplay loop muted playsinline></video>
      <div class="spin-pane-item" v-show="serverProcess === +key" v-for="(content, key) in serverProcessMap" :key="key">
        <span class="txt">{{ content }}</span>
      </div>
    </div>
    <div v-show="loaded" class="inner-card">
      <Panel v-show="step === 1" @updateStep="(next) => step = next" />
      <SlidevEmbed v-show="step === 2" :loaded="loaded" />
    </div>

  </div>
</template>

<script setup>
import { onMounted, provide, ref, computed, nextTick } from 'vue';
import SlidevEmbed from './slidev.vue'
import Panel from './components/panel/index.vue'
import { mount, serverProcess, serverProcessMap } from '@main/webcontainer';
import { useDebounceFn } from '@vueuse/core'
import { useIpcEmit } from '@renderer/composables'
import WaveVideo from '@renderer/assets/videos/wave.mp4'
import StarVideo from '@renderer/assets/videos/star.mp4'
import SunVideo from '@renderer/assets/videos/sun.mp4'
import { useChatSession } from './store';

const loaded = ref(false)
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

const step = ref(1)
provide('toggleStep', (next) => step.value = next)
onMounted(async () => {
  console.log('🚀 The Vue app is mounted');
  const files = await useIpcEmit.readFiles();
  mount(files);
  await useIpcEmit.connectSSH();
});
</script>

<style lang="scss" scoped>
.slidev-ai-container {
  width: 100%;
  height: 100%;

  .spin-pane {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    font-size: 20px;
    color: #fff;
    background: linear-gradient(90deg, rgb(127 127 213 / 100%) 0%, rgb(134 168 231 / 100%) 50%, rgb(145 234 228) 100%);

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
      height: calc(100% - 0px);
      object-fit: cover;
    }

    .spin-pane-item {
      position: absolute;
      right: 20px;
      bottom: 40px;
      background: linear-gradient(90deg, #ff7e5f, #feb47b);
      background-clip: text;
      transform: translateY(50%);
      -webkit-text-fill-color: transparent;
    }
  }

  .inner-card {
    width: 100%;
    height: 100%;
  }
}
</style>
