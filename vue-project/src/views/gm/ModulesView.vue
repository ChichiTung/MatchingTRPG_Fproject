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

          <td style="width: 35%;"> <n-image :src="module.image[0]" :width="200" /></td>

          <td style="width: 40%;font-size: 25px;">{{ module.name }}</td>

          <td style="width: 15%">
            <!-- {{ module.living }} -->
            <n-switch v-model:value="module.living" />
          </td>
          <td style="width: 10%">
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
            <n-upload
              v-model:value="form.image"
              list-type="image-card"
              multiple
              accept=".jpg,.jpeg,.png,.gif,.bmp,.tiff,.svg,.webp"
              :default-file-list="originalImg"
              @change="handleChange"
            >
              新增圖片
            </n-upload>
          </n-form-item-gi>

          <!-- 預估時長 -->
          <n-form-item-gi span="xs:6 m:3 l:3" label="預估時長 (以最短時間計算)" path="minTime">
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
            <n-input-number v-model:value="form.pl" :default-value="1" clearable>
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
          <n-form-item-gi span="xs:6 m:3 l:3" label="難度" path="difficulty">
            <n-rate v-model:value="form.difficulty" :default-value="0.5" allow-half color="#4fb233" />
          </n-form-item-gi>

          <!-- 劇本說明 -->
          <n-form-item-gi span="xs:9 m:6 l:6" label="模組說明" path="info">
            <n-input
              v-model:value="form.info"
              placeholder="建議這邊只放最簡單的模組介紹就好~"
              type="textarea"
              :autosize="{
                minRows: 3,
                maxRows: 10
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
                maxRows: 10
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
                attr-type="submit" @keydown.enter.prevent
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
import { useMessage } from 'naive-ui'
import { Edit } from '@vicons/carbon'
import { BookAdd24Regular } from '@vicons/fluent'

// const formRef = ref(null)
const message = useMessage()
const size = ref('medium')

const originalImg = ref([])

const handleChange = options => {
  console.log(options.fileList)

  let i = []
  let j = []
  i = options.fileList.map(image => image.url).filter(url => url !== null)
  j = options.fileList.map(image => image.file).filter(url => url !== null)
  form.image = [...i, ...j]
}

const modules = reactive([])
// const valid = ref(null)
// const loading = ref(false)

const form = reactive({
  // _id 有東西代表正在編輯，空的代表新增中
  _id: '',
  name: '',
  // gm: '',
  living: false,
  image: [],
  minTime: 0.5,
  pl: 1,
  difficulty: 0.5,
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
    form._id = ''
    form.name = ''
    // f = ''
    form.living = false
    // 先給他一個空陣列
    form.image = []
    form.minTime = 0.5
    form.pl = 1
    form.difficulty = 0.5
    form.hashtag = []
    form.info = ''
    form.notice = ''
    form.ccfoliaLink = ''
    form.discordLink = ''

    // 給 form 用的
    // form.valid = false
    // 目前有沒有送出東西
    form.loading = false
    form.idx = -1

    // 多圖上傳時，要先預設空值
    originalImg.value.length = 0
  } else {
    originalImg.value.length = 0

    form._id = modules[idx]._id
    form.name = modules[idx].name
    // form.gm = modules[idx].gm
    form.living = modules[idx].living
    form.image = modules[idx].image
    form.minTime = modules[idx].minTime
    form.pl = modules[idx].pl
    form.difficulty = modules[idx].difficulty
    form.hashtag = modules[idx].hashtag
    form.info = modules[idx].info
    form.notice = modules[idx].notice
    form.ccfoliaLink = modules[idx].ccfoliaLink
    form.discordLink = modules[idx].discordLink

    originalImg.value.push(
      ...form.image.map((image, idx) => {
        return {
          id: idx.toString(),
          name: idx.toString(),
          status: 'finished',
          url: image
        }
      })
    )

    // 給 form 用的
    // form.valid = false
    // 目前有沒有送出東西
    form.loading = false
    form.idx = idx
  }
  form.showModal = true
}

const submit = async () => {
  // if (!form.valid) return

  form.loading = true

  // fd.append(key, value)
  const fd = new FormData()
  fd.append('name', form.name)
  // fd.append('gm', form.gm)
  fd.append('living', form.living)
  // image
  if (form.image.length >= 1) {
    form.image.forEach(item => {
      fd.append('image', item)
    })
  }
  fd.append('minTime', form.minTime)
  fd.append('pl', form.pl)
  fd.append('difficulty', form.difficulty)
  for (const i of form.hashtag) {
    fd.append('hashtag', i)
  }
  fd.append('info', form.info)
  fd.append('notice', form.notice)
  fd.append('ccfoliaLink', form.ccfoliaLink)
  fd.append('discordLink', form.discordLink)

  try {
    if (form._id.length === 0) {
      const { data } = await apiAuth.post('/modules', fd)
      // console.log(data)
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
    message.error(error?.response?.data?.message || '發生錯誤')
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
