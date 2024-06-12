<template>
  <div class="panel-container">
    <div class="template">
      <div class="title">新建空白页</div>
      <div class="card-wrapper">
        <div class="card" @click="handleClickCreate">
          <div class="wrapper">
            <img :src="createIcon" />
          </div>
          <div class="desc">
            <div class="title">空白文稿</div>
          </div>
        </div>
        <Card class="template-card" :data="item" v-for="item, index in templates" :key="index" />
      </div>
    </div>
    <div class="history" v-if="historys.length">
      <div class="title">近期文稿</div>
      <div class="card-wrapper">
        <Card @click="handleClickHistory(item)" class="history-card" :data="item" v-for="item, index in historys" :key="index" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Card from './Card.vue'
import createIcon from '../../assets/image/create-icon.png'
import { useIpcEmit } from "@renderer/composables";
import { useChatSession } from '@renderer/store/useChatSession';
import { nanoid } from 'nanoid'

const emit = defineEmits(['updateStep'])
const { activityId } = useChatSession()
const templates = ref([
  {
    title: 'Slidev功能介绍',
    user: '大奔',
  },
  {
    title: 'Slidev功能介绍',
    user: '大奔',
  },
  {
    title: 'Slidev功能介绍',
    user: '大奔',
  },
])

const historys = ref([])

async function init() {
  const files = await useIpcEmit.fileManager('readAllJsonFiles', {
    dirName: 'json',
  }) as {
    title: string
    createTime: string
    user: string
    image: string
  }[]

  historys.value = files?.map(item => {
    console.log(item)
    return {
      title: item.title,
      createTime: item.createTime,
      image: item.image,
    }
  }) || []
}

init()

function handleClickHistory(item: {id?: string}) {
  if (!item?.id) return

  activityId.value = item.id
  emit('updateStep', 2)
}

function handleClickCreate() {
  activityId.value = nanoid()

  emit('updateStep', 2)
}
</script>

<style lang="scss" scoped>
.panel-container {
  width: 100%;
  height: 100%;
  padding: 24px;
  overflow-y: auto;
  background: #edf6ff;

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

  .template {
    padding: 24px;
    background: #fff;
    border-radius: 12px;

    .title {
      height: 25px;
      margin-bottom: 12px;
      font-size: 18px;
      line-height: 25px;
      color: #000;
      text-align: left;
    }

    .card-wrapper {
      display: flex;
      flex-wrap: wrap;

      .card {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: max-content;
        margin-right: 20px;
        margin-bottom: 22px;
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

          img {
            width: 44px;
            height: 44px;
          }
        }

        .desc {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 8px;

          .title {
            height: 20px;
            font-size: 14px;
            line-height: 20px;
            color: #3c3c3c;
            text-align: left;
          }
        }
      }

      .template-card {
        margin-right: 20px;
      }
    }
  }

  .history {
    padding: 24px;
    margin-top: 16px;
    background: #fff;
    border-radius: 12px;

    .title {
      height: 25px;
      margin-bottom: 12px;
      font-size: 18px;
      line-height: 25px;
      color: #000;
      text-align: left;
    }

    .card-wrapper {
      display: flex;
      flex-wrap: wrap;
      width: 100%;

      .history-card {
        width: 23%;
        margin-right: 25px;
        margin-bottom: 22px;

        :deep() {
          .wrapper {
            width: 100%;
            height: 174px;
          }
        }
      }
    }
  }
}
</style>
