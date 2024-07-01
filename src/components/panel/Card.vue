<template>
  <div class="card-container">
    <div class="wrapper">
      <img v-if="data?.image" :src="`data:image/png;base64,${data?.image}`" alt="">
      <img v-if="data?.url" :src="data?.url" alt="">
    </div>
    <div class="desc">
      <div class="title">{{ data?.title }}</div>
      <div class="subtitle" v-show="data?.createTime">
        {{ data?.createTime }}
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps({
  data: {
    type: Object,
    default: () => []
  }
})
</script>

<style lang="scss" scoped>
.card-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: max-content;
  cursor: pointer;

  &:hover {
    .wrapper {
      border: 1px solid #00ac8f;
    }

    .desc {
      .title {
        color: #00ac8f;
      }
    }
  }

  .wrapper {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 190px;
    height: 120px;
    overflow: hidden;
    background: #f5f5f5;
    border: 1px solid transparent;
    border-radius: 8px;

    &:hover {
      border: 1px solid #00ac8f;
    }

    img {
      width: 100%;
      height: 100%;
    }
  }

  .desc {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-top: 8px;

    .title {
      height: 20px;
      overflow: hidden;
      font-size: 14px;
      line-height: 20px;
      color: #3c3c3c;
      text-align: left;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .subtitle {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      line-height: 14px;
      color: #666;
      text-align: left;
      text-overflow: ellipsis;
      white-space: nowrap;

      img {
        width: 14px;
        margin-right: 2px;
      }
    }
  }
}
</style>
