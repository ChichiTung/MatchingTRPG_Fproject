import { createRouter, createWebHashHistory } from 'vue-router'
import FrontLayout from '@/layouts/FrontLayout.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
// import FrontHomeView  from '@/views/front/HomeView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

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
            title: 'Matching TRPG | 註冊'
          }
        },{
          path: 'module',
          name: 'module',
          component: () => import('@/views/front/ModulesView.vue'),
          meta: {
            title: 'Matching TRPG | 劇本任務'
          }
        },{
          path: 'discussion',
          name: 'discussion',
          component: () => import('@/views/front/DiscussionView.vue'),
          meta: {
            title: 'Matching TRPG | 探索者心得'
          }
        },{
          path: 'trpg',
          name: 'trpg',
          component: () => import('@/views/front/TrpgView.vue'),
          meta: {
            title: 'Matching TRPG | TRPG ?'
          }
        },{
          path: 'aboutus',
          name: 'aboutus',
          component: () => import('@/views/front/AboutusView.vue'),
          meta: {
            title: 'Matching TRPG | 關於邁欽 ?'
          }
        }
      ]
    },
    {
      path: '/gm',
      component: AdminLayout,
      children: [
        {
          path: '',
          name: 'gm',
          component: () => import('@/views/gm/HomeView.vue'),
          meta: {
            title: 'MatchingTRPG | GM'
          }
        }
        ,{
          path: '/modulesedit',
          name: 'modulesedit',
          component: () => import('@/views/gm/ModulesView.vue'),
          meta: {
            title: 'MatchingTRPG | 上架模組'
          }
        }
      ]
    },
    {
      path: '/user',
      component: FrontLayout,
      children: [
        {
          path: '',
          name: 'user',
          component: () => import('@/views/user/HomeView.vue'),
          meta: {
            title: 'MatchingTRPG | Player'
          }
        }
        
      ]
    },
    {
      path: '/404',
      name: '404',
      component: NotFoundView,
      meta: {
        title: 'Matching TRPG | Not Found'
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

export default router