<template>
  <div id="bg_g">
    <!-- <h3 style="color:bisque; position: relative; top: 10px; left: 100px;"> 初次見面，探索者！ </h3> -->

    <div class="box">
      <div class="box_img">
        <img src="../../../image/5b030a40b198ffb7fbd039c36c941459.jpg">
      </div>

      <div class="box_form">

        <n-form ref="valid" :model="model" :rules="rules" label-placement="top">
          <n-grid cols="6 s:6 l:12" :y-gap="18">
            <!-- account -->
            <n-form-item-gi :span="5" label="登入帳號" path="account">
              <n-input v-model:value="model.account" placeholder="英數字6碼以上" @keydown.enter.prevent />
            </n-form-item-gi>

            <!-- password -->
            <n-form-item-gi :span="5" label="密碼" path="password">
              <n-input v-model:value="model.password" type="password" placeholder="英數字6碼以上" />
            </n-form-item-gi>

            <n-gi :span="6">
              <div :span="6">
                <n-button round type="primary" :loading="loading" color="#F9B02D" size="large" style="position: relative; top: 50%; left:30%;" @click="ButtonClickR">
                  &nbsp;&nbsp;&nbsp;&nbsp;登&nbsp;&nbsp;&nbsp;&nbsp;錄&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </n-button>
              </div>
            </n-gi>
          </n-grid>
        </n-form>

        <div id="register">
          <n-menu :options="menuOptions" />
        </div>

      </div>

    </div>
    <!-- 連結到 登入頁 -->

  <!-- <pre>{{ JSON.stringify(model, null, 2) }}
  </pre> -->
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useUserStore } from '@/stores/user'
import { RouterLink } from 'vue-router'
import { useMessage } from 'naive-ui'
import validator from 'validator'

const user = useUserStore()
const valid = ref(null)
const loading = ref(false)
const message = useMessage()

const model = reactive({
  account: '',
  password: ''
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
  }]

}
const login = async () => {
  loading.value = true
  await user.login(model)
  loading.value = false
}

// const login= async () => {
//   // 如果 valid(form.value) 是 null 的時候 return
//   if (!model.value === null) return
//   loading.value = true
//   try {
//     await api.post('/users', model)
//     router.push('/')
//   } catch (error) {
//     console.log(error?.response?.data?.message)
//     loading.value = false
//   }
// }

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
        { default: () => '我還沒註冊為探索者 !!' }
      ),
    key: 'go-register'
  }]

function ButtonClickR (e) {
  console.log(model.value)
  e.preventDefault()
  valid.value?.validate(errors => {
    if (!errors) {
      message.success('登錄成功')
      login()
    } else {
      console.log(errors)
      message.error('登錄失敗')
    }
  })
}

</script>

<style lang="scss" scoped>
  #bg_g
    {
      width: 100vw;
      height: 110vh;
      background-color: #2F4F40;
      display: flex;
      // justify-content: center;
      // align-items: center;

    .box
      {
        margin: auto;
        margin-top: 5vw;
        border-radius: 20px;
        width: 60%;
        height: 45%;
        margin-top: 60vh;
        transform: translateY(-50%);
        background-color: #f8e9d6;
        display: flex;
        box-shadow: 2px 4px 15px 5px rgba(14, 14, 14, 0.3);
        position: relative;

        .box_img {
          width: 20vw;
          height: 100%;
          display: block;
          // object-fit: cover;
          // min-height: 10%;

          img {
            width: 100%;
            height:100%;
            object-fit: cover;
            overflow: hidden;
            // object-position: -160px 0;
            border-radius: 20px 0 0 20px;
          }
        }
        .box_form {
          width: 50%;
          height: 98%;
          margin: auto;
          margin-right: 0%;
          padding-top: 10%;
          position: relative;

          &:before{
          content: "歡迎回家，探索者 ！";
          position: absolute;
          top: 5%;
          left: 20%;
          color: rgb(45, 81, 37);
          font-weight: 800;
          font-size: 20px;
        }

        }
      }
    }

</style>
<style>
 #register {
  width: 80%;
  position: absolute;
  left: -10%;

  }
  #register .n-menu-item {
  top: 0%;
  left: 35%;
z-index: 100;
  }

  #register .n-menu .n-menu-item-content .n-menu-item-content-header {
      font-size: 1rem;
      font-weight: 600;
      position: absolute;
      /* right: 20%; */
    }
  #register .n-menu .n-menu-item-content-header  a {
      color: #F9B02D !important;
      text-decoration: underline !important;
    text-align: center;

}
#register .n-menu {
  --n-color: #2F4F4F00 !important;
}
</style>
