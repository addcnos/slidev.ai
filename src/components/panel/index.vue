<template>
  <div class="panel-container">
    <div class="template">
      <div class="title">新建空白页</div>
      <div class="card-wrapper">
        <div class="card" @click="handleClickCreate">
          <div class="wrapper">
            <img src="@assets/images/create-icon.png" />
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
        <Card @click="handleClickHistory(item)" class="history-card" :data="item" v-for="item, index in historys"
          :key="index" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { until } from '@vueuse/core';
import { ref } from 'vue'
import Card from './Card.vue'
import { useIpcEmit } from "@renderer/composables";
import { useChatSession } from '@renderer/store/useChatSession';
import { nanoid } from 'nanoid'
import { useOutlineStore } from '@renderer/store';
import { webcontainerFs } from "@main/webcontainer";

const emit = defineEmits(['updateStep'])
const { activityId, chat, updateJSONCache, updateActivityId } = useChatSession()
const { outline, visible }  = useOutlineStore()
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

const transImage = async (data: Uint8Array) => {
  return new Promise((resolve) => {
    // 假设 data 是一个 ArrayBuffer 对象
    const uint8Array = new Uint8Array(data);
    // 创建一个 Blob 对象
    const blob = new Blob([uint8Array], { type: 'application/octet-stream' });
    // 使用 FileReader 对象读取 Blob 对象中的数据
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    // 当读取完成时触发的事件
    reader.onload = function () {
      let base64String = '';
      if (typeof reader.result === 'string') {
        base64String = reader.result.split(',')[1];
      } else if (reader.result instanceof ArrayBuffer) {
        const binary = new Uint8Array(reader.result);
        base64String = btoa(String.fromCharCode.apply(null, binary));
      }
      resolve(base64String);
    };
  })

}

async function init() {
  const files = await useIpcEmit.fileManager('readAllJsonFiles', {
    dirName: 'json',
  }) as {
    title: string
    createTime: string
    user: string
    image: string
    id: string
  }[]

  const _historys = []
  for (const item of files) {
    if (!item?.id) continue
    const image = await useIpcEmit.fileManager('read', {
      dirName: 'screenshot',
      fileName: `${item?.id}.png`
    })
    const img = await transImage(image as Uint8Array)
    _historys.push({
      title: item.outline.title,
      createTime: item.createTime,
      image: img,
      id: item?.id || ''
    })
  }

  historys.value = _historys.sort((a, b) => new Date(b.createTime).getTime() - new Date(a.createTime).getTime())
}

init()

async function handleClickHistory(item: { id?: string }) {
  if (!item?.id) return
  emit('updateStep', 2)
  updateActivityId(item.id)

  const jsonStr = await useIpcEmit.fileManager('read', {
    dirName: 'json',
    fileName: `${item?.id}.json`
  })

  const _json = JSON.parse(jsonStr as string)
  const useImages:string[] = []
  _json.chat.content.map(i => {
    const reg = /public\/images\/(.*?).png/g
    const res = reg.exec(i.raw)
    if (res) {
      useImages.push(`${res[1]}.png`)
    }
  })
  for (const item of useImages) {
    const image = await useIpcEmit.fileManager('read', {
      dirName: 'assets',
      fileName: `${item}`
    })
    console.log(`public/images/${item}`, image)
    await webcontainerFs().writeFile(`public/images/${item}`, image as Uint8Array)
  }

  Object.assign(chat.value, _json.chat)
  Object.assign(outline.value, _json.outline)
  await updateJSONCache(true)
}

async function handleClickCreate() {
  updateActivityId(nanoid())

  visible.value = true
  await until(visible).toBe(false)

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
            overflow: hidden;
            font-size: 14px;
            line-height: 20px;
            color: #3c3c3c;
            text-align: left;
            text-overflow: ellipsis;
            white-space: nowrap;
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
        width: 210px;
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
