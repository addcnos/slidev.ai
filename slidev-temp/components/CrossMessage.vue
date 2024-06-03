<script setup lang="ts">
import { watchDebounced  } from '@vueuse/core'
import { MESSAGE_TYPE } from './constants'

const MESSAGE_TYPE = {
  update: 'update',
  changePageNo: 'changePageNo',
}

function messageToParentClient(data: any, type: string) {
  window?.parent?.postMessage(JSON.stringify({
    type,
    data,
  }), '*')
}

window.addEventListener('message', (event) => {
  const { data } = event
  switch (data.type) {
    case MESSAGE_TYPE.changePageNo:
      $slidev.nav.go(data.data)
      break
  }
})

watchDebounced (() => $slidev, (value) => {
  messageToParentClient(value, MESSAGE_TYPE.update)
}, {
  deep: true,
  debounce: 1000
})
</script>

<template>
  <div w-0px h-0px>
  </div>
</template>
