<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="生成 Slide 大纲11"
    :style="{ width: '800px' }"
    class="outline-modal"
  >
    <div class="outline">
      <!-- 标题 -->
      <Theme />
      <!-- 大纲内容 -->
      <Outline />
      <!-- 图片区域 -->
      <Settings />
    </div>

    <!-- 底部确认区 -->
    <div class="btns-wrapper">
        <Button
          type="button"
          label="Cancel"
          severity="secondary"
          @click="onCancel"
        >取消</Button>
        <Button
          :disabled="loading"
          type="button"
          label="Save"
          @click="onSave"
        >生成 slide</Button>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useOutlineStore,  } from '@renderer/store';
import Theme from './Theme.vue'
import Outline from './Outline.vue'
import Settings from './Settings.vue'
import { useChatSession } from '@renderer/store/useChatSession';

const { visible, theme} = useOutlineStore();
const { outline, loading } = useOutlineStore();
const { initSlidevContent } = useChatSession();

function onSave() {
  visible.value = false;
  outline.value.title = theme.value
  initSlidevContent()
}

function onCancel() {
  visible.value = false;
}
</script>

<style lang="scss">
.p-dialog.outline-modal {
  background: linear-gradient(180deg, #ecfffc, #f7fff3 15%);
  box-shadow: 0 6px 32px 5px rgb(0 0 0 / 4%), 0 16px 24px 2px rgb(0 0 0 / 4%), 0 8px 10px -5px rgb(0 0 0 / 8%);

  .p-dialog-header {
    font-size: 14px;
    text-align: center;
    background: transparent;
  }

  .p-dialog-content {
    background: transparent;
  }
}
</style>
<style lang="scss" scoped>
.btns-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 16px;

  button {
    display: flex;
    justify-content: center;
    width: 160px;
    text-align: center;
    border: 1px solid #d0dddb;
    border-radius: 8px;

    &:nth-child(2) {
      margin-left: 16px;
    }
  }
}
</style>
