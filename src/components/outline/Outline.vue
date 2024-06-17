<template>
  <div class="outline">
    <!-- 标题 -->
    <div class="outline-title">
      <span class="title">大纲</span>
    </div>

    <!-- 大纲内容 -->
    <div class="outline-ctn">
      <div class="empty" v-if="!loading && !treeData?.length">
        请点击主图右侧生成按钮生成大纲
      </div>
      <!-- 骨架屏 -->
      <OutlineSkeleton v-else-if="loading && !treeData?.length" :length="count" />

      <template v-else>
        <!-- 大纲内容 -->
        <Draggable
          ref="treeRef"
          class="mtl-tree"
          v-model="outline.content"
          :indent="46"
          :treeLineOffset="24"
          treeLine
        >
          <template #default="{ node, stat }">
            <OpenIcon
              v-if="stat.children.length"
              :open="stat.open"
              class="mtl-mr"
              @click.native="stat.open = !stat.open"
            />
            <InputText v-model="node.title"></InputText>
            <i class="pi pi-times" @click="deleteItem(node)"></i>
          </template>
        </Draggable>

        <!-- 大纲按钮 -->
        <div class="outline-btns">
          <Button
            type="button"
            label="新增页"
            icon="pi pi-plus"
            @click="addCard"
            outlined
          >
          </Button>
        </div>
        <!-- 总页数 -->
        <div class="outline-count">
          <span class="count">总页数：{{ outlineCount }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, unref } from 'vue';
import { Draggable, OpenIcon } from '@he-tree/vue';
import { useOutlineStore } from '@renderer/store';
import OutlineSkeleton from './OutlineSkeleton.vue';
import '@he-tree/vue/style/default.css';
import '@he-tree/vue/style/material-design.css';
import { Outline } from '@renderer/types/outline';

const { outline, loading, count, outlineCount } = useOutlineStore();
const treeData = computed(() => unref(outline).content);
const treeRef = ref(null);

/** 新增页 */
function addCard () {
  unref(treeRef).add({ title: '新页' }, null);
  console.log('[ treeData ] >', unref(treeData))
}

/** 删除页 */
function deleteItem(item: Outline) {
  const stat = unref(treeRef).getStat(item);
  unref(treeRef).remove(stat);
}
</script>

<style scoped lang="scss">
.outline {
  &-title {
    margin-top: 20px;
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

    .empty {
      color: #999;
    }
  }

  .mtl-tree {
    :deep() {
      .tree-node {
        margin-bottom: 8px;

        &:hover {
          background: #fff;
        }

        &-inner {
          display: flex;
          align-items: center;
          height: 44px;
          padding: 0 12px;
          color: #333;
          background: #f2f4f7;
          border-radius: 8px;

          input {
            flex: 1;
            margin-right: 16px;
            background: transparent;
            border: none;
            outline: none;
            box-shadow: none;
          }

          .pi-times {
            margin-left: auto;
            color: #999;
            cursor: pointer;

            &:hover {
              color: #ff4d4f;
            }
          }
        }
      }

      /* stylelint-disable-next-line selector-class-pattern */
      .he-tree__open-icon {
        font-size: 20px;
      }

      .tree-vline {
        top: -8px;
        background: #dfe9f7;
      }

      .tree-hline {
        width: 21px;
        background: #dfe9f7;
      }
    }
  }

  &-btns {
    display: flex;
    justify-content: center;
    margin-top: 8px;

    button {
      width: 100%;
      background: rgb(167 243 208 / 40%);

      &:hover {
        background: rgb(167 243 208 / 70%);
      }
    }
  }

  &-count {
    height: 17px;
    margin-top: 4px;
    margin-bottom: -px;
    font-size: 12px;
    line-height: 17px;
    color: #999;
  }
}
</style>
