<template>
  <h1>💖 Hello World!</h1>
  <p>Welcome to your Electron application.</p>
  <SlidevEmbed></SlidevEmbed>
</template>

<script setup>
import { onMounted } from 'vue';
import SlidevEmbed from './slidev.vue'

onMounted(() => {
  console.log('🚀 The Vue app is mounted');
});
</script>

<style lang="scss" scoped>
h1 {
  color: #0f0;
}
</style>
