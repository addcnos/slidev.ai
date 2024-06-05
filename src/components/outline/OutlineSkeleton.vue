
<template>
  <div class="ouline-skeleton">
    <Skeleton v-for="i in length" :key="i" class="ouline-skeleton-item" />
  </div>
</template>

<script setup lang="ts">

defineProps({
  length: {
    type: Number,
    default: 8
  }
})
</script>

<style scoped lang="scss">
.ouline-skeleton {
  &-item {
    display: inline-block;
    height: 50px !important;
    margin-top: 10px;
  }
}
</style>
