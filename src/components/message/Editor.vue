<template>
  <div class="editor">
    <div class="actions">
      <div v-for="item, index in 7" :key="index" class="action"></div>
    </div>
    <div class="input-panel">
      <textarea placeholder="请输入内容" rows="2"></textarea>
      <!-- <button><div>Send</div></button> -->
      <Button
        label="Submit"
      >Send</Button>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.editor {
  position: relative;
  width: 100%;
  padding: 10px 12px 12px;
  box-sizing: border-box;
  border-top: 1px solid #dedede;
  box-shadow: 0px 2px 4px 0px rgba(0,0,0,.05);

  .actions {
    display: flex;
    flex-wrap: wrap;

    .action {
      margin-right: 5px;
      margin-bottom: 10px;
      display: inline-flex;
      border-radius: 20px;
      font-size: 12px;
      background-color: #fff;
      color: #303030;
      border: 1px solid #dedede;
      padding: 4px 10px;
      animation: icon-transform .3s ease;
      box-shadow: 0px 2px 4px 0px rgba(0,0,0,.05);
      align-items: center;
      height: 12px;
      width: 12px;
      overflow: hidden;
      cursor: pointer;
    }
  }

  .input-panel {
    cursor: text;
    display: flex;
    flex: 1 1;
    border-radius: 10px;
    border: 1px solid #dedede;
    position: relative;

    textarea {
      font-size: 14px;
      height: 100%;
      width: 100%;
      border-radius: 10px;
      border: none;
      box-shadow: 0 -2px 5px rgba(0, 0, 0, .03);
      color: #303030;
      font-family: inherit;
      padding: 10px 80px 10px 14px;
      resize: none;
      outline: none;
      box-sizing: border-box;
      min-height: 68px;

      &::-webkit-scrollbar {
        width: 2px;
      }

      &::-webkit-scrollbar-track {
        background: #dedede;
      }

      &::-webkit-scrollbar-thumb {
        background: #dedede;
      }

      &::-webkit-scrollbar-thumb:hover {
        background: #dedede;
      }
    }

    :deep() {
      .p-button {
        width: 100px;
        margin: 12px 4px 0 0;
        height: 40px;
      }
    }
  }
}

@keyframes icon-transform {
    0% {
      opacity: 0;
      transform: translateY(20px)
    }

    to {
      opacity: 1;
      transform: translateY(0)
    }
}
</style>
