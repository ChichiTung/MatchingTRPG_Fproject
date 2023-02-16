import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { api, apiAuth } from '@/plugins/axios'
import Swal from 'sweetalert2'
import router from '@/plugins/router'

export const useUserStore = defineStore('user', () => {
  const token = ref('')
  const account = ref('')
  const nickname = ref('')
  /* eslint-disable */
  const dc_account = ref('')
  const dc_id = ref('')
  /* eslint-enable */
  const email = ref('')
  const role = ref(0)
  const favorite = ref(0)

  const isLogin = computed(() => {
    return token.value.length > 0
  })
  const isAdmin = computed(() => {
    return role.value === 1
  })

  const avatar = computed(() => {
    return `https://source.boringavatars.com/beam/256/${account.value}?colors=ffffff,eed7c5,9ec4bb,abe4ff,d9abff`
  })

  const login = async (model) => {
    try {
      const { data } = await api.post('/users/login', model)
      token.value = data.result.token
      account.value = data.result.account
      email.value = data.result.email
      nickname.value = data.result.nickname
      /* eslint-disable */
      dc_account.value = data.result.dc_account
      dc_id.value = data.result.dc_id
      /* eslint-enable */
      favorite.value = data.result.favorite
      role.value = data.result.role

      Swal.fire({
        icon: 'success',
        title: '成功',
        text: '登入成功'
      })
      router.go(0)
      router.push('/')
    } catch (error) {
      console.log(error)

      Swal.fire({
        icon: 'error',
        title: '失敗',
        text: error?.response?.data?.message || '發生錯誤'
      })
    }
  }

  const logout = async () => {
    try {
      await apiAuth.delete('/users/logout')
      token.value = ''
      account.value = ''
      role.value = 0
      favorite.value = 0

      router.go(0)
      router.push('/')
      // Swal.fire({
      //   icon: 'success',
      //   title: '成功',
      //   text: '登出成功'
      // })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: '失敗',
        text: error?.response?.data?.message || '發生錯誤'
      })
    }
  }

  const getUser = async () => {
    if (token.value.length === 0) return
    try {
      const { data } = await apiAuth.get('/users/me')
      account.value = data.result.account
      nickname.value = data.result.nickname
      email.value = data.result.email
      /* eslint-disable */
      dc_account.value = data.result.dc_account
      dc_id.value = data.result.dc_id
      /* eslint-enable */

      favorite.value = data.result.favorite
      role.value = data.result.role
    } catch (error) {
      logout()
    }
  }

  const editFavorite = async ({ _id, status }) => {
    if (token.value === 0) {
      Swal.fire({
        title: '失敗',
        text: '請先登入'
      })
      router.push('/login')
      return
    }
    try {
      const { data } = await apiAuth.post('/users/favorite', { m_id: _id, status: parseInt(status) })
      favorite.value = data.result
      Swal.fire({
        title: '成功',
        text: '成功加入收藏'
      })
    } catch (error) {
      console.log(error?.response?.data?.message)
      Swal.fire({
        title: '失敗',
        text: error?.response?.data?.message || '發生錯誤'

      })
    }
  }

  return {
    token,
    account,
    email,
    nickname,
    /* eslint-disable */
    dc_account,
    dc_id,
    /* eslint-enable */
    favorite,
    role,
    login,
    logout,
    getUser,
    isLogin,
    isAdmin,
    avatar,
    editFavorite
  }
}, {
  persist: {
    key: '20230207',
    paths: ['token']
  }
})
