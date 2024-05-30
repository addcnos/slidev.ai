<template>
  <div class="slidev-wrap">
    <iframe class="slidev-container" :src="iframeSrc" sandbox="allow-same-origin allow-scripts" />
    <div class="write-card">
      <textarea class="content" v-model="writeContent"></textarea>
      <div class="btns">
        <button class="sync" @click="syncContent">同步内容</button>
        <button class="submit" @click="onConfrim">确认更改</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
const writeContent = ref('')
import { iframeSrc, writeFile, getInitalContent} from '@main/webcontainer'
watch(iframeSrc, async (url) => {
  console.log('🚀 iframeUrl changed', url);
});
const syncContent = async () => {
  writeContent.value = await getInitalContent()
}
const onConfrim =async() => {
  await writeFile('slides.md',writeContent.value)
}
</script>

<style lang="scss" scoped>
.slidev-wrap {
  display: flex;
  height: 100%;

  .slidev-container {
    flex: 1;
  }

  .write-card {
    width: 300px;
    height: 100%;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;

    .content {
      flex: 1;
    }

    .btns {
      margin: 10px 0;
      display: flex;
      justify-content: space-around;
    }
  }
}
</style>
