<template>
  <div class="slidev-wrap">
    <div class="slidev-container">
      <iframe v-if="iframeSrc" v-show="loaded" class="wrap" :src="iframeSrc" :allow="iframeAllow" ref="iframeRef" />
    </div>
    <div class="write-card" :class="{ 'hide': !extend }">
      <div class="toggle-btn" v-if="!extend" @click="extend = true">
        <i class="pi pi-angle-left" style="font-size: 20px;"></i>
      </div>
      <Message />
    </div>
    <OutLine />
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { iframeSrc} from '@main/webcontainer'
import OutLine from './components/outline/index.vue'
import Message from './components/message/index.vue'
import { useCrossMessage, useIpcEmit } from '@renderer/composables'
import { useElementBounding } from '@vueuse/core'
import { useMessage } from './composables/message';
import { useChatSession } from '@renderer/store/useChatSession';
const props=defineProps({
  loaded: Boolean
})
const iframeAllow = 'fullscreen; geolocation; encrypted-media;'
const { extend } = useMessage()
const { iframeRef, subscribe } = useCrossMessage()
const { updateCapturePage, activityId } = useChatSession()
const {x ,y, width,height} = useElementBounding(iframeRef)
subscribe()

// watch(() => updateCapturePage.value, async (value) =>{
//   if (!value) return
//   await useIpcEmit.capturePage({
//     x: x.value,
//     y: y.value,
//     width: width.value,
//     height: height.value,
//     fileName: `${activityId.value}.png`
//   })
//   updateCapturePage.value = false
// }, {
//   immediate: true
// })

</script>

<style lang="scss" scoped>
.slidev-wrap {
  display: flex;
  height: 100%;

  .slidev-container {
    flex: 1;
    border: 1px solid rgb(0 0 0 / 10%);

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
    width: 350px;
    height: 100%;
    border: 1px solid rgb(0 0 0 / 10%);
    border-left: 0;
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
