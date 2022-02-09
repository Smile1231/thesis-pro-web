import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import axios from 'axios'
import Welcome from '../components/Welcome.vue'
import Users from '../components/user/Users.vue'
import Rights from '../components/power/Rights.vue'
import Roles from '../components/power/Roles.vue'
import Params  from "../components/goods/Params.vue"
import Add from '../components/goods/Add.vue'
import Report from '../components/report/Report.vue'


import Teacher from '../components/teacher/Teachers.vue'

import SwiperItems from '../components/swiperItems/swiperItems.vue'

import Course from '../components/course/Course.vue'

import UserInfo from '../components/user/UserInfo.vue'

import GeneIndex from '../components/gene/GeneIndex.vue'


//接口基础地址
// axios.defaults.baseURL = 'http://www.ysqorz.top:8888/api/private/v1/'

// axios.defaults.baseURL = 'http://localhost:9999/'

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
    component: Login
  },
  {
    path: '/geneIndex',
    component: GeneIndex
  },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children:[
      {
      path: '/welcome',
      component: Welcome
      },
      {
        path: '/users',
        component: UserInfo
      },
      {
        path: '/rights',
        component: Rights
      },
      {
        path: '/roles',
        component: Roles
      },
      {
        path: '/category',
        component: Params
      },
      {
        path: '/goods',
        component: Add
      },
      {
        path: '/reports',
        component: Report
      },{
        path: '/teachers',
        component: Teacher
      },{
        path: '/swiperItems',
        component: SwiperItems
      },{
        path: '/course',
        component: Course
      }
  ]
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
