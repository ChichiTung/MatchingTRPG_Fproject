import { createRouter, createWebHashHistory, START_LOCATION } from 'vue-router'
import FrontLayout from '@/layouts/FrontLayout.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHashHistory(import.meta.BASE_URL),
  routes:[
    {
      path: '/',
      component: FrontLayout,
      children: [
        {
          path:'',
          name: 'home',
          component: () => import('@/views/front/HomeView.vue'),
          meta: {
            title:'Matching TRPG'
          }
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('@/views/front/RegisterView.vue'),
          meta: {
            title: '註冊 | Matching TRPG'
          }
        },
        {
          path: 'login',
          name: 'login',
          component: () => import('@/views/front/LoginView.vue'),
          meta: {
            title: ' 登錄 | Matching TRPG'
          }
        },
        {
          path: 'module',
          name: 'module',
          component: () => import('@/views/front/ModulesView.vue'),
          meta: {
            title: '劇本任務 | Matching TRPG'
          }
        },{
          path: 'discussion',
          name: 'discussion',
          component: () => import('@/views/front/DiscussionView.vue'),
          meta: {
            title: '探索者心得 | Matching TRPG'
          }
        },{
          path: 'trpg',
          name: 'trpg',
          component: () => import('@/views/front/TrpgView.vue'),
          meta: {
            title: 'TRPG ? | Matching TRPG'
          }
        },{
          path: 'aboutus',
          name: 'aboutus',
          component: () => import('@/views/front/AboutusView.vue'),
          meta: {
            title: '關於邁欽 | Matching TRPG'
          }
        }
      ]
    },
    {
      path: '/gm/',
      component: AdminLayout,
      children: [
        {
          path: '',
          name: 'gm',
          component: () => import('@/views/gm/HomeView.vue'),
          meta: {
            title: 'GM | MatchingTRPG'
          }
        }
        ,{
          path: 'modulesedit',
          name: 'modulesedit',
          component: () => import('@/views/gm/ModulesView.vue'),
          meta: {
            title: '上架模組 | MatchingTRPG'
          }
        }
      ]
    },
    {
      path: '/user/',
      component: FrontLayout,
      children: [
        {
          path: '',
          name: 'user',
          component: () => import('@/views/user/HomeView.vue'),
          meta: {
            title: '探索者檔案 | MatchingTRPG'
          }
        }
        
      ]
    },
    {
      path: '/404',
      name: '404',
      component: NotFoundView,
      meta: {
        title: 'Not Found | Matching TRPG'
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'all',
      redirect: '/404'
    }
  ]
})

router.afterEach((to, from) => {
  document.title = to.meta.title
})

router.beforeEach(async (to, from, next) => {
  const user = useUserStore()
  if (from === START_LOCATION) {
    await user.getUser()
  }
  if (user.isLogin && (to.path === '/register' || to.path === '/login')) {
    next('/')
  } else if (to.meta.login && !user.isLogin) {
    next('/login')
  } else if (to.meta.admin && !user.isAdmin) {
    next('/')
  } else {
    next()
  }
})

export default router