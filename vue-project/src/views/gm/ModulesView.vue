<template>
  <div id="ModulesView">
    <div class="h1" textcenter>
      <n-divider dashed style="font-size: 3vw; color: rgb(240,162,23);">
        模組庫
      </n-divider>
    </div>
    <!-- <n-grid cols="12" responsive="screen"> -->
    <!-- 新增商品按鈕 -->
    <n-button color="#5d8585" rounded style="position: absolute; top: 18%; right:10%; padding: 1.5%;" @click="showModal(-1)">
      <template #icon>
        <BookAdd24Regular style="font-size: 24px;" />
      </template>
      新增模組
    </n-button>

    <n-table id="moduleTable" :single-line="false" striped style="margin-top: 5%;">
      <thead>
        <tr>
          <th style="text-align: center;">圖片</th>
          <th style="text-align: center;">名稱</th>
          <th style="text-align: center;">公開狀態</th>
          <th style="text-align: center;">管理</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(module, idx) in modules" :key="module._id" style="text-align: center;">
          <td> <n-image :src="module.image" :width="200" /></td>
          <td>{{ module.name }}</td>

          <td>
            <!-- {{ module.living }} -->
            <n-switch v-model:value="module.living" />
          </td>
          <td>
            <n-button strong secondary circle type="error" @click="showModal(idx)">
              <template #icon>
                <n-icon><Edit /></n-icon>
              </template>
            </n-button>
          </td>
        </tr>
      </tbody>
    </n-table>

    <!-- :trap-focus="false" 要加上去 要不然 input 打不了字 QAQQQQ -->
    <n-modal v-model:show="form.showModal" :trap-focus="false" :mask-closable="false">

      <!-- rules 要再修 -->
      <n-form
        :model="form"
        :rules="rules"
        :size="size"
        label-placement="top"
        style="background-color: #F8E9DD; border-radius: 15px; padding: 2%;"
        @submit.prevent="submitClick"
      >
        <n-grid cols="6 l:12" item-responsive responsive="screen" x-gap="30">

          <n-form-item-gi span="12">
            <n-divider
              title-placement="left"
              style="--n-color: #5d8585; --n-text-color: #5d8585; margin: -8vh 0 -10vh 0;"
            >
              <h2 v-if="form._id.length >0" style="text-align: center;  width: 100%;">編 輯 模 組</h2>
              <h2 v-else style="text-align: center;width: 100%; font-size: 2vw;">新 增 模 組</h2>
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
            <n-input v-model:value="form.name" placeholder="" type="text" />
          </n-form-item-gi>
          <!-- 劇本圖片 -->
          <n-form-item-gi span="xs:9 m:6 l:6" label="模組圖片" path="image">
            <!-- <n-input v-model:value="model.image" placeholder=" " /> -->
            <n-upload
              v-model:value="form.image"
              list-type="image-card"
              accept=".jpg,.jpeg,.png,.gif,.bmp,.tiff,.svg,.webp"
              :default-file-list="originalBanners"
              @change="handleChange"
            />
          </n-form-item-gi>

          <!-- 預估時長 -->
          <n-form-item-gi span="xs:6 m:3 l:3" label="預估時長" path="minTime">
            <!-- <n-select
              v-model:value="form.minTime"
              placeholder="預估時長"
            /> -->
            <n-input-number v-model:value="form.minTime" :default-value="1" clearable>
              <template #suffix>
                <div style="margin-left:-50px; padding-right: 60px;">
                  小時
                </div>
              </template>
            </n-input-number>
          </n-form-item-gi>

          <!-- 建議人數 -->
          <n-form-item-gi span="xs:6 m:3 l:3" label="PL 人數" path="pl">
            <!-- <n-select
              v-model="form.pl"
              placeholder="建議人數"
            /> -->
            <n-input-number v-model:value="form.pl" placeholder="建議人數" clearable>
              <template #suffix>
                <div style="margin-left:-50px; padding-right: 60px;">
                  人
                </div>
              </template>
            </n-input-number>
          </n-form-item-gi>

          <!-- 特色 -->
          <n-form-item-gi span="xs:6 m:3 l:3" label="特色" path="hashtag">
            <div class="tags-wrapper" style="background: #DDA49244; border-radius: 8px; padding: 4%;margin-top: -1px;">
              <n-dynamic-tags
                v-model:value="form.hashtag" type="primary" round input-style="warning"
              />
            </div>
          </n-form-item-gi>

          <!-- 難度 -->
          <n-form-item-gi span="xs:6 m:3 l:3" label="難度" path="pc">
            <n-rate v-model:value="form.difficullty" :default-value="0.5" allow-half color="#4fb233" />

          </n-form-item-gi>

          <!-- 劇本說明 -->
          <n-form-item-gi span="xs:9 m:6 l:6" label="模組說明" path="info">
            <n-input
              v-model:value="form.info"
              placeholder="建議這邊只放最簡單的模組介紹就好~"
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
              v-model:value="form.notice"
              placeholder="有關 HO情報、公開情報、紙娃娃素材...等，是放在這區喔 :))"
              type="textarea"
              :autosize="{
                minRows: 3,
                maxRows: 5
              }"
            />
          </n-form-item-gi>

          <!-- ccfolia -->
          <n-form-item-gi span="xs:9 m:6 l:6" label="可可亞連結" path="ccfoliaLink">
            <n-input v-model:value="form.ccfoliaLink" placeholder=" " style="background-color: #F5BBA9;" />
          </n-form-item-gi>

          <!-- discord -->
          <n-form-item-gi span="xs:9 m:6 l:6" label="Discord 連結" path="discordLink">
            <n-input v-model:value="form.discordLink" placeholder=" " style="background-color: #9D9FDD;" />
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
                round type="primary" size="large" style="width: 12vw; height: 3vw; font-size: 1.5vw;"
                attr-type="submit"
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
import { ref, reactive } from 'vue'
import Swal from 'sweetalert2'
// import validator from 'validator'
// import { useMessage } from 'naive-ui'
import { Edit } from '@vicons/carbon'
import { BookAdd24Regular } from '@vicons/fluent'

// const formRef = ref(null)
// const message = useMessage()
const size = ref('medium')

// const showModalImageRef = ref(false)
// const previewImageUrlRef = ref('')
// function handleChange (file) {
//   const { url } = file
//   previewImageUrlRef.value = url
//   showModalImageRef.value = true
// }
const originalBanners = ref([])
const handleChange = (options) => {
  let i = []
  let j = []
  i = options.fileList.map(image => image.url).filter(url => url !== null)
  j = options.fileList.map(image => image.file).filter(url => url !== null)
  form.value.image = [...i, ...j]
}

const modules = reactive([])
// const valid = ref(null)
// const loading = ref(false)

const form = ref({
  // _id 有東西代表正在編輯，空的代表新增中
  _id: '',

  name: '',
  // gm: '',
  living: false,
  image: [],
  minTime: 0.5,
  pl: 1,
  difficullty: 0.5,
  hashtag: ['19世紀', '復活本'],
  info: '',
  notice: '',
  ccfoliaLink: '',
  discordLink: '',

  // 給 form 用的
  // valid: false,
  // 目前有沒有送出東西
  loading: false,
  showModal: false,

  idx: -1
})

const rules = {
  name: [
    {
      required: true,
      validator (rule, value) {
        if (!value) {
          return new Error('模組名稱必填')
        }
      },
      trigger: ['input', 'blur']
    }
  ],

  hashtag: {
    type: 'array',
    trigger: ['change'],
    validator (rule, value) {
      if (value.length >= 4) { return new Error('標籤不能超過 3 個') }
      return true
    }
  }
}

const showModal = (idx) => {
  if (idx === -1) {
    form.value._id = ''

    form.value.name = ''
    // form.gm = ''
    form.value.living = false
    form.value.image = undefined
    form.value.minTime = 0
    form.value.pl = 1
    form.value.difficullty = 0.5
    form.value.hashtag = []
    form.value.info = ''
    form.value.notice = ''
    form.value.ccfoliaLink = ''
    form.value.discordLink = ''

    // 給 form 用的
    // form.valid = false
    // 目前有沒有送出東西
    form.value.loading = false
    form.value.idx = -1
  } else {
    form.value._id = modules[idx]._id

    form.value.name = modules[idx].name
    // form.gm = modules[idx].gm
    form.value.living = modules[idx].living
    form.value.image = undefined
    form.value.minTime = modules[idx].minTime
    form.value.pl = modules[idx].pl
    form.value.difficullty = modules[idx].difficullty
    form.value.hashtag = modules[idx].hashtag
    form.value.info = modules[idx].info
    form.value.notice = modules[idx].notice
    form.value.ccfoliaLink = modules[idx].ccfoliaLink
    form.value.discordLink = modules[idx].discordLink

    // 給 form 用的
    // form.valid = false
    // 目前有沒有送出東西
    form.value.loading = false
    form.value.idx = idx
  }
  form.value.showModal = true
}

const submit = async () => {
  // if (!form.valid) return

  form.value.loading = true

  // fd.append(key, value)
  const fd = new FormData()
  fd.append('name', form.value.name)
  // fd.append('gm', form.gm)
  fd.append('living', form.value.living)

  for (const i of form.value.image) {
    fd.append('image', i)
  }
  // fd.append('image', form.value.image)

  fd.append('minTime', form.value.minTime)

  for (const i of form.value.hashtag) {
    fd.append('hashtag', i)
  }

  fd.append('info', form.value.info)

  fd.append('notice', form.value.notice)
  fd.append('ccfoliaLink', form.value.ccfoliaLink)
  fd.append('discordLink', form.value.discordLink)

  try {
    if (form.value._id.length === 0) {
      const { data } = await apiAuth.post('/modules', fd)
      // console.log(data)
      modules.push(data.result)
      Swal.fire({
        icon: 'success',
        title: '成功',
        text: '模組新增成功'
      })
    } else {
      const { data } = await apiAuth.patch('/modules/' + form.value._id, fd)
      modules[form.value.idx] = data.result
      Swal.fire({
        icon: 'success',
        title: '成功',
        text: '編輯成功'
      })
    }
    form.value.showModal = false
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: error?.response?.data?.message || '發生錯誤'
    })
  }

  form.value.loading = false
};

(async () => {
  try {
    const { data } = await apiAuth.get('/modules/all')
    modules.push(...data.result)

    originalBanners.value.push(...data.result[0].image.map((image, idx) => {
      return {
        id: idx.toString(),
        name: idx.toString(),
        status: 'finished',
        url: image
      }
    }))
    form.value.banners = originalBanners.value
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: error?.response?.data?.message || '發生錯誤'
    })
  }
})()

function submitClick (e) {
  console.log(form)
  // e.preventDefault()
  submit()
  // valid.value?.validate(errors => {
  //   if (!errors) {
  //     message.success('模組新增成功')
  //     submit()
  //   } else {
  //     console.log(errors)
  //     message.error('模組新增失敗')
  //   }
  // })
}
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
