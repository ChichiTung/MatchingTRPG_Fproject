<template>
  <div id="front_module_bg">
    <h1 style="text-align: center; font-size: 3vw; color: bisque;"> 模 組 任 務 </h1>
    <n-divider />
    <div class="front_module_content">
      <div
        v-for="module in modules"
        :key="module._id"
        class="col"
      >
        <ModuleCard v-bind="module" class="module_card" />

      </div>

    </div>
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

<style lang="scss">
#front_module_bg {
  width: 100vw;
  height: 200vh;
  margin-top: 2vh;
  background: #2F4F40;

 .front_module_content {
  width: 80vw;
  height: 200vh;
  margin: auto;
  display: flex;

  .col {
    width: 20%;
    margin-left: 5%;
  }
  }
}

</style>
