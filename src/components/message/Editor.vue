<template>
  <div class="editor">
    <div class="actions">
      <div v-for="item, index in 7" :key="index" class="action"></div>
    </div>
    <div class="input-panel">
      <textarea v-model="message" placeholder="请输入内容" rows="2"></textarea>
      <Button
        @click="send"
        label="Submit"
      >Send</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useMagicKeys } from '@vueuse/core'
import { useChatSession } from '@renderer/store/useChatSession';
import { beautifySlidevPrompt } from '@renderer/utils/prompt/slidev';
import { Role } from '@renderer/types/chat';

const message = ref('')
const { enter } = useMagicKeys()

async function send() {
  if (!message.value) return
  useChatSession().sendSession(message.value, {
    promptFunc: beautifySlidevPrompt,
    role: Role.System
  })
  message.value = ''
}

watch(() => enter.value, (v: boolean) => {
  if (v) {
    send()
  } else {
    message.value = ''
  }
})

</script>

<style lang="scss" scoped>
.editor {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  padding: 10px 12px 12px;
  border-top: 1px solid #dedede;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 5%);

  .actions {
    display: flex;
    flex-wrap: wrap;

    .action {
      display: inline-flex;
      align-items: center;
      width: 12px;
      height: 12px;
      padding: 4px 10px;
      margin-right: 5px;
      margin-bottom: 10px;
      overflow: hidden;
      font-size: 12px;
      color: #303030;
      cursor: pointer;
      background-color: #fff;
      border: 1px solid #dedede;
      border-radius: 20px;
      box-shadow: 0 2px 4px 0 rgb(0 0 0 / 5%);
      animation: icon-transform 0.3s ease;
    }
  }

  .input-panel {
    position: relative;
    display: flex;
    flex: 1 1;
    cursor: text;
    border: 1px solid #dedede;
    border-radius: 10px;

    textarea {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      min-height: 68px;
      padding: 10px 80px 10px 14px;
      font-family: inherit;
      font-size: 14px;
      color: #303030;
      resize: none;
      border: none;
      border-radius: 10px;
      outline: none;
      box-shadow: 0 -2px 5px rgb(0 0 0 / 3%);

      &::-webkit-scrollbar {
        width: 2px;
      }

      &::-webkit-scrollbar-track {
        background: #dedede;
      }

      &::-webkit-scrollbar-thumb {
        background: #dedede;
      }

      &::-webkit-scrollbar-thumb:hover {
        background: #dedede;
      }
    }

    :deep() {
      .p-button {
        width: 100px;
        height: 40px;
        margin: 12px 4px 0 0;
      }
    }
  }
}

@keyframes icon-transform {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
