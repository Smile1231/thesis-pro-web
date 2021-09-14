import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import axios from 'axios'
import Vueaxios from 'vue-axios'
import echarts from 'echarts'

// 导入全局样式
import './assets/css/global.css'

Vue.config.productionTip = false

Vue.use(Vueaxios,axios)

Vue.prototype.$echarts = echarts

//自定义全局时间过滤器



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
