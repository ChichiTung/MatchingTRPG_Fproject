<template>
    <n-config-provider :theme="theme">
    <n-card>
      <n-space>
        <n-button @click="theme = darkTheme">
          深色
        </n-button>
        <n-button @click="theme = null">
          浅色
        </n-button>
      </n-space>
    </n-card>

  <n-back-top :listen-to="target" :bottom="80" :visibility-height="10">
    <div
      style="
        width: 40px;
        height: 25px;
        line-height: 10px;
        text-align: center;
        font-size: 14px;
      "
    >
      <n-icon size="30" color="#F9B02D"><ArrowBarToUp /></n-icon>
    </div>
  </n-back-top>
  
  
  <div
    ref="scrollContainer"
    style="overflow: auto; height: 72px; line-height: 1.5"
  >
  
    这块应该写一个有意思的笑话。<br>
    这块应该写一个有意思的笑话。<br>
    这块应该写一个有意思的笑话。<br>
    这块应该写一个有意思的笑话。<br>
    这块应该写一个有意思的笑话。<br>
    这块应该写一个有意思的笑话。<br>
    这块应该写一个有意思的笑话。<br>
  </div>
</n-config-provider>

</template>

<script lang="ts">
import { darkTheme } from 'naive-ui'
import type { GlobalTheme } from 'naive-ui'
import { ArrowBarToUp } from '@vicons/tabler'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  components: {
    ArrowBarToUp
  },
  setup () {
    const scrollContainerRef = ref<HTMLElement | undefined>(undefined)
    return {
      scrollContainer: scrollContainerRef,
      target: () => scrollContainerRef.value,
      ArrowBarToUp,
      darkTheme,
      theme: ref<GlobalTheme | null>(null)
    }
  },
})


</script>

<style>
body{
  background: rgb(255, 195, 195);
}
</style>
