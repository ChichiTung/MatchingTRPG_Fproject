<template>
  <div id="favorite_bg">

    <h1>我的收藏</h1>
    <n-divider />

    <n-table id="favoriteTable" :single-line="false" striped style="margin-top: 5%;">
      <thead>
        <tr>
          <th style="text-align: center;">圖片</th>
          <th style="text-align: center;">名稱</th>
          <th style="text-align: center;">報名人數</th>
          <th style="text-align: center;">遊玩時間</th>
          <th style="text-align: center;">刪除</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(module, idx) in favorite" :key="module._id" :class="{'bg-red': !module.m_id.living}" style="text-align: center;">

          <td style="width: 20%;">
            <n-image :aspect-ratio="1" :src="module.m_id.image[0]" :width="200" />
          </td>

          <td style="width: 30%;font-size: 25px;">
            <!-- {{ module.m_id.name }} -->
            <router-link :to="'/modules/' + module.m_id._id" style="text-decoration: none; font-weight: 800; color: #F9B02DEE;">
              ▋   {{ module.m_id.name }}
            </router-link>
          </td>

          <td style="width: 10%;font-size: 25px;">
            {{ module.m_id.pl }}
          </td>
          <td style="width: 10%;font-size: 25px;">
            {{ module.m_id.minTime }}
          </td>
          <td style="width: 15%;font-size: 25px;">
            <n-button type="error" circle @click="updateFavorite(idx, -1)">
              <template #icon>
                <n-icon><DeleteOff20Regular /></n-icon>
              </template>
            </n-button>
          </td>

        </tr>

        <tr v-if="favorite.length === 0">
          <td> 收藏庫空空的喔... </td>
        </tr>

      </tbody>
    </n-table>

  </div>
</template>

<script setup>
import { DeleteOff20Regular } from '@vicons/fluent'
import { reactive } from 'vue'
import Swal from 'sweetalert2'
import { apiAuth } from '@/plugins/axios'
import { useUserStore } from '@/stores/user'
// import { useRouter } from 'vue-router'

// const router = useRouter()

const user = useUserStore()
const { editFavorite } = user

const favorite = reactive([])

const updateFavorite = async (idx, status) => {
  await editFavorite({ _id: favorite[idx].m_id._id, status })
  favorite[idx].status += status
  if (favorite[idx].status <= 0) {
    favorite.splice(idx, 1)
  }
}

(async () => {
  try {
    const { data } = await apiAuth.get('/users/favorite')
    favorite.push(...data.result)
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: '取得收藏失敗'
    })
  }
})()

</script>

<style>
#favorite_bg {
width: 100vw;
height: 110vh;
margin-top: 10vh;
background: #2F4F40;
}
</style>
