<template>
  <iframe id="slidev-container" :src="iframeSrc" sandbox="allow-same-origin allow-scripts" />
</template>

<script setup>
import { ref } from 'vue'
const iframeSrc = ref('http://localhost:3030')
</script>

<style scoped>
#slidev-container {
  width: 100%;
  height: 100%;
}
</style>
