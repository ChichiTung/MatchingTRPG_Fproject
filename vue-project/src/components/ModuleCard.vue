<template>
  <n-popover
    width="trigger" placement="top" :show-arrow="false"
    style="position: absolute; top:0px; color: #2F4F40; background: #F9B02DEE;
    width: 100%; height: 40vh;"
  >
    <template #trigger>
      <n-card
        title=""
        :bordered="true" :hoverable="true" style="background-color:#2F4F40; height: 40vh;
    box-shadow: 18px 18px 0px 5px  #F9B02DCC; border-color: bisque;font-weight: 800;"
      >
        <!-- 主圖 -->
        <template #cover>
          <img :src="image">
        </template>

        <!-- 模組名 -->
        <router-link
          :to="'/modules/' + _id"
          style="width: 90%; height: 20%; text-decoration: none; font-weight: 800; color: #F9B02DEE;
      font-size:1.5rem; position: absolute; top: 63%; left: 5%;text-overflow: ellipsis; white-space: nowrap; overflow:hidden;"
        >
          ▋  {{ name }}
        </router-link>
        <!-- 加收藏 -->
        <n-button
          size="large" type="primary" text
          style="text-decoration: none; font-weight: 800; color: #F9B02DEE; font-size: 1.5vw; position: absolute; top: 90%; right: 5%;" @click="editFavorite({_id, status : 1})"
        >
          <template #icon>
            <Heart48Regular />
          </template>
        </n-button>
        <!-- 模組介紹 -->
        <p style="text-overflow: ellipsis; overflow:hidden; width: 90%;height: 12%; position: absolute; top: 72%; left: 5%; font-size: small;" class="card_info">
          {{ info }}
        </p>
        <!-- hashtag -->
        <div class="tag_row" style="text-decoration: none; font-weight: 800; color: #F9B02DEE; font-size: 1.5vw; position: absolute; top: 85%; left: 5%;">

          <n-tag v-if="hashtag.length > 0" :bordered="false" :color="{ color: '#FF9797', textColor: '#555', borderColor: '#555' }" round style="margin-left: 6px; font-weight: 800; font-size: 10px;">
            #{{ hashtag[0] }}
          </n-tag>
          <n-tag v-if="hashtag.length > 1" :bordered="false" :color="{ color: '#FFD1A4', textColor: '#555', borderColor: '#555' }" round style="margin-left: 6px; font-weight: 800; font-size: 10px;">
            #{{ hashtag[1] }}
          </n-tag>
          <n-tag v-if="hashtag.length > 2" :bordered="false" :color="{ color: '#c3c5e1', textColor: '#555', borderColor: '#555' }" round style="margin-left: 6px; font-weight: 800; font-size: 10px;">
            #{{ hashtag[2] }}
          </n-tag>

        </div>
        <!-- p.pre {{ info }} -->
        <!-- <template #action> -->
        <div class="cardBtn" style="position: relative; top: 0; left: 0;">
        </div>
      </n-card>
    </template>

    <div class="hover_row" style="display: flex; justify-content: space-around;">
      <!-- PL 人數 -->
      <p style="font-size: 20px; font-weight: 800;">
        <n-icon :component="PeopleAltRound" size="25" :depth="1" /> {{ pl }} 人
      </p>
      <p style="font-size: 20px; font-weight: 800;">
        <n-icon :component="AccessTimeFilledRound" size="25" :depth="1" /> {{ minTime }} 小時
      <!-- <PeopleAltRound /> {{ difficulty }} -->
      </p>
    </div>

    <div class="hover_row" style="display: flex; justify-content: space-around;">
      <p
        style="font-size: 15px; font-weight: 600;
      text-overflow: ellipsis; overflow:hidden; height: 100px"
      >
        {{ notice }}
      </p>
    </div>

    <!-- More -->
    <div class="hover_row" style="display: flex; position: absolute; top: 85%;left: 12%; justify-content: space-between; width: 70%;">
      <n-button
        size="large" type="primary" text
        style="text-decoration: none; font-weight: 800;font-size: 1.2vw; color: #2F4F40;" @click="editFavorite({_id, status : 1})"
      >
        <template #icon> <Heart48Regular /> </template>收藏
      </n-button>

      <span style="position: absolute; top: 30%; left: 55%; color: pink;"> ▍</span>

      <router-link
        :to="'/modules/' + _id"
        style="text-decoration: none;"
      >
        <n-button
          size="large" text
          style="color: #2F4F40; width: 3vw;height: 3vw;font-weight: 800;font-size: 1.2vw; "
        >
          <template #icon> <NextOutline /></template> <span> 更多</span>
        </n-button>
      </router-link>
    </div>

    <div class="hover_row" style="display: flex; justify-content: space-around;">
      <!-- 難度-->
      <p style="font-size: 20px; font-weight: 800;position: absolute; top: 70%;">
        難度：  &nbsp; <n-rate allow-half :value="difficulty" readonly color="#2F4F40" />
      </p>
    </div>

    <!-- {{ info }} -->
  </n-popover>

</template>

<script setup>
import { useUserStore } from '@/stores/user'
import { Heart48Regular } from '@vicons/fluent'
import { NextOutline } from '@vicons/carbon'
import { PeopleAltRound, AccessTimeFilledRound } from '@vicons/material'

defineProps({
  /* eslint-disable */
  _id: {
    type: String,
    default: ''
  },
  /* eslint-enable */
  name: {
    type: String,
    default: ''
  },
  minTime: {
    type: Number,
    default: 0
  },
  info: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  },
  living: {
    type: Boolean,
    default: false
  },
  hashtag: {
    type: String,
    default: ''
  },
  pl: {
    type: Number,
    default: 0
  },
  difficulty: {
    type: Number,
    default: 0
  },
  notice: {
    type: String,
    default: ''
  }

})

const user = useUserStore()
const { editFavorite } = user

</script>

<style lang="scss">

</style>
