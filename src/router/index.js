import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/HomeView.vue'),
    children: [
      // 默认子路由
      {
        path: '',
        name: 'home',
        component: () => import('@/views/home/IndexView.vue')
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/QaView.vue')
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/VideoView.vue')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/MyView.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search/SearchView.vue')
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article/ArticleDetail.vue'),
    props: true // 把路由参数映射到组件当中,方便使用
  }
]

const router = new VueRouter({
  routes
})

export default router
