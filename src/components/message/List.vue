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
import { useAiStore } from './../../store/ai'
import dayjs from 'dayjs'

const el = ref<HTMLElement | null>(null)
const { chat } = useAiStore()
const chatList = computed(() => chat.value?.session || [])


watch(() => chatList.value, () => {
  nextTick(() => {
    el.value.scrollTop = el.value.scrollHeight
  })  
}, {
  deep: true,
  immediate: true
})
</script>

<style lang="scss" scoped>
.list {
  overflow: auto;
  overflow-x: hidden;
  padding: 20px 20px 40px;
  position: relative;
  overscroll-behavior: none;
  height: 800px;
  scroll-behavior: smooth;

  &::-webkit-scrollbar{
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
    flex: 1 1;
    overflow-x: hidden;
    overflow-y: auto;
    position: relative;
    // overscroll-behavior: none;

    .item {
      display: flex;

      .container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        .content {
          box-sizing: border-box;
          max-width: 100%;
          margin-top: 10px;
          border-radius: 10px;
          background-color: rgba(0, 0, 0, .05);
          padding: 10px;
          font-size: 14px;
          user-select: text;
          word-break: break-word;
          border: 1px solid #dedede;
          position: relative;
          transition: all .3s ease;
        }

        .date {
          font-size: 12px;
          opacity: .2;
          white-space: nowrap;
          transition: all .6s ease;
          color: #303030;
          text-align: left;
          width: 100%;
          box-sizing: border-box;
          pointer-events: none;
          z-index: 1;
        }
      }
    }

    .me {
      flex-direction: row-reverse;

      .container {
        align-items: flex-end;

        .content {
          background-color: #007aff;
          color: #fff;
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
