<template>
  <h1>💖 Hello World!</h1>
  <p>Welcome to your Electron application.</p>
  <p>Electron version: {{ process.versions.electron }}</p>
  <p>Node version: {{ process.versions.node }}</p>
  <p>Chrome version: {{ process.versions.chrome }}</p>
  <iframe v-if="iframeUrl" :src="iframeUrl" frameborder="0" style="width: 800px;height: 500px"></iframe>
</template>


<script setup lang="ts">
import { useEnv } from './composables'
import { onMounted, ref } from 'vue';
import {init , iframeUrl} from '../slidev.server'
const { process } = useEnv();
onMounted(init)
</script>
