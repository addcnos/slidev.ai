<template>
  <div class="header" :class="isExpand && 'expanded'">
    <div class="header-title">编辑大纲</div>
    <div class="header-toggle" @click="isExpand = !isExpand">
      {{ isExpand ? '-' : '+' }}
    </div>
    <div class="header-close">
      <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEgMUwyMyAyM00yMyAxTDEgMjMiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==" alt="Close Icon" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useOutlineStore } from '@renderer/store';

const { isExpand } = useOutlineStore();
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: #333;
  color: #fff;
  border-bottom: 1px solid #444;
}

.header-title {
  font-size: 18px;
  font-weight: bold;
}

.header-toggle,
.header-close {
  cursor: pointer;
  padding: 5px;
  transition: background-color 0.3s;
}

.header-toggle:hover,
.header-close:hover {
  background-color: #444;
}

.header-toggle img,
.header-close img {
  width: 20px;
  height: 20px;
}
</style>
