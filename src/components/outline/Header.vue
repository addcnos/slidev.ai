<template>
  <div class="header">
    <div class="header-title">编辑大纲</div>
    <div class="header-toggle">
      <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJDNi40NyAyIDIgNi40NyAyIDEyczQuNDcgMTAgMTAgMTAgMTAtNC40NyAxMC0xMFMxNy41MyAyIDEyIDJaIiBmaWxsPSIjZmZmIi8+CjxwYXRoIGQ9Ik0xMiAxMkwxMiA0TDEyIDEyTDEyIDIwIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=" alt="Toggle Icon" />
    </div>
    <div class="header-close">
      <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEgMUwyMyAyM00yMyAxTDEgMjMiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==" alt="Close Icon" />
    </div>
  </div>
</template>

<script setup lang="ts">

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
