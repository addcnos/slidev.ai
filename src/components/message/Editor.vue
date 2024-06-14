<template>
  <div class="editor">
    <div class="actions">
      <div v-for="item, index in actions" :key="index" class="action" @click="item.actionHandle">
        <img :src="item.icon" width="18" height="18">
      </div>
    </div>
    <div class="input-panel">
      <textarea v-model="message" placeholder="请输入内容" rows="2"></textarea>
      <Button
        @click="send"
        label="Submit"
      ><img src="@assets/images/send-icon.png" width="18" height="18">Send</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useMagicKeys } from '@vueuse/core'
import { useChatSession } from '@renderer/store/useChatSession';
import { beautifySlidevPrompt } from '@renderer/utils/prompt/slidev';
import settingIcon from '@assets/images/setting-icon.png';
import sunIcon from '@assets/images/sun-icon.png';
import magicIcon from '@assets/images/magic-icon.png';
import maskIcon from '@assets/images/mask-icon.png';
import clearIcon from '@assets/images/clear-icon.png';
import robotIcon from '@assets/images/robot-icon.png';
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

const actions = ref([
  {
    name: 'setting',
    icon:settingIcon,
    actionHandle: () => {
      // todo setting
    }
  },
  {
    name: 'sun',
    icon:sunIcon,
    actionHandle: () => {
      // todo setting
    }
  },
  {
    name: 'magic',
    icon:magicIcon,
    actionHandle: () => {
      // todo setting
    }
  },
  {
    name: 'mask',
    icon:settingIcon,
    actionHandle: () => {
      // todo setting
    }
  },
  {
    name: 'clear',
    icon:clearIcon,
    actionHandle: () => {
      // todo setting
    }
  },
  {
    name: 'robot',
    icon:robotIcon,
    actionHandle: () => {
      // todo setting
    }
  },
])
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
    padding: 6px 0;

    .action {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 24px;
      margin-right: 4px;
      background: #fff;
      border: 1px solid #e6e6e6;
      border-radius: 13px;
      box-shadow: 0 1px 4px 0 rgb(0 0 0 / 10%);

      img {
        width: 18px;
        height: 18px;
      }
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
        max-width: 100px;
        height: 40px;
        padding: 0 16px;
        margin: 12px 4px 0 0;
        background: #ff4a00;
        border: none;
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
