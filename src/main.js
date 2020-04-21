import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios"
import moment from 'moment' // 时间格式处理
import ElementUI from 'element-ui'   //引入组件库
import 'element-ui/lib/theme-chalk/index.css' // 组件库样式
import vueSwiper from 'vue-awesome-swiper'  //引入vue-awesome-swiper
import 'swiper/dist/css/swiper.css'  //引入样式

Vue.use(ElementUI)
Vue.use(vueSwiper)

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$moment = moment
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
