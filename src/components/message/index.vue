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
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}
</style>
