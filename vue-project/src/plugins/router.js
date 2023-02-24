import { createRouter, createWebHashHistory, START_LOCATION } from 'vue-router'
import FrontLayout from '@/layouts/FrontLayout.vue'
import GMLayout from '@/layouts/GMLayout.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHashHistory(import.meta.BASE_URL),
  routes: [
    {
      path: '/',
      component: FrontLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/front/HomeView.vue'),
          meta: {
            title: 'Matching TRPG'
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
            title: ' 登入 | Matching TRPG'
          }
        },
        {
          path: 'modules/:id',
          name: 'modules-id',
          component: () => import('@/views/front/ModuleView.vue'),
          meta: {
            title: '模組| Matching TRPG'
          }
        },
        {
          path: 'module',
          name: 'module',
          component: () => import('@/views/front/AllModulesView.vue'),
          meta: {
            title: '模組任務 | Matching TRPG'
          }
        }, {
          path: 'discussion',
          name: 'discussion',
          component: () => import('@/views/front/DiscussionView.vue'),
          meta: {
            title: '探索者心得 | Matching TRPG'
          }
        }, {
          path: 'trpg',
          name: 'trpg',
          component: () => import('@/views/front/TrpgView.vue'),
          meta: {
            title: 'TRPG ? | Matching TRPG'
          }
        }, {
          path: 'aboutus',
          name: 'aboutus',
          component: () => import('@/views/front/AboutusView.vue'),
          meta: {
            title: '關於邁欽 | Matching TRPG'
          }
        }, {
          path: 'orders',
          name: 'orders',
          component: () => import('@/views/user/OrdersView.vue'),
          meta: {
            title: '預約列表 | Matching TRPG'
          }
        }
      ]
    },
    {
      path: '/gm/',
      component: GMLayout,
      children: [
        {
          path: '',
          name: 'gm-home',
          component: () => import('@/views/gm/HomeView.vue'),
          meta: {
            title: 'GM | MatchingTRPG'
          }
        },
        {
          path: 'modulesedit',
          name: 'modulesedit',
          component: () => import('@/views/gm/TEST.vue'),
          meta: {
            title: '模組上架 | MatchingTRPG'
          }
        }, {
          path: 'modules',
          name: 'modules',
          component: () => import('@/views/gm/ModulesView.vue'),
          meta: {
            title: '模組管理 | MatchingTRPG'
          }
        }, {
          path: 'gm-orders',
          name: 'gm-orders',
          component: () => import('@/views/gm/OrdersView.vue'),
          meta: {
            title: '預約管理 | MatchingTRPG'
          }
        }
      ]
    },
    {
      path: '/admin/',
      component: AdminLayout,
      children: [
        {
          path: '',
          name: 'admin-home',
          component: () => import('@/views/admin/HomeView.vue'),
          meta: {
            title: 'Admin | MatchingTRPG'
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
          name: 'user-home',
          component: () => import('@/views/user/HomeView.vue'),
          meta: {
            title: '探索者檔案 | MatchingTRPG'
          }
        },
        {
          path: 'favorite',
          name: 'favorite',
          component: () => import('@/views/front/FavoriteView.vue'),
          meta: {
            title: '收藏庫 | MatchingTRPG'
          }
        },
        {
          path: 'orders',
          name: 'orders',
          component: () => import('@/views/user/OrdersView.vue'),
          meta: {
            title: '預約列表 | MatchingTRPG'
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
  // console.log('beforeEach')
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
