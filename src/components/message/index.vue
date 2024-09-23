<template>
  <div class="message-container">
    <Header />
    <List />
    <Editor />
  </div>
</template>

<script setup lang="ts">
import Header from './Header.vue';
import List from './List.vue';
import Editor from './Editor.vue';
</script>

<style lang="scss" scoped>
.message-container {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
</style>
