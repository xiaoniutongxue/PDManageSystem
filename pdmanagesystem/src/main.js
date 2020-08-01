import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


//第三方插件
import Element from 'element-ui'               /*引入Element ui组件*/
import 'element-ui/lib/theme-chalk/index.css'   /*引入Element ui样式*/

Vue.config.productionTip = false
Vue.use(Element);                             /*使用Element ui*/

new Vue({
  Element,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
