<template>
  <div id="front_module_bg">
    <h1 style="text-align: center; font-size: 3vw; color: bisque;"> 模 組 任 務 </h1>
    <n-divider />
    <n-grid x-gap="12" cols="12" style="margin: 4vh 5vw;">
      <n-gi
        v-for="module in modules"
        :key="module._id" span="3"
      >
        <ModuleCard v-bind="module" />

      </n-gi>

    </n-grid>

  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { api } from '@/plugins/axios'
import Swal from 'sweetalert2'
import ModuleCard from '@/components/ModuleCard.vue'

const modules = reactive([]);

(async () => {
  try {
    const { data } = await api.get('/modules')
    modules.push(...data.result)
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: error?.response?.data?.message || '發生錯誤'
    })
  }
})()

</script>

<style>
#front_module_bg {
  width: 100vw;
  height: 200vh;
  margin-top: 2vh;
  background: #2F4F40;
}

</style>
