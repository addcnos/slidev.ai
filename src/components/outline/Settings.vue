<template>
  <div class="settings">
    <div class="settings-title">
      <span class="title">设置</span>
    </div>

    <div class="settings-ctn">
      <div class="settings-item">
        <div class="settings-item-title">单页文本数量：</div>
        <div class="settings-item-ctn">
          <div class="tabs">
            <div
              class="tab"
              v-for="item, index in ['简单', '中等', '详细']"
              @click="activeIndex = index"
              :class="{ active: activeIndex === index }"
            >{{ item }}</div>
          </div>
        </div>
      </div>
      <div class="settings-item">
        <div class="settings-item-title">图片风格：</div>
        <div class="settings-item-ctn">
          <Select v-model="selectedCity" editable :options="cities" optionLabel="name" placeholder="选择 Slide 图片风格" class="w-full md:w-56" />
        </div>
      </div>
      <div class="settings-item">
        <div class="settings-item-title">图片模型：</div>
        <div class="settings-item-ctn img-modal">
          <i class="icon-star"></i>
          DALL·E 3
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Select from 'primevue/select';
const selectedCity = ref('卡通');
const cities = ref([
    { name: '卡通', code: '卡通' },
    { name: '写实', code: '写实' },
    { name: '插画', code: '插画' },
    { name: '抽象', code: '抽象' },
    { name: '平面设计', code: '平面设计' },
    { name: '低多边形', code: '低多边形' },
    { name: '水彩', code: '水彩' },
    { name: '素描', code: '素描' },
    { name: '像素', code: '像素' },
    { name: '赛博朋克', code: '赛博朋克' },
    { name: '复古', code: '复古' },
    { name: '极简主义', code: '极简主义' },
]);
const activeIndex = ref(1);
</script>

<style lang="scss" scoped>
.settings {
  margin-top: 24px;

  &-title {
    margin-right: 10px;
    font-size: 18px;
    font-weight: bold;
  }

  &-ctn {
    padding: 16px;
    margin-top: 8px;
    background: #fff;
    border: 1px solid #d0dddb;
    border-radius: 8px;
  }

  &-item {
    &:not(:last-child) {
      margin-bottom: 18px;
    }

    &:last-child {
      margin-bottom: 5px;
    }

    &-title {
      height: 20px;
      font-size: 14px;
      line-height: 20px;
      color: #333;
    }

    &-ctn {
      height: 44px;
      padding: 0 3px;
      margin-top: 9px;
      background: #f2f4f7;
      border-radius: 8px;

      .tabs {
        display: flex;
        align-items: center;
        height: 100%;
        padding: 3px 0;

        .tab {
          flex: 1;
          height: 100%;
          line-height: 36px;
          color: #000;
          text-align: center;
          cursor: pointer;

          &.active {
            color: #007d68;
            background: #bceee4;
            border-radius: 8px;
          }
        }
      }

      :deep() {
        .p-select {
          width: 100%;
          height: 100%;
          background: #f2f4f7;
          border: none;
          outline: none;
        }
      }

      &.img-modal {
        .icon-star {
          position: relative;
          top: 4px;
          display: inline-block;
          width: 20px;
          height: 20px;
          margin: 0 2px 0 10px;
          background: url("../../assets/images/star-icon.png") no-repeat;
          background-size: 100% 100%;
        }

        height: 44px;
        font-size: 14px;
        font-weight: normal;
        line-height: 44px;
        color: #333;
      }
    }
  }
}
</style>
