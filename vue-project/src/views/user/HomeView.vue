<template>
  <div id="user_home">
    <h1> 探索者檔案</h1>

    <div class="user_form">

      <n-form
        :model="form"
        :rules="rules"
        :size="size"
        :disabled="form.updateDisabled"
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
              <h2 v-if="form.updateDisabled === true" class="title">探 索 者 檔 案</h2>
              <h2 v-else class="title">探 索 者 檔 案 編 修 中</h2>
            </n-divider>
          </n-form-item-gi>

          <!-- 探索者照片 -->
          <n-form-item-gi span="xs:9 m:6 l:6" label="探索者照片" path="image">
            <img v-if="form.updateDisabled === true" src="https://picsum.photos/300/200/?random=10">
            <n-upload
              v-else
              v-model:value="form.image"
              list-type="image-card"
              accept=".jpg,.jpeg,.png,.gif,.bmp,.tiff,.svg,.webp"
              :default-file-list="originalImg"
              @change="handleChange"
            >
              更改照片
            </n-upload>

            <!-- <img src="user.image"> -->
          </n-form-item-gi>

          <!-- 探索者名字 -->
          <n-form-item-gi span="xs:9 m:6 l:6" label="探索者暱稱" path="nickname">
            <p
              v-if="form.updateDisabled === true"
              style="font-size: 24px;"
            >
              {{ user.nickname }}
            </p>
            <n-input v-else v-model:value="user.nickname" type="text" />
          </n-form-item-gi>

          <!-- dc_account -->
          <n-form-item-gi span="xs:6 m:3 l:3" label="DC 名稱" path="dc_account">
            <n-input v-model:value="form.dc_account" clearable>
            </n-input>
          </n-form-item-gi>

          <!-- dc_id -->
          <n-form-item-gi span="xs:6 m:3 l:3" label="DC_id" path="dc_id">
            <n-input v-model:value="form.dc_id" clearable>
            </n-input>
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

          <!-- 取消 -->
          <n-gi span="2">
            <div v-if="form.updateDisabled === false" style="display: flex; justify-content: flex">
              <n-button
                type="error" ghost
                :disabled="form.loading"
                round size="large" style="width: 12vw; height: 3vw; font-size: 1.5vw;"
                @click="form.updateDisabled = true"
              >
                取 &nbsp;&nbsp; 消
              </n-button>

            </div>
          </n-gi>

          <!-- 存檔紐 -->
          <n-gi span="2">
            <div v-if="form.updateDisabled === false" style="display: flex; justify-content: flex">
              <n-button
                :disabled="form.loading"
                round type="primary" size="large" style="width: 12vw; height: 3vw; font-size: 1.5vw;"
                attr-type="submit" @keydown.enter.prevent
              >
                存 &nbsp;&nbsp; 檔
              </n-button>

            </div>
          </n-gi>
          <n-gi span="2">
            <div v-if="form.updateDisabled === true" style="display: flex; justify-content: flex">
              <n-button
                :disabled="form.loading"
                round type="primary" size="large" style="width: 12vw; height: 3vw; font-size: 1.5vw;"
                @click="form.updateDisabled = false" @keydown.enter.prevent
              >
                編 &nbsp;&nbsp; 輯
              </n-button>

            </div>
          </n-gi>

        </n-grid>
      </n-form>
    </div>
  </div>

</template>

<script setup>
import { apiAuth } from '@/plugins/axios'
import { ref, reactive } from 'vue'
// import { useRoute, useRouter } from 'vue-router'

import { useMessage } from 'naive-ui'
import { useUserStore } from '@/stores/user'
import { Edit } from '@vicons/carbon'

// const route = useRoute()
// const router = useRouter()
const user = useUserStore()

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

const form = reactive({
  account: '',

  nickname: '',
  dc_account: '',
  dc_id: '',
  email: '',
  image: [],
  info: '',

  loading: false,
  updateDisabled: true
})

const rules = {
  nickname: [
    {
      required: true,
      validator (rule, value) {
        if (!value) {
          return new Error('暱稱必填')
        }
      },
      trigger: ['input', 'blur']
    }
  ],
  dc_account: [
    {
      required: true,
      validator (rule, value) {
        if (!value) {
          return new Error('暱稱必填')
        }
      },
      trigger: ['input', 'blur']
    }
  ],
  dc_id: [
    {
      required: true,
      validator (rule, value) {
        if (!value) {
          return new Error('暱稱必填')
        }
      },
      trigger: ['input', 'blur']
    }
  ],
  email: [
    {
      required: true,
      validator (rule, value) {
        if (!value) {
          return new Error('暱稱必填')
        }
      },
      trigger: ['input', 'blur']
    }
  ],
  image: [
    {
      required: true,
      validator (rule, value) {
        if (!value) {
          return new Error('探索者照片必放')
        } else if (value.length >= 2) {
          return new Error('照片只能放 1 張')
        }
      }
    }
  ]
}

const updateDisabled = (updateDisabled) => {
  if (updateDisabled === true) {
    originalImg.value.length = 0
    form.account = user.account

    form.nickname = user.nickname
    form.dc_account = user.dc_account
    form.dc_id = user.dc_id
    form.email = user.email
    form.image = user.image[0]
    form.info = user.info

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
    form.loading = false
    form.updateDisabled = true
  }
  form.updateDisabled = false
}

const submit = async () => {
  // if (!form.valid) return

  form.loading = true

  // fd.append(key, value)
  const fd = new FormData()
  fd.append('nickname', form.nickname)
  fd.append('dc_account', form.dc_account)
  fd.append('dc_id', form.dc_id)
  fd.append('info', form.info)

  // image
  if (form.image.length >= 1) {
    form.image.forEach(item => {
      fd.append('image', item)
    })
  }
  try {
    const { data } = await apiAuth.patch('/users/edit/' + user._id, fd)

    console.log(data.result)

    message.success('探索者資料 修改成功！')

    // form.showModal = false
  } catch (error) {
    message.error('探索者資料 修改失敗')
  }

  form.loading = false
}

</script>
<style lang="scss">
#user_home {
  width: 100vw;
  height: 200vh;

  margin-top: 10vh;
  padding-top: 10vh;

  .user_form{

    width: 80vw;
    margin: auto;
    filter: drop-shadow(0.3rem 0.3rem 3rem #272727);

    .title {
      text-align: center;
      width: 100%;
      transition:all 0.5s linear;
    }
  }

}

</style>
