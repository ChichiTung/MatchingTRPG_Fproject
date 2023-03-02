<template>

  <n-form
    :model="form"
    :rules="rules"
    :size="size"
    label-placement="top"
    style="background-color: #DDA49244; border-radius: 15px; padding: 2%; width:80%;margin:auto;box-shadow: 0.1rem 0.1rem 0.5rem #333;"
  >
    <n-grid cols="6 l:12" item-responsive responsive="screen" x-gap="30">

      <n-form-item-gi span="12">
        <n-divider
          title-placement="left"
          style="--n-color: #5d8585; --n-text-color: #5d8585; margin: -8vh 0 -10vh 0;"
        >
          <h2 class="title">G M 檔 案</h2>

          <n-button
            strong secondary
            circle type="success" size="large"
            style=" font-size: 15px; margin-left: 550%; margin-bottom: 50%;"
          >
            <template #icon>
              <Edit />
            </template>
          <!-- &nbsp;編輯 -->
          </n-button>
        </n-divider>
      </n-form-item-gi>

      <!-- 探索者照片 -->
      <n-form-item-gi span="xs:9 m:6 l:6" label="GM照片" path="image">

        <img src="../../assets/ronnie.png" style="width: 30%;">

      </n-form-item-gi>

      <!-- 探索者暱稱 -->
      <n-form-item-gi span="xs:9 m:6 l:4" label="GM暱稱" path="nickname">
        <p
          style="font-size: 24px;"
        >
          {{ user.nickname }}
        </p>
      </n-form-item-gi>

      <!-- 特色 -->
      <n-form-item-gi span="xs:6 m:6 l:6" label="帶團特色" path="hashtag">
        <div class="tags-wrapper" style="background: #DDA49244; border-radius: 8px; padding: 4%;margin-top: -1px;">
          <n-dynamic-tags
            type="primary" round input-style="warning"
          />
        </div>
      </n-form-item-gi>

      <!-- INTRO -->
      <n-form-item-gi span="xs:9 m:6 l:6" label="GM自介" path="notice">
        <p
          style="font-size: 18px;width: 50vw; height: 20vh; background: #2F4F4422; border-radius: 20px; padding: 5%;"
        >
        <p>
          最 ☆ 貼貼本，但手下已經有一整座大墓園，專門帶高難度本 WWW ~

          ※嚴禁※
          1.遲到
          2.人身攻擊

        </p>

        </p>

      </n-form-item-gi>

    </n-grid>

  </n-form>

  <n-row style="width: 70%; padding:2.5%;padding-left: 10%; margin: auto;margin-top: 10%; background-color: #DDA49299; border-radius: 15px;box-shadow: 0.1rem 0.1rem 0.5rem #333;margin-bottom: 10%;">
    <n-col :span="12">
      <n-statistic label="模組劇本" :value="30" style="margin-bottom: 10%;">
        <h3>模組劇本</h3>
        <template #prefix>
          <n-icon>
            <md-save />
          </n-icon>
        </template>
        <template #suffix>
          <!-- / 100 -->
        </template>
      </n-statistic>
    </n-col>
    <n-col :span="12">
      <n-statistic label="帶團總數">
        &nbsp; &nbsp; &nbsp;25
      </n-statistic>
    </n-col>
    <n-col :span="12">
      <n-statistic label="最熱門模組">
        &nbsp; &nbsp; &nbsp;所囚非愛
      </n-statistic>
    </n-col>
    <n-col :span="12">
      <n-statistic label="忠實 PL">
        &nbsp; &nbsp; &nbsp;琦琦琦琦
      </n-statistic>
    </n-col>
  </n-row>
</template>

<script setup>
import { Edit } from '@vicons/carbon'
import { useUserStore } from '@/stores/user'
const user = useUserStore()

</script>
<style>
#gm_container {
  width: 100vw;
  height: 100vh;
  background: #F8E9D6;

}

.n-statistic .n-statistic__label {
    color: white;
    font-size: 1.5rem;
    text-shadow: 0.1rem 0 0.2rem #333;
  }

</style>
