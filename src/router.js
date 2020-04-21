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
    },
    {
      path: '/details',    // 商品详情
      name: 'details',
      component: () => import('./views/Details.vue')
    },
    {
      path: '/myself',    // 我的
      name: 'myself',
      component: () => import('./views/MySelf.vue')
    },
    {
      path: '/pay',    // 支付页面
      name: 'pay',
      component: () => import('./views/Pay.vue')
    },
    {
      path: '/payDone',    // 支付成功
      name: 'payDone',
      component: () => import('./views/PayDone.vue')
    },
    {
      path: '/MyShopDetails',    // 支付成功
      name: 'MyShopDetails',
      component: () => import('./views/MyShopDetails.vue')
    }
  ]
})

