<template>
  <div class="bg_g">

    <div class="box">
      <div class="box_img">
        <img src="../../../image/5b030a40b198ffb7fbd039c36c941459.jpg">
      </div>
      <div class="box_form">
        <n-form
          ref="valid" :model="model" :rules="rules"
          label-placement="top"
        >
          <n-grid cols="6 s:6 l:12" :x-gap="18" resonsive="screen">
            <!-- account -->
            <n-form-item-gi :span="3" label="登入帳號" path="account">
              <n-input v-model:value="model.account" maxlength="20" clearable placeholder="英數字6碼以上" />
            </n-form-item-gi>
            <!-- nickname -->
            <n-form-item-gi :span="3" label="探索者暱稱" path="nickname">
              <n-input v-model:value="model.nickname" maxlength="20" clearable placeholder="想被怎麼稱呼呢?" />
            </n-form-item-gi>
            <!-- password -->
            <n-form-item-gi :span="3" label="密碼" path="password">
              <n-input v-model:value="model.password" type="password" placeholder="英數字6碼以上" clearable />
            </n-form-item-gi>
            <!-- confirmPassword -->
            <n-form-item-gi :span="3" label="再次輸入密碼" path="confirmPassword">
              <n-input v-model:value="model.confirmPassword" placeholder=" " type="password" clearable />
            </n-form-item-gi>
            <!-- discord account -->
            <n-form-item-gi :span="2" label="Discord 帳號  &nbsp;(GM 聯絡用 )" path="dc_account" style="--n-label-text-color: #3b3ace !important;">

              <n-input v-model:value="model.dc_account" placeholder="使用者名稱" style="--n-color: #5865F248;  --n-placeholder-color: #3b3ace88; margin-right: -2%;" clearable />
            </n-form-item-gi>

            <n-form-item-gi :span="1" path="dc_id" style="margin-left:-10px; margin-right:10px">
              <span style="color:#5865F2"> # </span>
              <n-input v-model:value="model.dc_id" placeholder="OOOO" style="--n-color: #5865F248; --n-placeholder-color: #3b3ace88; margin-left: 5%; width: 20vw;" clearable />

              <!-- <div id="dc_info" style=" position: relative;  --n-color: #2d3bf947; --n-padding: 0 0px;">
                <n-tooltip placement="top-start" trigger="hover" style="font-size: 15px; font-weight: 600;  position: absolute; top: 0; left: 0; background: #3b3ace99;"> -->
              <!-- <n-popconfirm positive-text="ok" :negative-text="null" :show-icon="false" style="font-size: 24px; color: #3b3aceaa; font-weight: 600;"> -->
              <!-- <template #trigger>
                    <n-button text style="font-size: 12px; color: #3b3aceaa; position: absolute; top: 0; left: 0;">
                      <template #icon> <InfoCircle /> </template>
                    </n-button>
                  </template>
                  點開 DC 個人資料，ex: 小明#0857 -->
              <!-- </n-popconfirm> -->
              <!-- </n-tooltip>
              </div> -->
            </n-form-item-gi>

            <!-- email -->
            <n-form-item-gi :span="3" label="E-mail" path="email" style="padding-bottom: 15%;">
              <n-input v-model:value="model.email" placeholder=" " clearable />
            </n-form-item-gi>

            <!-- 註冊紐 -->
            <n-gi :span="15">
              <div :span="5">
                <n-button round type="primary" :loading="loading" color="#F9B02D" style="width:20%; position: relative; top: 30%; left:35%; color: #FFF; " @click="ButtonClickR">
                  &nbsp;註&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;冊&nbsp;
                </n-button>
              </div>
            </n-gi>

          </n-grid>
        </n-form>

        <div id="login">
          <n-menu :options="menuOptions" />
        </div>

      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useMessage } from 'naive-ui'

/**
   * js 文件下使用这个做类型提示
   * @type import('naive-ui').GlobalThemeOverrides
   */

import validator from 'validator'
import { api } from '@/plugins/axios'
import { useRouter, RouterLink } from 'vue-router'

// import { InfoCircle } from '@vicons/fa'

const router = useRouter()
const message = useMessage()
const valid = ref(null)
const loading = ref(false)

const model = reactive({
  account: '',
  nickname: '',
  password: '',
  confirmPassword: '',
  email: '',
  dc_account: '',
  dc_id: ''
})

const rules = {
  account: [
    {
      required: true,
      validator (rule, value) {
        if (!value) {
          return new Error('帳號欄位必填')
        } else if (value.length < 5 || value.length > 21) {
          return new Error('帳號長度須為 6 ~ 20 字')
        } else if (!validator.isAlphanumeric(value)) {
          return new Error('格式不正確')
        }
      },
      trigger: ['input', 'blur']
    }
  ],
  nickname: [
    {
      required: true,
      validator (rule, value) {
        if (!value) {
          return new Error('探索者暱稱欄位必填')
        } else if (value.length > 21) {
          return new Error('暱稱長度過長')
        }
      },
      trigger: ['input', 'blur']
    }
  ],
  password: [{
    required: true,
    validator (rule, value) {
      if (!value) {
        return new Error('密碼欄位必填')
      } else if (value.length < 5 || value.length > 21) {
        return new Error('密碼長度須為 6 ~ 20 字')
      } else if (!validator.isAlphanumeric(value)) {
        return new Error('格式不正確')
      }
    },
    trigger: ['input', 'blur']
  }],
  confirmPassword: [{
    required: true,
    validator (rule, value) {
      if (!value) {
        return new Error('請再填一次密碼')
      }
      // else if (value !== model.value.password) {
      //   return new Error('密碼不一致')
      // }
    },
    trigger: ['input', 'blur']
  }],
  email: [{
    required: true,
    validator (rule, value) {
      if (!value) {
        return new Error('email 欄位為必填')
      } else if (!validator.isEmail(value)) {
        return new Error('信箱格式不正確')
      }
    },
    trigger: ['input', 'blur']
  }],
  dc_account: [{
    required: true,
    validator (rule, value) {
      if (!value) {
        return new Error('此欄位必填')
      }
    },
    trigger: ['input', 'blur']
  }],
  dc_id: [{
    required: true,
    validator (rule, value) {
      if (!value) {
        return new Error('此欄位必填')
      } else if (!validator.isNumeric(value) || value.length !== 4) {
        return new Error('是 4 位數字')
      }
    },
    trigger: ['input', 'blur']
  }]

}

const register = async () => {
  // 如果 valid(form.value) 是 null 的時候 return
  if (!model.value === null) return
  loading.value = true
  try {
    await api.post('/users', model)
    router.push('/')
  } catch (error) {
    console.log(error?.response?.data?.message)
    loading.value = false
  }
}

const menuOptions = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'login'
          }
        },
        { default: () => '我已經是探索者...' }
      ),
    key: 'go-login'
  }]

function ButtonClickR (e) {
  console.log(model.value)
  e.preventDefault()
  valid.value?.validate(errors => {
    if (!errors) {
      message.success('註冊成功')
      register()
    } else {
      console.log(errors)
      message.error('註冊失敗')
    }
  })
}

</script>

<style lang="scss" scoped>
  .bg_g
    {
      width: 100vw;
      height: 110vh;
      background-color: #2F4F40;
      padding-top: 5vh;
      display: flex;
      justify-content: center;
      align-items: center;
    .box
      {
        border-radius: 20px;
        width: 60vw;
        height: 50%;
        // margin: auto;
        background-color: #f8e9d6;
        box-shadow: 2px 4px 15px 5px rgba(14, 14, 14, 0.3);
        position: relative;
        // display: flex;
        // justify-content: space-between;

        &::before{
          content: "初次見面，探索者！";
          padding-left: 1rem;
          width: 8.5rem;
          height: 3.5rem;
          line-height: 3.5rem;
          background: bisque;
          border-radius: 20px;
          color: #2F4F40;
          position: absolute;
          top: -8%;
          left: -7%;
          font-weight: 800;
          box-shadow: 0 0 5rem rgb(56, 67, 58);
          animation: bounce-in-top 1s;

          @keyframes bounce-in-top {
            0% {
              transform: translateY(-500px);
              animation-timing-function: ease-in;
              opacity: 0;
            }
            38% {
              transform: translateY(0);
              animation-timing-function: ease-out;
              opacity: 1;
            }
            55% {
              transform: translateY(-65px);
              animation-timing-function: ease-in;
            }
            72% {
              transform: translateY(0);
              animation-timing-function: ease-out;
            }
            81% {
              transform: translateY(-28px);
              animation-timing-function: ease-in;
            }
            90% {
              transform: translateY(0);
              animation-timing-function: ease-out;
            }
            95% {
              transform: translateY(-8px);
              animation-timing-function: ease-in;
            }
            100% {
              transform: translateY(0);
              animation-timing-function: ease-out;
            }
}

        }
        &::after{
          content: '';
          position: absolute;
          top: 6%;
          left: 9%;
          width: 0;
          height: 0;
          transform: rotate(-19deg);
          border: 27px solid;
          border-color: #ffe4c4 transparent transparent transparent;

          animation: bounce-in-top 1s;
        }

        .box_img {
          width: 20vw;
          height: 100%;
          object-fit: cover;
          // min-height: 10%;

          img {
            width: 100%;
            height:100%;
            object-fit: cover;
            // object-position: -160px 0;
            border-radius: 20px 0 0 20px;
          }
        }
        .box_form {
          width: 60%;
          height: 80%;
          // padding-top: 4%;
          // padding-left: 10%;
          position:absolute;
          top: 10%;
          right: 3%;
          // background: #2F4F40;

        }
      }
    }
</style>

<style>

  #dc_info button {
  position: fixed;
  top: 55%;
  left: -15%;

  }
  #login {
  width: 50%;
  position: relative;
  text-align: center;
  left: 20%;
  }
  #login .n-menu .n-menu-item-content .n-menu-item-content-header {
      font-size: 20px;
      font-weight: 600;
      position: absolute;
      right: 15%;
    }
  #login .n-menu .n-menu-item-content-header  a {
      color: #F9B02D !important;
      text-decoration: underline !important;
}
</style>
