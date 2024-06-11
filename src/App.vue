<template>
  <div class="slidev-ai-container">
    <Panel v-show="step === 1" @create="step = 2" />
    <SlidevEmbed v-show="step === 2" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import SlidevEmbed from './slidev.vue'
import Panel from './components/panel/index.vue'
import { mount } from '@main/webcontainer';
import { useIpcEmit } from '@renderer/composables'

const step = ref(1) 

onMounted(async () => {
  console.log('🚀 The Vue app is mounted');
  const files = await useIpcEmit.readFiles();
  mount(files);
});
</script>

<style lang="scss" scoped>
.slidev-ai-container {
  width: 100%;
  height: 100%;
}
</style>
