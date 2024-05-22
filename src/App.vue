<template>
  <h1>💖 Hello World!</h1>
  <p>Welcome to your Electron application.</p>
  <SlidevEmbed></SlidevEmbed>
</template>

<script setup>
import SlidevEmbed from './slidev.vue'
console.log('👋 This message is being logged by "App.vue", included via Vite');
</script>

<style lang="scss" scoped>
h1 {
  color: #0f0;
}
</style>
