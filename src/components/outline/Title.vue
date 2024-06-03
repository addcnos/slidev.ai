<template>
  <div class="title" @click="editTheme">
    <div class="title-ctn">
      聊天主题
    </div>
    <div class="title-name">
      <span>{{ theme }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 当前的主题
const theme = ref('学习英语');

// 编辑主题的函数
const editTheme = () => {
  // TODO: 弹出输入框，输入新的主题
  // const newTheme = prompt('请输入新的主题:', theme.value);
  // if (newTheme) {
  //   theme.value = newTheme;
  //   alert('主题已修改，重新生成大纲内容');
  //   // 这里可以添加重新生成大纲内容的逻辑
  // }
};
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  background-color: #2c2c2c;
  color: #e0e0e0;
  border: 1px solid #444;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.title:hover {
  background-color: #3a3a3a;
  transform: translateY(-2px);
}

.title-ctn {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
}

.title-name span {
  font-size: 16px;
}
</style>
