import Vue from 'vue'
import Vuex from 'vuex'
import isLogin from "./modules/isLogin"
import details from "./modules/details"
import user from './modules/user'
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        isLogin,
        user,
        details
    }
})
