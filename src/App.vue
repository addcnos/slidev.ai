<template>
  <h1> 🚀 Hello Slidev Ai!</h1>
  <SlidevEmbed></SlidevEmbed>
</template>

<script setup>
import { onMounted } from 'vue';
import SlidevEmbed from './slidev.vue'
import { mount } from '@main/webcontainer';
onMounted(() => {
  console.log('🚀 The Vue app is mounted');
  mount();
});
</script>

<style lang="scss" scoped>
h1 {
  color: #3ab9d4;
}
</style>
