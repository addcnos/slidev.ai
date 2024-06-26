<template>
  <div class="editor">
    <template  v-if="chat.waitImage.length">
      图片正在加载中请稍等
      <ProgressBar mode="indeterminate" style="height: 6px;margin-top: 5px;margin-bottom: 5px;"></ProgressBar>
    </template>
    <div class="actions">
      <div v-for="item, index in sessionActions" :key="index" class="action" :class="{ active: actionFunc === item.name }" @click="actionFunc = actionFunc === item.name ? '' : item.name">
        <i class="pi" :class="item.icon" style="font-size: 16px;color: #4a4a4a;"></i>
        <span>{{ item.title }}</span>
      </div>
      <div v-for="item, index in actions" :key="index" class="action" @click="actionHandles[item.name]()">
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
import { ref, watch, computed } from 'vue'
import Toast from 'primevue/toast';
import { useMagicKeys, file, useFileDialog } from '@vueuse/core'
import { useChatSession } from '@renderer/store/useChatSession';
import { beautifySlidevPrompt, insertImage2SlidevPrompt, genSingleSlidevPrompt } from '@renderer/utils/prompt/slidev';
import { Role } from '@renderer/types/chat';
import { build, buildLoading, webcontainerFs } from '@main/webcontainer';
import { dialog } from 'electron/main';
import { useToast } from 'primevue/usetoast';
import { nanoid } from 'nanoid';
import { useIpcEmit } from '@renderer/composables';
import { useClipboard } from '@vueuse/core'

const message = ref('')
const { enter } = useMagicKeys()
const { sendSession, activityId, chat } = useChatSession()
const toast = useToast();
const shareLink = ref('')
const actionFunc = ref('')

async function send() {
  if (!message.value) return
  if (actionFunc.value) {
    actionHandles[actionFunc.value]()
  } else {
    sendSession(message.value, {
      promptFunc: beautifySlidevPrompt,
      role: Role.User
    })
    message.value = ''
  }
}

watch(() => enter.value, (v: boolean) => {
  if (v) {
    send()
  } else {
    message.value = ''
  }
})

const actions = computed(() => [
  {
    name: 'share',
    icon: buildLoading.value ? 'pi-spin pi-spinner' : 'pi-share-alt',
    title: buildLoading.value ? '生成中...' :'分享链接',
  },
  {
    name: 'copy',
    icon: 'pi-copy',
    title: '复制链接',
  },
])

const sessionActions = ref([
  {
    name: 'addPage',
    icon:'pi-file-plus',
    title:'插入单页',
  },
  {
    name: 'polishing',
    icon:'pi-sparkles',
    title:'润色文稿',
  },
  {
    name: 'textToImg',
    icon:'pi-images',
    title:'文本转图',
  },
])

const actionHandles = {
  share: () => {
    build().then(() => {
      toast.add({ severity: 'success', summary: '分享PPT成功，请前往复制链接', life: 3000, closable:false });
      shareLink.value = `https://slidev-ai.addcn.com/${activityId.value}`
    }).catch(() => {
      return toast.add({ severity: 'error', summary: '分享失败，请联系管理员', life: 3000, closable:false });
    })
  },
  copy: async () => {
    if (!shareLink.value) {
      return toast.add({ severity: 'error', summary: '请先分享PPT', life: 3000, closable:false });
    }
    useClipboard().copy(shareLink.value)
    toast.add({ severity: 'success', summary: '链接已复制到剪贴板', life: 3000, closable:false });
  },
  addPage: () => {
    if (!message.value)  {
      return toast.add({ severity: 'error', summary: '请输入相关描述哦', life: 3000, closable:false });
    }
    sendSession(message.value, {
      promptFunc: genSingleSlidevPrompt,
      role: Role.User,
      insert: true
    })
    message.value = ''
  },
  polishing: () => {
    if (!message.value)  {
        return toast.add({ severity: 'error', summary: '请输入相关描述哦', life: 3000, closable:false });
      }
      sendSession(message.value, {
        promptFunc: beautifySlidevPrompt,
        role: Role.User
      })
      message.value = ''
  },
  textToImg: () => {
    if (chat.value.waitImage.length) {
      return toast.add({ severity: 'error', summary: '图片还在生成中还要等一会哦', life: 3000, closable:false });
    }
    if (!message.value)  {
      return toast.add({ severity: 'error', summary: '请输入相关描述哦', life: 3000, closable:false });
    }
    sendSession(message.value, {
      promptFunc: insertImage2SlidevPrompt,
      role: Role.User
    })
    message.value = ''
  },
}

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

      &.active,
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
