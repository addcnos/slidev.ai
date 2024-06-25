<template>
  <div class="header">
    <Button
        @click="toggleStep(1)"
        label="Submit"
      > <i class="pi pi-arrow-left"></i>
      </Button>
    <div class="title">聊天框</div>
    <button @click="handleChangePageNo">切换页签</button>
    <i @click="extend = false" class="pi pi-angle-right" style="font-size: 20px;cursor: pointer;"></i>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { useCrossMessage } from './../../composables/cross-message'
import { useMessage } from './../../composables/message';
import { useChatSession, useOutlineStore } from '@renderer/store'
const toggleStep = inject('toggleStep',(a:number)=>{})
const { messageToIframe } = useCrossMessage()
const { extend } = useMessage()

const { resetSession } = useChatSession()
const { resetOutline } = useOutlineStore()

function handleToggleStep() {
  resetSession()
  resetOutline()
  toggleStep(1)
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
