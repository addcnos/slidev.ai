<template>
  <div class="editor">
    <div class="actions">
      <div v-for="item, index in actions" :key="index" class="action" @click="item.actionHandle">
        <i class="pi" :class="item.icon" style="font-size: 16px;color: #4a4a4a;"></i>
        <span>{{ item.title }}</span>
      </div>
    </div>
    <div class="input-panel">
      <Textarea v-model="message" placeholder="请输入内容" rows="2"></Textarea>
      <Button
        @click="send"
        label="Submit"
      ><img src="@assets/images/send-icon.png" width="18" height="18">发送</Button>
    </div>
    <Toast />
  </div>
</template>

<script setup lang="ts">
import Toast from 'primevue/toast';
import { ref, watch } from 'vue'
import { useMagicKeys } from '@vueuse/core'
import { useChatSession } from '@renderer/store/useChatSession';
import { beautifySlidevPrompt, instertSlidevPrompt } from '@renderer/utils/prompt/slidev';
import { Role } from '@renderer/types/chat';
import { useToast } from 'primevue/usetoast';

const message = ref('')
const { enter } = useMagicKeys()
const { sendSession } = useChatSession()
const toast = useToast();

async function send() {
  if (!message.value) return
  sendSession(message.value, {
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
    name: 'insertImg',
    icon:'pi-image',
    title:'插入图片',
    actionHandle: () => {
     
    }
  },
  {
    name: 'addPage',
    icon:'pi-file-plus',
    title:'插入单页',
    actionHandle: () => {
      if (!message.value)  {
        return toast.add({ severity: 'error', summary: '请输入相关描述哦', life: 3000, closable:false });
      }
      sendSession(message.value, {
        promptFunc: instertSlidevPrompt,
        role: Role.System
      })
    }
  },
  {
    name: 'polishing',
    icon:'pi-sparkles',
    title:'润色文稿',
    actionHandle: () => {
      if (!message.value)  {
        return toast.add({ severity: 'error', summary: '请输入相关描述哦', life: 3000, closable:false });
      }
      sendSession(message.value, {
        promptFunc: beautifySlidevPrompt,
        role: Role.System
      })
    }
  },
  {
    name: 'textToImg',
    icon:'pi-images',
    title:'文本转图',
    actionHandle: () => {
      // todo setting
    }
  },
  {
    name: 'downLoad',
    icon:'pi-file-pdf',
    title:'下载pdf',
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
      width: 36px;
      height: 24px;
      padding: 0 9px;
      margin-right: 4px;
      overflow: hidden;
      white-space: nowrap;
      cursor: pointer;
      background: #fff;
      border: 1px solid #e6e6e6;
      border-radius: 13px;
      box-shadow: 0 1px 4px 0 rgb(0 0 0 / 10%);
      transition: width 0.3s ease;

      span {
        margin-left: 4px;
        font-size: 13px;
        opacity: 0;
        transition: all 0.3s ease;
        transform: translateY(-1px);
      }

      &:hover {
        width: 92px;
        background: #e5e5e5;
        transition-delay: 0.5s;

        span {
          opacity: 1;
          transition-delay: 0.5s;
        }
      }

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
    border: 1px solid #e6e6e6;
    border-radius: 7px;

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

      &::-webkit-scrollbar {
        width: 0;
      }
    }

    :deep() {
      .p-button {
        min-width: 80px;
        height: 40px;
        padding: 0 10px;
        margin: 12px 4px 0 0;
        margin-left: 5px;
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
