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
          <Select v-model="selectedCity" editable :options="cities" optionLabel="name" placeholder="Select a City" class="w-full md:w-56" />
        </div>
      </div>
      <div class="settings-item">
        <div class="settings-item-title">图片模型：</div>
        <div class="settings-item-ctn">

        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Select from 'primevue/select';
const selectedCity = ref();
const cities = ref([
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
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
    }
  }
}
</style>
