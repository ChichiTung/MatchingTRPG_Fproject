<template>
  <div class="bg_g">
    <!-- <h3 style="color:bisque; position: relative; top: 10px; left: 100px;"> 初次見面，探索者！ </h3> -->

    <div class="box">
      <div class="box_img">
        <!-- <img src="../../../image/5b030a40b198ffb7fbd039c36c941459.jpg" alt=""> -->
      </div>          
      <div class="box_form">
        <n-form ref="valid" :model="model" :rules="rules"
          label-placement="top"
        >
          <n-grid :cols="24" :x-gap="24">
            <!-- account -->
            <n-form-item-gi :span="10" label="登入帳號" path="account">
              <n-input v-model:value="model.account" placeholder="英數字6碼以上" @keydown.enter.prevent/>
            </n-form-item-gi>
            <!-- nickname -->
            <n-form-item-gi :span="10" label="探索者暱稱" path="nickname">
              <n-input v-model:value="model.nickname" placeholder="想被怎麼稱呼呢?" />
            </n-form-item-gi>
            <!-- password -->
            <n-form-item-gi :span="10" label="密碼" path="password">
              <n-input v-model:value="model.password" type="password" placeholder="英數字6碼以上" />
            </n-form-item-gi>
            <!-- confirmPassword -->
            <n-form-item-gi :span="10" label="再次輸入密碼"  path="confirmPassword">
              <n-input v-model:value="model.confirmPassword" placeholder=" " type="password"
              />
            </n-form-item-gi>
            <!-- email -->
            <n-form-item-gi :span="10" label="E-mail" path="email" >
              <n-input v-model:value="model.email" placeholder=" " />
            </n-form-item-gi>
            <!-- discord account -->
            <n-form-item-gi :span="6" label="Discord 帳號" path="dc_account" 
            style="--n-label-text-color: #3b3ace !important;">
              <n-input v-model:value="model.dc_account" placeholder="使用者名稱" style="--n-color: #5865F248;  --n-placeholder-color: #3b3ace88; margin-right: -2%;"/>
            </n-form-item-gi>

            <n-form-item-gi :span="4" path="dc_id" style="margin-left:-20px">
            <span style="color:#5865F2"> # </span>
              <n-input v-model:value="model.dc_id" placeholder="OOOO" style="--n-color: #5865F248; --n-placeholder-color: #3b3ace88; margin-left: 2%"/>
            </n-form-item-gi>

            <!-- 註冊紐 -->
            <n-gi :span="24">
              <div style="display: flex; justify-content: flex-end">
                <n-button round type="primary" @click="ButtonClickR" :loading="loading" color="#F9B02D">
                  &nbsp;註&nbsp;冊&nbsp;
                </n-button>
              </div>
            </n-gi>
          </n-grid>
        </n-form>

      </div>
</div>
  <!-- <pre>{{ JSON.stringify(model, null, 2) }}
  </pre> -->
  </div>
</template>

<script setup>
import { defineComponent, ref, reactive } from "vue"
import { useMessage } from "naive-ui"
import validator from 'validator'
import { api } from '@/plugins/axios'
import { useRouter } from 'vue-router'

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

function ButtonClickR(e) {
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

        &:before{
          content: "初次見面，探索者！";
          position: absolute;
          top: -8%;
          left: -7%;
          color: bisque;
          font-weight: 600;
          rotate: 340deg;
        }

        .box_img {
          width: 15%;
          height: 100%;
          overflow: hidden;
          background-image: url('../../../image/5b030a40b198ffb7fbd039c36c941459.jpg');
          background-position: 50% 1%;
          background-repeat: no-repeat;
          border-radius: 20px 0 0 20px;
        }
        .box_form {
          width: 75%;
          height: 98%;
          margin: auto;
          // margin-right: 3%;
          padding-top: 2%;

        }
      }
    }
</style>