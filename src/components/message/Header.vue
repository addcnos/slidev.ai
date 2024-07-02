<template>
  <div class="header">
    <Button
        @click="back"
        label="Submit"
      > <i class="pi pi-arrow-left"></i>
      </Button>
    <div class="title">聊天框</div>
    <!-- <button @click="handleChangePageNo">切换页签</button> -->
    <i @click="extend = false" class="pi pi-angle-right" style="font-size: 20px;cursor: pointer;"></i>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { useIpcEmit } from '@renderer/composables'
import { useCrossMessage } from './../../composables/cross-message'
import { useMessage } from './../../composables/message';
import { useChatSession, useOutlineStore } from '@renderer/store'
import { useElementBounding } from '@vueuse/core'
const { activityId } = useChatSession()
const toggleStep = inject('toggleStep',(a:number)=>{})
const { messageToIframe, iframeRef } = useCrossMessage()
const {x ,y, width,height} = useElementBounding(iframeRef)
const { extend } = useMessage()

const { resetSession } = useChatSession()
const { resetOutline } = useOutlineStore()

function handleToggleStep() {
  resetSession()
  resetOutline()
  toggleStep(1)
}

// 返回之前先跳转到ppt第一页再截屏
async function back(){
  messageToIframe({
    type: 'changePageNo',
    data: 1
  })
  setTimeout(async () => {
    await useIpcEmit.capturePage({
      x: x.value,
      y: y.value,
      width: width.value,
      height: height.value,
      fileName: `${activityId.value}.png`
    })
    toggleStep(1)
  }, 1000);
}

function handleChangePageNo() {
  messageToIframe({
    type: 'changePageNo',
    data: 4
  })
}
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  text-align: center;
  border-bottom: 1px solid rgb(0 0 0 / 10%);
}
</style>
