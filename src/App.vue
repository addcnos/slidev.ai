<template>
  <h1>💖 Hello World!</h1>
  <p>Welcome to your Electron application.</p>
  <p>Electron version: {{ process.versions.electron }}</p>
  <p>Node version: {{ process.versions.node }}</p>
  <p>Chrome version: {{ process.versions.chrome }}</p>
  <iframe src="http://localhost:3030" frameborder="0" style="width: 800px;height: 500px"></iframe>
</template>


<script setup lang="ts">
import { useEnv } from './composables'
const { process } = useEnv();

</script>
