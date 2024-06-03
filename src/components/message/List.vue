<template>
  <div class="list">
    <div class="container" ref="el">
      <div v-for="item in dataList" :key="item.id" class="item" :class="{'me': item.fromMe}">
        <div class="container">
          <div class="content">
            {{ item.content }}
          </div>
          <div class="date">2024/6/3 09:55:40</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const el = ref<HTMLElement | null>(null)
// 帮我生成5条这样的数据

const dataList = ref([{
  id: 1,
  fromMe: 1,
  content: 'Hello',
  type: 'text',
},{
  id: 2,
  fromMe: 1,
  content: 'electorn在控制台修改样式之后怎么恢复初始值 就是类似网站的刷新',
  type: 'text',
},{
  id: 3,
  fromMe: 0,
  content: '在 Electron 应用中，如果你在开发者工具（DevTools）中修改了样式并希望恢复初始值，可以通过以下几种方式实现：在 Electron 应用中，如果你在开发者工具（DevTools）中修改了样式并希望恢复初始值，可以通过以下几种方式实现：',
  type: 'text',
},{
  id: 4,
  fromMe: 0,
  content: 'Hello',
  type: 'text',
},{
  id: 5,
  fromMe: 1,
  content: 'Hello',
  type: 'text',
},{
  id: 6,
  fromMe: 1,
  content: 'Hello',
  type: 'text',
},{
  id: 7,
  fromMe: 1,
  content: 'electorn在控制台修改样式之后怎么恢复初始值electorn在控制台修改样式之后怎么恢复初始值electorn在控制台修改样式之后怎么恢复初始值',
  type: 'text',
}])

// useInfiniteScroll(
//   el,
//   () => {
//     dataList.value.push(...moreData)
//   },
//   { distance: 10 }
// )
</script>

<style lang="scss" scoped>
.list {
  overflow: auto;
  overflow-x: hidden;
  padding: 20px 20px 40px;
  position: relative;
  overscroll-behavior: none;

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
    overflow: auto;
    overflow-x: hidden;
    position: relative;
    overscroll-behavior: none;

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
