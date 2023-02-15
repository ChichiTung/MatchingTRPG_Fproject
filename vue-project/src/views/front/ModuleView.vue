<template>
  <div id="moduleView_bg">
    <n-grid cols="12">
      <n-gi span="12">
        <h1 style="text-align: center;">
          {{ module.name }}
        </h1>
      </n-gi>

    </n-grid>
  </div>
</template>
<script setup>
import { reactive, ref } from 'vue'
import { api } from '@/plugins/axios'
import { useRoute, useRouter } from 'vue-router'
// import { Swal } from 'sweetalert2'
import { useUserStore } from '@/stores/user'

const route = useRoute()
const router = useRouter()

const user = useUserStore()
const { editFavorite } = user

const valid = ref(false)
const quantity = ref(0)

const rules = {
  required (value) {
    return !!value || '欄位必填'
  },
  number (value) {
    return value > 0 || '數量錯誤'
  }
}

const module = reactive({
  // _id 有東西代表正在編輯，空的代表新增中
  _id: '',
  name: '',
  living: true,
  image: '',
  minTime: 0.5,
  pl: 1,
  difficullty: 0.5,
  hashtag: [],
  info: '',
  notice: '',
  ccfoliaLink: '',
  discordLink: ''
});

// const submitCart = () => {
//   if (!valid.value) return
//   editCart({ _id: product._id, quantity: quantity.value })
// }

(async () => {
  try {
    const { data } = await api.get('/modules/' + route.params.id)
    module._id = data.result._id
    module.living = data.result.living
    module.name = data.result.name
    module.image = data.result.image
    module.pl = data.result.pl
    module.hashtag = data.result.hashtag
    module.info = data.result.info
    module.notice = data.result.notice
    module.ccfoliaLink = data.result.ccfoliaLink
    module.discordLink = data.result.discordLink

    document.title = module.name + ' | Matching TRPG'
  } catch (error) {
    console.log('模組取得失敗')
    router.go(-1)
  }
})()

</script>

<style>
#moduleView_bg{
  width: 100vw;
  height: 100vh;
  background: #2F4F40;
}
</style>
