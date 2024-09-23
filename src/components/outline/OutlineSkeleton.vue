
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
    height: 44px !important;
    margin-bottom: 8px;
    background-color: #f2f4f7;
  }
}
</style>
