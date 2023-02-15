<template>
  <n-card title="模組--">
    <template #cover>
      <n-image :src="image" cover height="200px" />
    </template>
    <template #header-extra>
      <router-link :to="'/modules/' + _id">
        {{ name }}
      </router-link>
    </template>
    <n-image :src="image" cover height="200px" />
    {{ image }}
    {{ hashtag }}
    p.pre {{ info }}
    <template #action>
      <n-button type="primary" text @click="editFavorite({_id})"> 加入我的最愛 </n-button>
    </template>

    卡片内容
  </n-card>
</template>

<script setup>
import { useUserStore } from '@/stores/user'

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
    type: [String],
    default: ''
  }
})

const user = useUserStore()
const { editFavorite } = user

</script>

<style lang="scss">
.n-card {
  max-width: 300px;
}
</style>
