<template>
  <div class="list" ref="el">
    <div class="container" >
      <div v-for="item in chatList" :key="item.id" class="item" :class="{'me': item.role === 'user'}">

        <div class="container">
          <div class="content">
            {{ item.content }}
          </div>
          <div class="date">{{ dayjs(item.timestamp).format('YYYY-MM-DD HH:mm:ss') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { Role } from "@renderer/types/chat";
import dayjs from 'dayjs'
import { useChatSession } from '@renderer/store/useChatSession';

const el = ref<HTMLElement | null>(null)
const { chat } = useChatSession()
const chatList = computed(() => (chat.value?.session || []).filter((item) => item.role !== Role.System))


watch(() => chatList.value, () => {
  nextTick(() => {
    el.value.scrollTop = el.value?.scrollHeight
  })
}, {
  deep: true,
  immediate: true
})
</script>

<style lang="scss" scoped>
.list {
  position: relative;
  height: 800px;
  padding: 20px 20px 40px;
  overflow: auto;
  overflow-x: hidden;
  overscroll-behavior: none;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgb(34 34 34 / 60%);
  }

  .container {
    position: relative;
    flex: 1 1;
    overflow: hidden auto;

    // overscroll-behavior: none;

    .item {
      display: flex;

      .container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        .content {
          position: relative;
          box-sizing: border-box;
          max-width: 100%;
          padding: 10px;
          margin-top: 10px;
          font-size: 14px;
          word-break: break-word;
          user-select: text;
          background-color: rgb(0 0 0 / 5%);
          border: 1px solid #dedede;
          border-radius: 10px;
          transition: all 0.3s ease;
        }

        .date {
          z-index: 1;
          box-sizing: border-box;
          width: 100%;
          font-size: 12px;
          color: #303030;
          text-align: left;
          white-space: nowrap;
          pointer-events: none;
          opacity: 0.2;
          transition: all 0.6s ease;
        }
      }
    }

    .me {
      flex-direction: row-reverse;

      .container {
        align-items: flex-end;

        .content {
          color: #fff;
          background-color: #007aff;
          border-color: #007aff;
        }

        .date {
          text-align: right;
        }
      }
    }
  }
}
</style>
