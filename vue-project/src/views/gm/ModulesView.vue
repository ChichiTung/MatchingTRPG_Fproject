<template>
<<<<<<< HEAD

</template>
=======
  <div id="ModulesView">
    <div class="h1" textcenter>
      <n-divider dashed>
        模組庫
      </n-divider>
    </div>
    <!-- <n-grid cols="12" responsive="screen"> -->
    <!-- 新增商品按鈕 -->
    <n-button color="#2F4F40" @click="showModal(-1)">
      新增模組
    </n-button>

    <n-table id="moduleTable" :single-line="false">
      <thead>
        <tr>
          <th>圖片</th>
          <th>名稱</th>
          <th>管理</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(module, ) in modules" :key="module._id">
          <td> <img :src="product.image" :aspect-ratio="1" :width="200"></td>
          <td>{{ product.name }}</td>
          <td>
            <n-button color="#8a9" variant="text" @click="showModal(idx)" />
          </td>
        </tr>
      </tbody>
    </n-table>

    <n-modal v-model:show="form.showModal">

      <!-- rules 要再修 -->
      <n-form
        :model="form"

        :size="size"
        label-placement="top"
        style="background-color: #F8E9DD; border-radius: 15px; padding: 2%;"
        @submit.prevent="submit"
      >
        <n-grid cols="6 l:12" item-responsive responsive="screen" x-gap="30">

          <n-form-item-gi span="12">
            <n-divider
              title-placement="left"
              style="--n-color: #5d8585; --n-text-color: #5d8585; margin: -8vh 0 -10vh 0;"
            >
              <h2 v-if="form._id.length >0" style="text-align: center;  width: 100%;">編 輯 商 品</h2>
              <h2 v-else style="text-align: center;width: 100%; font-size: 2vw;">新 增 商 品</h2>
            </n-divider>
          </n-form-item-gi>

          <!--  公開/隱藏 -->
          <n-form-item-gi span="12" path="living">

            <n-switch v-model:value="form.living" size="large" style="position: absolute; right: 0;">
              <template #checked>
                公開
              </template>
              <template #unchecked>
                隱藏
              </template>
            </n-switch>
          </n-form-item-gi>

          <!-- 劇本名字 -->
          <n-form-item-gi span="xs:9 m:6 l:6" label="模組名稱" path="name">
            <n-input v-model:value="form.name" placeholder=" " type="text" />
          </n-form-item-gi>

          <!-- 劇本圖片 -->
          <n-form-item-gi span="xs:9 m:6 l:6" label="模組圖片" path="image">
            <!-- <n-input v-model:value="model.image" placeholder=" " /> -->
            <n-upload
              action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
              :default-file-list="form.image"
              list-type="image-card"
            >
            </n-upload>
          </n-form-item-gi>

          <!-- 預估時長 -->
          <n-form-item-gi span="xs:6 m:3 l:3" label="預估時長" path="minTime">
            <n-select
              v-model:value="form.minTime"
              placeholder="預估時長"
            />
          </n-form-item-gi>

          <!-- 建議人數 -->
          <n-form-item-gi span="xs:6 m:3 l:3" label="PL 人數" path="pl">
            <n-select
              v-model="form.pl"
              placeholder="建議人數"
            />
          </n-form-item-gi>

          <!-- 新舊卡 -->
          <n-form-item-gi span="xs:6 m:3 l:3" label="難度" path="pc">
            <n-rate v-model="form.difficullty" color="#4fb233" />

          </n-form-item-gi>

          <!-- 劇本說明 -->
          <n-form-item-gi span="xs:9 m:6 l:6" label="模組說明" path="info">
            <n-input
              v-model="form.info"
              placeholder="模組說明地說~"
              type="textarea"
              :autosize="{
                minRows: 3,
                maxRows: 5
              }"
            />
          </n-form-item-gi>

          <!-- 額外補充(注意事項) -->
          <n-form-item-gi span="xs:9 m:6 l:6" label="額外補充(注意事項)" path="notice">
            <n-input
              v-model="form.notice"
              placeholder="角卡說明之類的喔~"
              type="textarea"
              :autosize="{
                minRows: 3,
                maxRows: 5
              }"
            />
          </n-form-item-gi>

          <!-- ccfolia -->
          <n-form-item-gi span="xs:9 m:6 l:6" label="可可亞連結" path="ccfoliaLink">
            <n-input v-model="form.ccfoliaLink" placeholder=" " style="background-color: #F5BBA9;" />
          </n-form-item-gi>

          <!-- discord -->
          <n-form-item-gi span="xs:9 m:6 l:6" label="Discord 連結" path="discordLink">
            <n-input v-model="form.discordLink" placeholder=" " style="background-color: #9D9FDD;" />
          </n-form-item-gi>

          <!-- dateTime -->
          <!-- <n-form-item-gi span="xs:6 m:3 l:3" label="Datetime" path="datetimeValue">
            <n-date-picker v-model:value="form.datetimeValue" type="datetime" />
          </n-form-item-gi> -->

          <!-- 存檔鈕 -->
          <n-gi span="2">
            <div style="display: flex; justify-content: flex">
              <n-button
                type="error" ghost
                :disabled="form.loading"
                round size="large" style="width: 12vw; height: 3vw; font-size: 1.5vw;"
                @click="form.showModal = false"
              >
                取 &nbsp;&nbsp; 消
              </n-button>

            </div>
          </n-gi>

          <n-gi span="2">
            <div style="display: flex; justify-content: flex">
              <n-button
                :disabled="form.loading"
                round type="primary" size="large" style="width: 12vw; height: 3vw; font-size: 1.5vw; "
              >
                存 &nbsp;&nbsp; 檔
              </n-button>

            </div>
          </n-gi>

        </n-grid>
      </n-form>
    </n-modal>

    <!-- </n-grid> -->

  </div>
</template>

<script setup>
import { apiAuth } from '@/plugins/axios'
import { h, defineComponent, ref, reactive } from 'vue'
// import { useDialog } from 'naive-ui'
import Swal from 'sweetalert2'

// const formRef = ref(null)
// const message = useMessage()

const size = ref('medium')

const modules = reactive([])

const form = reactive({
  // _id 有東西代表正在編輯，空的代表新增中
  _id: '',

  name: '',
  // gm: '',
  living: false,
  image: undefined,
  minTime: 0,
  pl: 1,
  difficullty: 0.5,
  hashtag: '',
  info: '',
  notice: '',
  ccfoliaLink: '',
  discordLink: '',

  // 給 form 用的
  valid: false,
  // 目前有沒有送出東西
  loading: false,
  showModal: false
})

const rules = {}

const showModal = (idx) => {
  if (idx === -1) {
    form._id = ''

    form.name = ''
    form.gm = ''
    form.living = false
    form.image = undefined
    form.minTime = 0
    form.pl = 1
    form.difficullty = 0.5
    form.hashtag = ''
    form.info = ''
    form.notice = ''
    form.ccfoliaLink = ''
    form.discordLink = ''

    // 給 form 用的
    form.valid = false
    // 目前有沒有送出東西
    form.loading = false
    form.idx = idx
  } else {
    form._id = modules[idx]._id

    form.name = modules[idx].name
    form.gm = modules[idx].gm
    form.living = modules[idx].living
    form.image = undefined
    form.minTime = modules[idx].minTime
    form.pl = modules[idx].pl
    form.difficullty = modules[idx].difficullty
    form.hashtag = modules[idx].hashtag
    form.info = modules[idx].info
    form.notice = modules[idx].notice
    form.ccfoliaLink = modules[idx].ccfoliaLink
    form.discordLink = modules[idx].discordLink

    // 給 form 用的
    form.valid = false
    // 目前有沒有送出東西
    form.loading = false
    form.idx = idx
  }
  form.showModal = true
}

const submit = async () => {
  if (!form.valid) return

  form.loading = true

  // fd.append(key, value)
  const fd = new FormData()
  fd.append('name', form.name)
  fd.append('gm', form.gm)
  fd.append('living', form.living)
  fd.append('image', form.image)
  fd.append('minTime', form.minTime)
  fd.append('hashtag', form.hashtag)
  fd.append('info', form.info)
  fd.append('notice', form.notice)
  fd.append('ccfoliaLink', form.ccfoliaLink)
  fd.append('discordLink', form.discordLink)

  try {
    if (form._id.length === 0) {
      const { data } = await apiAuth.post('/modules', fd)
      modules.push(data.result)
      Swal.fire({
        icon: 'success',
        title: '成功',
        text: '模組新增成功'
      })
    } else {
      const { data } = await apiAuth.patch('/modules/' + form._id, fd)
      modules[form.idx] = data.result
      Swal.fire({
        icon: 'success',
        title: '成功',
        text: '編輯成功'
      })
    }
    form.showModal = false
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: error?.response?.data?.message || '發生錯誤'
    })
  }

  form.loading = false
};

(async () => {
  try {
    const { data } = await apiAuth.get('/modules/all')
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
#ModulesView {
  /* background: #e6c5c5; */
  height: 100vh;
  #moduleTable {
    width: 80%;
    margin: auto;
    // justify-content: center;
  }
}
</style>
>>>>>>> master
