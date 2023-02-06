<template>
  <div class="bg_g">
    <!-- <h3 style="color:bisque; position: relative; top: 10px; left: 100px;"> 初次見面，探索者！ </h3> -->

    <div class="box">
      <div class="box_img">
        <!-- <img src="../../../image/5b030a40b198ffb7fbd039c36c941459.jpg" alt=""> -->
      </div>          
      <div class="box_form">
        <n-form
          ref="formRef"
          :model="model"
          :rules="rules"
          :size="size"
          label-placement="top"
        >
          <n-grid :cols="24" :x-gap="24">
            <!-- account -->
            <n-form-item-gi :span="10" label="登入帳號" path="accountValue">
              <n-input v-model:value="model.account" placeholder="英數字6碼以上" />
            </n-form-item-gi>
            <!-- nickname -->
            <n-form-item-gi :span="10" label="探索者暱稱" path="nicknameValue">
              <n-input v-model:value="model.nickname" placeholder="想被怎麼稱呼呢?" />
            </n-form-item-gi>
            <!-- password -->
            <n-form-item-gi :span="10" label="密碼" path="passwordValue">
              <n-input v-model:value="model.password" placeholder="英數字6碼以上" />
            </n-form-item-gi>
            <!-- password_again -->
            <n-form-item-gi :span="10" label="再次輸入密碼"  path="password_againValue">
              <n-input v-model:value="model.password_again" placeholder=" " 
              />
            </n-form-item-gi>
            <!-- password -->
            <n-form-item-gi :span="10" label="E-mail" path="emailValue">
              <n-input v-model:value="model.email" placeholder="請設定專屬名稱" />
            </n-form-item-gi>
            <!-- password_again -->
            <n-form-item-gi :span="6" label="Discord 帳號" path="dc_accountValue" 
            style="--n-label-text-color: #3b3ace !important;">
              <n-input v-model:value="model.dc_account" placeholder="使用者名稱" style="--n-color: #5865F248;  --n-placeholder-color: #3b3ace88; margin-right: -2%;"/>
            </n-form-item-gi>

            <n-form-item-gi :span="4"  path="dc_accountValue" style="margin-left:-20px">
            <span style="color:#5865F2"> #   </span>
              <n-input v-model:value="model.dc_id" placeholder="OOOO" style="--n-color: #5865F248; --n-placeholder-color: #3b3ace88; margin-left: 2%"/>
            </n-form-item-gi>

            <!-- 註冊紐 -->
            <n-gi :span="24">
              <div style="display: flex; justify-content: flex-end">
                <n-button round type="primary" @click="handleValidateButtonClick" color="#F9B02D">
                  註                               冊
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

<script></script>
import { defineComponent, ref, reactive } from "vue";
import { useMessage } from "naive-ui";

export default defineComponent({
  setup() {
    const formRef = ref(null);
    const message = useMessage();
    return {
      formRef,
      size: ref("medium"),
      model: ref({
        account: null,
        nickname: null,
        password: null,
        password_again: null,
        email: null,
        dc_account: null,
        dc_id: null
      }),
      generalOptions: ["groode", "veli good", "emazing", "lidiculous"].map(
        (v) => ({
          label: v,
          value: v
        })
      ),
      cascaderOptions: [
        {
          label: "groode",
          value: "groode",
          children: [
            {
              label: "veli good",
              value: "veli good"
            }
          ]
        }
      ],
      rules: {
         
      },

      handleValidateButtonClick(e) {
        e.preventDefault();
        formRef.value?.validate((errors) => {
          if (!errors) {
            message.success("验证成功");
          } else {
            console.log(errors);
            message.error("验证失败");
          }
        });
      }
    };
  }
});
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