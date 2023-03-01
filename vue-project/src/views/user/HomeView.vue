<template>
  <div id="user_home">

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

              <div
                v-if="form.updateDisabled === true"
                class="edit_button"
              >
                <n-button
                  strong secondary
                  :disabled="form.loading"
                  circle type="success" size="large"
                  style=" font-size: 15px;"
                  @click="updateDisabled(false)" @keydown.enter.prevent
                >
                  <template #icon>
                    <Edit />
                  </template>
                <!-- &nbsp;編輯 -->
                </n-button>
              </div>
            </n-divider>
          </n-form-item-gi>

          <!-- 探索者照片 -->
          <n-form-item-gi span="xs:9 m:6 l:6" label="探索者照片" path="image">

            <img v-if="form.updateDisabled === true " class="user_img" :src="myInfo.image">

            <!-- <img v-else-if="form.updateDisabled === true" class="user_img" :src="myInfo.image"> -->

            <n-upload
              v-else
              v-model:value="form.image"
              list-type="image-card"
              multiple
              accept=".jpg,.jpeg,.png,.gif,.bmp,.tiff,.svg,.webp"
              :default-file-list="originalImg"
              @change="handleChange"
            >
              更改照片
            </n-upload>

          </n-form-item-gi>

          <!-- 探索者暱稱 -->
          <n-form-item-gi span="xs:9 m:6 l:4" label="探索者暱稱" path="nickname">
            <p
              v-if="form.updateDisabled === true"
              style="font-size: 24px;"
            >
              {{ user.nickname }}
            </p>
            <n-input v-else v-model:value="form.nickname" type="text" />
          </n-form-item-gi>

          <!-- dc_account -->
          <n-form-item-gi span="xs:6 m:3 l:3" label="DC 使用者名稱" path="dc_account">
            <p
              v-if="form.updateDisabled === true"
              style="font-size: 24px;"
            >
              {{ user.dc_account }}
            </p>
            <n-input
              v-else v-model:value="form.dc_account" clearable
              style="background-color: #9D9FDD88"
            >
            </n-input>
          </n-form-item-gi>

          <!-- dc_id -->
          <n-form-item-gi span="xs:6 m:3 l:3" label="DC 個人識別碼" path="dc_id">
            <p
              v-if="form.updateDisabled === true"
              style="font-size: 24px;"
            >
              # {{ user.dc_id }}
            </p>
            <n-input
              v-else v-model:value="form.dc_id" clearable
              style="background-color: #9D9FDD88"
            >
            </n-input>
          </n-form-item-gi>

          <!-- 特色 -->
          <!-- <n-form-item-gi span="xs:6 m:3 l:3" label="特色" path="hashtag">
            <div class="tags-wrapper" style="background: #DDA49244; border-radius: 8px; padding: 4%;margin-top: -1px;">
              <n-dynamic-tags
                v-model:value="form.hashtag" type="primary" round input-style="warning"
              />
            </div>
          </n-form-item-gi> -->

          <!-- INTRO -->
          <n-form-item-gi span="xs:9 m:6 l:6" label="探索者自介" path="notice">
            <p
              v-if="form.updateDisabled === true"

              style="font-size: 24px;width: 50vw; height: 20vh;"
            >
              <span v-if="myInfo.intro === null">
                講點什麼讓大家更了解你吧~
              </span>
              <span v-else>
                {{ myInfo.intro }}
              </span>
            </p>
            <n-input
              v-else
              v-model:value="form.intro"
              placeholder="喜歡的模組風格、擅長推理或RP... 等等，能讓大家更了解你的內容都可以放在這裡喔~ :))"
              type="textarea"
              :autosize="{
                minRows: 3,
                maxRows: 10
              }"
            />
          </n-form-item-gi>

          <!-- dateTime -->
          <!-- <n-form-item-gi span="xs:6 m:3 l:3" label="Datetime" path="datetimeValue">
            <n-date-picker v-model:value="form.datetimeValue" type="datetime" />
          </n-form-item-gi> -->

          <!-- 取消 -->
          <n-gi span="2" :offset="8">
            <div v-if="form.updateDisabled === false" style="display: flex; justify-content: flex">
              <n-button
                type="error" ghost
                :disabled="form.loading"
                round size="large"
                style="width: 9vw; height: 2.2vw; font-size: 1rem;"
                @click="cancel()"
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
                round type="success" size="large"
                style="width: 9vw; height: 2.2vw; font-size: 1rem;"
                attr-type="submit" @keydown.enter.prevent
              >
                存 &nbsp;&nbsp; 檔
              </n-button>

            </div>
          </n-gi>

        </n-grid>
      </n-form>
    </div>
  </div>

</template>

<script setup></script>
import { apiAuth } from '@/plugins/axios'
import { ref, reactive } from 'vue'
// import { useRoute, useRouter } from 'vue-router'

import { useMessage } from 'naive-ui'
// import { storeToRefs } from 'pinia'
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

const myInfo = reactive([])

const form = reactive({
  account: '',

  nickname: '',
  dc_account: '',
  dc_id: 0,
  // email: '',
  image: [],
  intro: '',

  loading: false,
  updateDisabled: true,
  idx: -1
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

const updateDisabled = (idx) => {
  console.log(idx)

  if (idx !== true) {
    // originalImg.value.length = 0
    originalImg.value.length = 0

    form.account = myInfo.account
    form.nickname = myInfo.nickname
    form.dc_account = myInfo.dc_account
    form.dc_id = myInfo.dc_id
    form.email = myInfo.email
    form.image = myInfo.image[0]
    form.intro = myInfo.intro

    console.log('{form.image}')
    // originalImg.value.push(
    //   ...form.image.map((image, idx) => {
    //     return {
    //       idx: idx.toString(),
    //       name: idx.toString(),
    //       status: 'finished',
    //       url: image
    //     }
    //   })
    // )

    // if (myInfo.image !== null) {

    // }

    form.loading = false
    form.updateDisabled = -1
    form.idx = idx
  }
  form.updateDisabled = false
}

const cancel = () => {
  form.account = ''

  form.nickname = ''
  form.dc_account = ''
  form.dc_id = ''
  form.email = ''
  form.image = ''
  form.intro = ''

  form.loading = false
  form.updateDisabled = true
}

const submit = async () => {
  // if (!form.valid) return

  form.loading = true

  // fd.append(key, value)
  const fd = new FormData()
  fd.append('nickname', form.nickname)
  fd.append('dc_account', form.dc_account)
  fd.append('dc_id', form.dc_id)
  fd.append('intro', form.intro)

  // image
  if (form.image.length >= 1) {
    form.image.forEach(item => {
      fd.append('image', item)
    })
  }
  // else {
  //   fd.append('image', myInfo.image)
  // }

  try {
    const { data } = await apiAuth.patch('/users/edit/' + user._id, fd)

    myInfo._id = data.result._id
    myInfo.account = data.result.account
    myInfo.password = data.result.password

    myInfo.email = data.result.email
    myInfo.nickname = data.result.nickname
    myInfo.image = data.result.image
    myInfo.intro = data.result.intro
    myInfo.dc_account = data.result.dc_account
    myInfo.dc_id = data.result.dc_id

    message.success('探索者資料 修改成功！')
    form.loading = false
    form.updateDisabled = true

    // form.showModal = false
  } catch (error) {
    message.error('探索者資料 修改失敗')
  }

  form.loading = false
}

(async () => {
  try {
    const { data } = await apiAuth.get('/users/me')
    myInfo._id = data.result._id
    myInfo.account = data.result.account
    myInfo.password = data.result.password

    myInfo.email = data.result.email
    myInfo.nickname = data.result.nickname
    myInfo.image = data.result.image[0]
    // myInfo.image = data.result.image[0]

    myInfo.intro = data.result.intro
    myInfo.dc_account = data.result.dc_account
    myInfo.dc_id = data.result.dc_id

    console.log(data)

    console.log('data.result._img:' + data.result.image[0])
    console.log('myInfo.image:' + myInfo.image)
  } catch (error) {
    console.log(myInfo)
    message.error('探索者資料取得失敗')
  }
})()

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
    .edit_button {
      display: flex;
      justify-content: flex;
      position:absolute;
      right: 0;
      top:-20px;
    }

    .user_img {
      width: 200px;
    }
  }

}

@media screen and (max-width:576px){
      #user_home{
        .user_form{
          .edit_button{
        top: -8px;
      }
        .user_img {
          width: 60vw;
        }
      }
        }
      }

</style>
