import { createRouter, createWebHashHistory } from 'vue-router'
import FrontLayout from '@/layouts/FrontLayout.vue'
import FrontHomeView from '@/views/front/HomeView.vue'
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
          name: 'homepage',
          component: FrontHomeView,
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
        }
      ]
    },
    {
      path: '/404',
      name: '404',
      component: NotFoundView,
      meta: {
        title: 'Matching TRPG | 404 Not Found'
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