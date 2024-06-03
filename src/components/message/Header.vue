<template>
  <div class="header">
    <div class="title">聊天框</div>
    <button @click="handleChangePageNo">切换页签</button>
  </div>
</template>

<script setup lang="ts">
import { useCrossMessage } from './../../composables/cross-message'

const { messageToIframe } = useCrossMessage()

function handleChangePageNo() {
  messageToIframe({
    type: 'changePageNo',
    data: 4
  })
}

</script>

<style lang="scss" scoped>
.header {
  padding: 14px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
}
</style>
