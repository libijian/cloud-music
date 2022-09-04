import { createRouter, createWebHistory } from 'vue-router'
import  store  from '@/store/index.js';
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( '../views/AboutView.vue')
  },
  {
    path: '/itemMusic',
    name: 'ItemMusic',
    component: () => import( '../views/ItemMusic.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import( '../views/Search.vue')
  },
  //
  {
    path: '/login',
    name: 'Login',
    component: () => import( '../views/Login.vue')
  },
  {
    path: '/user',
    name: 'User',
    beforeEnter: (to, from, next) => {
      // 路由守卫
      if(store.state.isLogin){
        next()
      }else{
        next('/login')
      }
    },
    component: () => import( '../views/User.vue')
  },
  {
    path: '/cloud',
    name: 'Cloud',
    component: () => import( '../views/Cloud.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to,from)=>{
if(to.path=='/login'){
  store.state.isFooterMusic=false
}else{
  store.state.isFooterMusic=true
}
})


export default router
