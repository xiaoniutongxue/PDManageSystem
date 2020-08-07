import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import cookie from "./assets/js/comm/cookie";


//第三方插件
import Element from 'element-ui'                /*引入Element ui组件*/
import 'element-ui/lib/theme-chalk/index.css'   /*引入Element ui样式*/

Vue.config.productionTip = false
Vue.use(Element);                              /*使用Element ui*/

router.beforeEach(function (to,from,next) {
  let ugrade
  if(document.cookie){
    ugrade = cookie.getCookie(document.cookie).uGrade
    store.commit('get_User',cookie.getCookie(document.cookie).uName)
  }
  /*1.判断是否为登录界面*/
  if (to.path=='/login'){
    next();
  }else if(to.path=='/index/sysusermanage'){
    /*判断是否为超级管理员*/
    if(ugrade == 'S'){
      next()
    }else{
      next('/index/sysusererr');
    }
  }else{
    /*判断进入其他界面是否登录*/
    if(ugrade !=undefined){
      next();
    }else {
      next('/login');
    }
  }
})

new Vue({
  Element,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
