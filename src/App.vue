<template>
  <SlidevEmbed></SlidevEmbed>
</template>

<script setup>
import { onMounted } from 'vue';
import SlidevEmbed from './slidev.vue'
import { mount } from '@main/webcontainer';
import { useIpcEmit } from '@renderer/composables'
onMounted(async () => {
  console.log('🚀 The Vue app is mounted');
  const files = await useIpcEmit.readFiles();
  mount(files);
});
</script>

<style lang="scss" scoped>
h1 {
  color: #3ab9d4;
}
</style>
