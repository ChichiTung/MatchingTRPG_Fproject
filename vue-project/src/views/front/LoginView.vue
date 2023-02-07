<template>
  <div class="bg_g">
    <!-- <h3 style="color:bisque; position: relative; top: 10px; left: 100px;"> 初次見面，探索者！ </h3> -->

    <div class="box">
      <div class="box_img">
      </div>          
      <div class="box_form">

        <n-form ref="valid" :model="model" :rules="rules"
          label-placement="top"
        >
          <n-grid cols="6 s:6 l:12" :y-gap="18">
            <!-- account -->
            <n-form-item-gi :span="5" label="登入帳號" path="account">
              <n-input v-model:value="model.account" placeholder="英數字6碼以上" @keydown.enter.prevent/>
            </n-form-item-gi>

            <!-- password -->
            <n-form-item-gi :span="5" label="密碼" path="password">
              <n-input v-model:value="model.password" type="password" placeholder="英數字6碼以上" />
            </n-form-item-gi>

            <n-gi :span="6">
              <div :span="6" style="display: flex; justify-content: center; margin-left: -10%;">
                <n-button round type="primary" @click="ButtonClickR" :loading="loading" color="#F9B02D" size="large">
                 &nbsp;&nbsp;&nbsp;&nbsp;登&nbsp;&nbsp;&nbsp;&nbsp;錄&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </n-button>
              </div>
            </n-gi>
          </n-grid>
        </n-form>

      </div>
    </div>
    <!-- 連結到 登入頁 -->
    <div id="login">
      <n-menu :options="menuOptions" @update:value="handleUpdateValue" />
    </div>
  <!-- <pre>{{ JSON.stringify(model, null, 2) }}
  </pre> -->
  </div>
</template>

<script setup>
import { defineComponent, ref, reactive } from "vue"
import { useMessage, NIcon } from "naive-ui"

/**
   * js 文件下使用这个做类型提示
   * @type import('naive-ui').GlobalThemeOverrides
   */

import validator from 'validator'
import { api } from '@/plugins/axios'
import { useRouter } from 'vue-router'
import { RouterLink } from 'vue-router'
import { InfoCircle } from '@vicons/fa'


const router = useRouter()
const message = useMessage()
const valid = ref(null)
const loading = ref(false)

const model = reactive({
  account: '',
  nickname:'',
  password:'',
  confirmPassword:'',
  email:'',
  dc_account:'',
  dc_id:''
})

const rules = {
  account: [
    {
      required: true,
      validator(rule, value) {
        if(!value) {
          return new Error('帳號欄位必填')
        } else if (value.length < 5 || value.length > 21) {
          return new Error('帳號長度須為 6 ~ 20 字')
        } else if(!validator.isAlphanumeric(value)) {
          return new Error ('格式不正確')
        }
      },
      trigger: ['input', 'blur']
    }
  ],
  nickname: [
    {
      required: true,
      validator(rule, value) {
        if(!value) {
          return new Error('探索者暱稱欄位必填')
        } else if ( value.length > 21) {
          return new Error('暱稱長度過長')
        }
      },
      trigger: ['input', 'blur']
    },
  ],
    password:[{
      required: true,
      validator(rule, value) {
        if(!value) {
          return new Error('密碼欄位必填')
        } else if (value.length < 5 || value.length > 21) {
          return new Error('密碼長度須為 6 ~ 20 字')
        } else if(!validator.isAlphanumeric(value)) {
          return new Error ('格式不正確')
        }
      },
      trigger: ['input', 'blur']
    }],
    confirmPassword:[{
      required:true,
      validator(rule, value) {
      if(!value){
        return new Error('請再輸入一次密碼')
      }
      else if ( value !== model.value.password) {
          return new Error('密碼不一致')
        }
      },
      trigger: ['input', 'blur']
    }],
    email:[{
      required: true,
      validator(rule, value) {
        if(!value){
          return new Error('email 欄位為必填')
        }
        else if(!validator.isEmail(value)) {
          return new Error ('信箱格式不正確')
        }
      },
      trigger: ['input', 'blur']
    }],
    dc_account:[{
      required:true,
      validator(rule, value) {
        if(!value) {
          return new Error ('此欄位必填')
        }
      },
      trigger: ['input', 'blur']
    }],
    dc_id:[{
      required:true,
      validator(rule, value) {
        if(!value) {
          return new Error ('此欄位必填')
        } else if (!validator.isNumeric(value) || value.length !== 4) {
          return new Error ('是 4 位數字')
        }
      },
      trigger: ['input', 'blur']
    }],

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
            name: 'register'
          }
        },
        { default: () => '我還不是探索者 !!' }
      ),
    key: 'go-register',
  }]

function ButtonClickR(e) {
  console.log(model.value)
  e.preventDefault()
  valid.value?.validate(errors => {
    if (!errors) {
      message.success('登錄成功')
      register()
    } else {
      console.log(errors)
      message.error('登錄失敗')
    }
  })
}


</script>

<style lang="scss" scoped>
  .bg_g 
    {
      width: 100vw;
      // height: 100vh;
      background: #2F4F4f;
    .box 
      {
        border-radius: 20px;
        width: 65%;
        height: 60vh;
        margin: auto;
        margin-top: 3%;
        background-color: #f8e9d6;
        display: flex;
        box-shadow: 2px 4px 15px 5px rgba(14, 14, 14, 0.3);
        position: relative;

        

        .box_img {
          width: 40%;
          height: 100%;
          overflow: hidden;
          background-image: url('../../../image/5b030a40b198ffb7fbd039c36c941459.jpg');
          background-position: 50% 1%;
          background-repeat: no-repeat;
          border-radius: 20px 0 0 20px;
        }
        .box_form {
          width: 50%;
          height: 98%;
          margin: auto;
          margin-right: 0%;
          padding-top: 7%;
          position: relative;
          
          &:before{
          content: "歡迎回家，探索者 ！";
          position: absolute;
          top: 3%;
          left: 20%;
          color: rgb(45, 81, 37);
          font-weight: 1000;
          font-size: 20px;
        }


        }
      }
    }
    
</style>
<style scoped>
 #login {
  width: 20vw;
  position: relative;
  left: 70%;
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