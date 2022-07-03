import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import axios from 'axios'

import GeneIndex from '../components/gene/GeneIndex.vue'


//接口基础地址
// axios.defaults.baseURL = 'http://www.ysqorz.top:8888/api/private/v1/'

// axios.defaults.baseURL = 'http://58.198.178.163:9999/api'
axios.defaults.baseURL = 'http://localhost:9999/api'
// axios.defaults.baseURL = '/api'
//Vue.prototype.$http = axios

// 在request 拦截器中, 展示进度条 NProgress.start()
// 请求在到达服务器之前，先会调用use中的这个回调函数来添加请求头信息
// axios.interceptors.request.use(config => {
//   // NProgress.start()
//   // // console.log(config)
//   // // 为请求头对象，添加token验证的Authorization字段
//   // config.headers.Authorization = window.sessionStorage.getItem('token')
//   // // 在最后必须 return config

//    config.headers.Authorization = window.sessionStorage.getItem('token');
//    return config
// })

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: GeneIndex
  },
  {
    path: '/geneIndex',
    component: GeneIndex
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

  // 挂载路由导航守卫,
  //to表示将要访问的路径，
  //from表示从哪里来，
  //next是下一个要做的操作 
  //next('/login')强制跳转login
  router.beforeEach((to,from,next) => {
     // 访问登陆页，放行
     if(to.path == '/login') return next()
     //获取token
     const tokenStr = window.sessionStorage.getItem('token')
     //没有token ， 强制跳转到登陆页
     if(!tokenStr) return next('/login')

     next()

  })



export default router
