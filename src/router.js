import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Index from './views/Index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',    // 首页
      name: 'index',
      component: Index    
    },
    {
      path: '/login',   // 登陆
      name: 'login',
      component: Login
    },
    {
      path: '/register',    // 注册
      name: 'register',
      component: () => import('./views/Register.vue')
    },
    {
      path: '/admin',    // 管理员主页
      name: 'admin',
      component: () => import('./views/Admin.vue')
    },
    {
      path: '/feedback',    // 意见反馈
      name: 'feedback',
      component: () => import('./views/FeedBack.vue')
    },
    {
      path: '/shopcar',    // 购物车
      name: 'shopcar',
      component: () => import('./views/ShopCar.vue')
    },
    {
      path: '/brand',    // 品牌
      name: 'brand',
      component: () => import('./views/Brand.vue')
    }
  ]
})

