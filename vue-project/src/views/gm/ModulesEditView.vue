<script setup>
import { apiAuth } from '@/plugins/axios'
import { defineComponent, ref, reactive } from 'vue'
import { useMessage } from 'naive-ui'
<<<<<<< HEAD

const formRef = ref(null)
=======
import { ImageAdd24Regular } from '@vicons/fluent'
import Swal from 'sweetalert2'

// const formRef = ref(null)
>>>>>>> master
const message = useMessage()

const size = ref('medium')

const modules = reactive([])
<<<<<<< HEAD
=======

>>>>>>> master
const form = reactive({
  // _id 有東西代表正在編輯，空的代表新增中
  _id: '',

  name: '',
<<<<<<< HEAD
=======
  // gm: '',
>>>>>>> master
  living: false,
  image: undefined,
  minTime: 0,
  pl: 1,
  difficullty: 0.5,
<<<<<<< HEAD
  info: '',
  notice: '',
  ccfoliaLink: '',
  discordLonk: '',
  hashtag: '',
=======
  hashtag: '',
  info: '',
  notice: '',
  ccfoliaLink: '',
  discordLink: '',
>>>>>>> master

  // 給 form 用的
  valid: false,
  // 目前有沒有送出東西
  loading: false
})

const rules = {
  inputValue: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入 inputValue'
  },
  textareaValue: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入 textareaValue'
  },
  selectValue: {
    required: true,
    trigger: ['blur', 'change'],
    message: '请选择 selectValue'
  },
  multipleSelectValue: {
    type: 'array',
    required: true,
    trigger: ['blur', 'change'],
    message: '请选择 multipleSelectValue'
  },
  datetimeValue: {
    type: 'number',
    required: true,
    trigger: ['blur', 'change'],
    message: '请输入 datetimeValue'
  },
  nestedValue: {
    path1: {
      required: true,
      trigger: ['blur', 'input'],
      message: '请输入 nestedValue.path1'
    },
    path2: {
      required: true,
      trigger: ['blur', 'change'],
      message: '请输入 nestedValue.path2'
    }
  },
  checkboxGroupValue: {
    type: 'array',
    required: true,
    trigger: 'change',
    message: '请选择 checkboxGroupValue'
  },
  radioGroupValue: {
    required: true,
    trigger: 'change',
    message: '请选择 radioGroupValue'
  },
  radioButtonGroupValue: {
    required: true,
    trigger: 'change',
    message: '请选择 radioButtonGroupValue'
  },
  inputNumberValue: {
    type: 'number',
    required: true,
    trigger: ['blur', 'change'],
    message: '请输入 inputNumberValue'
  },
  timePickerValue: {
    type: 'number',
    required: true,
    trigger: ['blur', 'change'],
    message: '请输入 timePickerValue'
  },
  sliderValue: {
    validator (rule, value) {
      return value > 50
    },
    trigger: ['blur', 'change'],
    message: 'sliderValue 需要大于 50'
  },
  transferValue: {
    type: 'array',
    required: true,
    trigger: 'change',
    message: '请输入 transferValue'
  }
}

<<<<<<< HEAD
function handleValidateButtonClick (e) {
  e.preventDefault()
  formRef.value?.validate((errors) => {
    if (!errors) {
      message.success('验证成功')
    } else {
      console.log(errors)
      message.error('验证失败')
    }
  })
}
=======
>>>>>>> master
</script>

<template>
  <div class="container">
<<<<<<< HEAD
    <h1 id="modulesedit_title"> ◆ 劇本上架中 ◆ </h1>
=======
    <h3 id="modulesedit_title"> ◆ 模組上架中 ◆ </h3>
>>>>>>> master
    <div id="form">
      <n-form
        :model="form"
        :rules="rules"
        :size="size"
        label-placement="top"
      >
<<<<<<< HEAD
        <n-grid :cols="24" :x-gap="30">
          <!-- 劇本名字 -->
          <n-form-item-gi :span="10" label="模組名稱" path="name">
            <n-input v-model:value="model.name" placeholder=" " />
          </n-form-item-gi>

          <n-form-item-gi :span="7"></n-form-item-gi>

          <!--  未上架 -->
          <n-form-item-gi :span="5" path="switchValue">
            <n-switch v-model:value="model.switchValue" size="large" style="position: absolute; right: 0;">
              <template #checked>
                &nbsp; 公開上架 &nbsp;
              </template>
              <template #unchecked>
                未上架
              </template>
            </n-switch>
          </n-form-item-gi>

          <!-- 劇本圖片 -->
          <n-form-item-gi :span="12" label="模組圖片" path="image_temp">
            <!-- <n-input v-model:value="model.image" placeholder=" " /> -->
          </n-form-item-gi>

          <!-- 預估時長 -->
          <n-form-item-gi :span="4" label="預估時長" path="mintime">
=======
        <n-grid cols="6" item-responsive responsive="screen" x-gap="30">

          <!--  公開/隱藏 -->
          <n-form-item-gi span="xs:6 m:6 l:6" path="switchValue">
            <!-- <n-switch v-model:value="model.switchValue" size="large" style="position: absolute; right: 0;">
              <template #checked>
                公開
              </template>
              <template #unchecked>
                隱藏
              </template>
            </n-switch> -->
          </n-form-item-gi>

          <!-- 劇本名字 -->
          <n-form-item-gi span="xs:6 m:3 l:3" label="模組名稱" path="name">
            <n-input v-model:value="model.name" placeholder=" " />
          </n-form-item-gi>

          <!-- 劇本圖片 -->
          <n-form-item-gi span="xs:6 m:3 l:3" label="模組圖片" path="image">
            <!-- <n-input v-model:value="model.image" placeholder=" " /> -->
            <n-upload
              action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
              :default-file-list="fileList"
              list-type="image-card"
              @preview="handlePreview"
            >
              <ImageAdd24Regular />
            </n-upload>
          </n-form-item-gi>

          <!-- 預估時長 -->
          <n-form-item-gi span="xs:6 m:3 l:3" label="預估時長" path="mintime">
>>>>>>> master
            <n-select
              v-model:value="model.mintime"
              placeholder="預估時長"
              :options="generalOptions"
            />
          </n-form-item-gi>
          <!-- 建議人數 -->
<<<<<<< HEAD
          <n-form-item-gi :span="3" label="PL 人數" path="pl">
=======
          <n-form-item-gi span="xs:6 m:3 l:3" label="PL 人數" path="pl">
>>>>>>> master
            <n-select
              v-model:value="model.selectValue"
              placeholder="建議人數"
              :options="generalOptions"
            />
          </n-form-item-gi>
          <!-- 新舊卡 -->
<<<<<<< HEAD
          <n-form-item-gi :span="3" label="難度" path="pc">
=======
          <n-form-item-gi span="xs:6 m:3 l:3" label="難度" path="pc">
>>>>>>> master
            <n-rate v-model:value="model.selectValue" color="#4fb233" />
            <!-- <n-select
              v-model:value="model.selectValue"
              placeholder="新/舊卡"
              :options="generalOptions"
            /> -->
          </n-form-item-gi>

          <!-- 劇本說明 -->
<<<<<<< HEAD
          <n-form-item-gi :span="12" label="劇本說明" path="textareaValue">
=======
          <n-form-item-gi span="xs:6 m:3 l:3" label="模組說明" path="textareaValue">
>>>>>>> master
            <n-input
              v-model:value="model.textareaValue"
              placeholder="Textarea"
              type="textarea"
              :autosize="{
                minRows: 3,
                maxRows: 5
              }"
            />
          </n-form-item-gi>
          <!-- 額外補充(注意事項) -->
<<<<<<< HEAD
          <n-form-item-gi :span="12" label="額外補充(注意事項)" path="textareaValue">
=======
          <n-form-item-gi span="xs:6 m:3 l:3" label="額外補充(注意事項)" path="textareaValue">
>>>>>>> master
            <n-input
              v-model:value="model.textareaValue"
              placeholder="Textarea"
              type="textarea"
              :autosize="{
                minRows: 3,
                maxRows: 5
              }"
            />
          </n-form-item-gi>

          <!-- ccfolia -->
<<<<<<< HEAD
          <n-form-item-gi :span="10" label="可可亞連結" path="ccfoliaLink">
=======
          <n-form-item-gi span="xs:6 m:3 l:3" label="可可亞連結" path="ccfoliaLink">
>>>>>>> master
            <n-input v-model:value="model.ccfoliaLink" placeholder=" " style="background-color: #F5BBA9;" />
          </n-form-item-gi>

          <!-- discord -->
<<<<<<< HEAD
          <n-form-item-gi :span="10" label="Discord 連結" path="discordLink">
=======
          <n-form-item-gi span="xs:6 m:3 l:3" label="Discord 連結" path="discordLink">
>>>>>>> master
            <n-input v-model:value="model.discordLink" placeholder=" " style="background-color: #9D9FDD;" />
          </n-form-item-gi>

          <!-- dateTime -->
<<<<<<< HEAD
          <n-form-item-gi :span="12" label="Datetime" path="datetimeValue">
=======
          <n-form-item-gi span="xs:6 m:3 l:3" label="Datetime" path="datetimeValue">
>>>>>>> master
            <n-date-picker v-model:value="model.datetimeValue" type="datetime" />
          </n-form-item-gi>

          <!-- 按鈕組 -->
          <n-form-item-gi
            :span="12"
            label="Radio Button Group"
            path="radioGroupValue"
          >
            <n-radio-group v-model:value="model.radioGroupValue" name="radiogroup2">
              <n-radio-button value="Radio 1">
                Radio 1
              </n-radio-button>
              <n-radio-button value="Radio 2">
                Radio 2
              </n-radio-button>
              <n-radio-button value="Radio 3">
                Radio 3
              </n-radio-button>
            </n-radio-group>
          </n-form-item-gi>

          <n-gi :span="24">
            <div style="display: flex; justify-content: flex-end">
              <n-button round type="primary" size="large" style="width: 12vw; height: 3vw; font-size: 1.5vw;" @click="handleValidateButtonClick">
                存 &nbsp;&nbsp; 檔
              </n-button>
            </div>
          </n-gi>
        </n-grid>
      </n-form>

      <pre>{{ JSON.stringify(model, null, 2) }}
</pre>

    </div>
  </div>
</template>

<style lang="scss">
  .container {
    margin-top: 10vh;
    width: 110vw;
    height: 200vh;
<<<<<<< HEAD
    background: #F8E9D6;

    #modulesedit_title {
      width: 30vw;
      position: relative;
      top: -1%;
      left: 45%;
      color: #2F4F4F;
      font-weight: bolder;
      transform: translateX(-50%);
      text-align: center;
      letter-spacing: 0.5em;
      // background: #000;
=======
    margin: auto;
    background: #000;
    background: #F8E9D6;

    #modulesedit_title {
      position: relative;
      margin: auto;
      margin-bottom: 5%;
      color: #2F4F4F;
      font-weight: bolder;
      text-align: center;
      letter-spacing: 0.5em;
      // background: #f5caca;
>>>>>>> master
      z-index: 100;
    }
    #form {
      width: 70vw;
<<<<<<< HEAD
      margin: 3% 0% 0% 15%;
=======
      margin: auto;
      // background: #000;
      // margin: 3% 0% 0% 15%;

      .n-form-item-label__text{
      font-size: 12px;
    }
>>>>>>> master
    }

  }
</style>
