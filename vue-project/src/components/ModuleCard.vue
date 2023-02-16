<template>
  <n-card
    title=""
    :bordered="true" :hoverable="true" style="background-color:#2F4F40; height: 50vh;
    box-shadow: 18px 18px 0px 5px  #F9B02DCC; border-color: bisque;font-weight: 800;"
  >
    <template #cover>
      <img :src="image" style="max-height: 30vh; width: 100%;object-fit: fill;">
    </template>

    <router-link :to="'/modules/' + _id" style="text-decoration: none; font-weight: 800; color: #F9B02DEE; font-size: 1.8vw; position: absolute; top: 62%; left: 5%;">
      ▋  {{ name }}
    </router-link>

    <n-button size="large" type="primary" text style="text-decoration: none; font-weight: 800; color: #F9B02DEE; font-size: 1.5vw; position: absolute; top: 90%; right: 5%;" @click="editFavorite({_id, status : 1})">
      <template #icon>
        <Heart48Regular />
      </template>
    </n-button>

    <div class="tag_row" style="text-decoration: none; font-weight: 800; color: #F9B02DEE; font-size: 1.5vw; position: absolute; top: 75%; left: 5%;">

      <n-tag v-if="hashtag.length > 0" :bordered="false" :color="{ color: '#FF9797', textColor: '#555', borderColor: '#555' }" round style="margin-left: 6px; font-weight: 800; font-size: 10px;">
        #{{ hashtag[0] }}
      </n-tag>
      <n-tag v-if="hashtag.length > 1" :bordered="false" :color="{ color: '#FFD1A4', textColor: '#555', borderColor: '#555' }" round style="margin-left: 6px; font-weight: 800; font-size: 10px;">
        #{{ hashtag[1] }}
      </n-tag>
      <n-tag v-if="hashtag.length > 2" :bordered="false" :color="{ color: '#FFD306', textColor: '#555', borderColor: '#555' }" round style="margin-left: 6px; font-weight: 800; font-size: 10px;">
        #{{ hashtag[2] }}
      </n-tag>

    </div>
    <!-- {{ image }} -->

    <!-- p.pre {{ info }} -->
    <!-- <template #action> -->
    <div class="cardBtn" style="position: relative; top: 0; left: 0;">

    </div>
    <!-- </template> -->

  </n-card>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import { Heart48Regular } from '@vicons/fluent'

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
  }
})

const user = useUserStore()
const { editFavorite } = user

</script>

<style lang="scss">
.n-card {

  width: 20vw;
  position: relative;
  z-index: 100;

  // &::before{
  //   content: "";
  //   position: absolute;
  //   width: 100%;
  //   height: 100%;
  //   left: 10px;
  //   background: #ffed2266;
  //   border-radius: 15px;

  //   z-index:-2;
  // }

}
</style>
