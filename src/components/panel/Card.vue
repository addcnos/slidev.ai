<template>
  <div class="card-container">
    <div class="wrapper">+</div>
    <div class="desc">
      <div class="title">{{ data?.title }}</div>
      <div class="subtitle" v-show="data?.user">
        <img :src="userIcon" />
        {{ data?.user }}
      </div>
    </div>
    <div class="ext" v-if="data?.createTime">创建日期：{{ data?.createTime }}</div>
  </div>
</template>

<script setup lang="ts">
import userIcon from '../../assets/image/user-icon.png'

defineProps({
  data: {
    type: Object,
    default: () => []
  }
})
</script>

<style lang="scss" scoped>
.card-container {
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
    background: #f5f5f5;
    border-radius: 8px;

    &:hover {
      border: 1px solid #00ac8f;
    }

    img {
      width: 44px;
      height: 44px;
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
      font-size: 14px;
      line-height: 20px;
      color: #3c3c3c;
      text-align: left;
    }

    .subtitle {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      line-height: 14px;
      color: #666;

      img {
        width: 14px;
        margin-right: 2px;
      }
    }
  }

  .ext {
    height: 17px;
    font-size: 12px;
    line-height: 17px;
    color: #999;
    text-align: left;
  }
}
</style>
