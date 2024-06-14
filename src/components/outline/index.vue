<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="生成 Slide 大纲11"
    :style="{ width: '800px' }"
  >
    <div class="outline">
      <!-- 标题 -->
      <Theme />
      <!-- 大纲内容 -->
      <Outline />
    </div>

    <!-- 底部确认区 -->
    <div class="flex justify-content-end gap-2">
        <Button type="button" label="Cancel" severity="secondary" @click="onCancel"></Button>
        <Button :disabled="loading" type="button" label="Save" @click="onSave"></Button>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useOutlineStore,  } from '@renderer/store';
import Theme from './Theme.vue'
import Outline from './Outline.vue'
import { useChatSession } from '@renderer/store/useChatSession';

const { visible, theme} = useOutlineStore();
const { outline, loading } = useOutlineStore();
const { initSlidevContent } = useChatSession();

function onSave() {
  console.log('onSave');
  visible.value = false;
  outline.value.title = theme.value
  initSlidevContent()
}

function onCancel() {
  console.log('onCancel')
  visible.value = false;
}
</script>

<style lang="scss" scoped>
// TODO
</style>
