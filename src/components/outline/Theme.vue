<template>
  <div class="prompt">
    <div class="prompt-title">
      <!-- 主题 -->
      <span class="title">主题：</span>
      <!-- 页数 -->
      <InputNumber
        v-model="count"
        inputId="minmax-buttons"
        mode="decimal"
        showButtons
        :min="1"
        :max="100"
        :allowEmpty="false"
        size="small"
        suffix="页"
        @update:modelValue="onChangeCount"
      />
    </div>

    <div class="prompt-ctn">
      <!-- 主题 -->
      <InputText  v-model="theme" />
      <!-- 初始化 -->
      <Button :disabled="loading" icon="pi pi-sync" aria-label="Submit" @click="initOutline" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { unref } from 'vue';
import { useOutlineStore } from '@renderer/store';

const { count, theme } = useOutlineStore();
const { initOutlineContent, loading } = useOutlineStore();

/**
 * @description 修改页数
 */
function onChangeCount(value: number) {
  console.log('onChangeCount', value);
}

/**
 * @description 初始化大纲
 */
function initOutline() {
  initOutlineContent(unref(theme))
}
</script>

<style lang="scss" scoped>
.prompt {
  &-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: px;

    .title {
      margin-right: 10px;
      font-size: 18px;
      font-weight: bold;
    }

    :deep() {
      .p-inputtext {
        width: 100px;
        height: 32px;
        border: 1px solid #d0dddb;
      }

      .p-button:disabled {
        background: #10b981a6;
      }
    }
  }

  &-ctn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 12px;
    margin-top: 6px;
    border: 1px solid #d0dddb;
    border-radius: 8px;
  }
}
</style>
