<template>
  <el-container class="home-container">
      <!-- 头部 -->
    <el-header>
        <div>
            <img src="../assets/logo.png" alt="">
            <span>在线学习平台后台管理系统</span>
        </div>
        <el-button type="info" @click="logout">退出登录</el-button>
    </el-header>
    <el-container>
        <!-- 侧边栏 -->
      <el-aside :width="isToggle ? '64px':'200px'">
          <!-- 侧边栏菜单区域 -->
          <div class="toggle-button" @click="toggleCollapse"> |||
            </div>
         <el-menu
            class="el-menu-vertical-demo"
            background-color="#333743"
            text-color="#fff"
            active-text-color="#65CCFF"
            :unique-opened="true"
            :collapse-transition="false"
            :collapse = "isToggle"
            :router="true"
            :default-active="activePath"
            >
        <!-- :default-active="$route.path" -->
            <!-- 一级菜单 -->
            <el-submenu :index="item.id+''" v-for="(item) in menuList" :key="item.id">
                <!-- 一级菜单的模版区域 -->
                <template slot="title">
                    <!-- 图标 -->
                <i :class="iconsObj[item.id]"></i>
                <!-- 文本 -->
                <span>{{item.authName}}</span>
                </template>
                <!-- 二级菜单 -->
                <el-menu-item :index="'/'+subItem.path" v-for="(subItem) in item.children" :key="subItem.id"
                  @click="saveNavState('/'+subItem.path)"
                >
                    <template slot="title">
                    <!-- 图标 -->
                    <i class="el-icon-menu"></i>
                    <!-- 文本 -->
                    <span>{{subItem.authName}}</span>
                    </template>
                </el-menu-item>

            </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 主体 -->
      <el-main>
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {

    data() {
        return {
            menuList: [],
            // 小图标
            iconsObj:{
                '101' : 'el-icon-user-solid',
                '102' : 'el-icon-s-tools',
                '103' : 'el-icon-s-goods',
                '104' : 'el-icon-s-order',
                '105' : 'el-icon-s-marketing',
                '106' : 'el-icon-s-custom',
                '107' : 'el-icon-picture-outline-round',
            },
            //是否折叠
            isToggle: false,
            //激活索引
            activePath: ''
        }
    },
    //被创建时的钩子函数
  created() {
      this.getMenuList();
      //在创建时，就获取激活索引
      this.activePath = window.sessionStorage.getItem('activePath');
  },  
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
     getMenuList(){
      this.axios.get('getMenus').then((res) => {
        // console.log(res);
         if(res.status !== 200 || !res) return this.$message.error('菜单列表获取失败！');

         this.menuList = res.data;
        });
    },
    toggleCollapse(){
        this.isToggle = ! this.isToggle;
    },
    //点击保存激活索引
    saveNavState(activePath){
        //保存激活索引
        window.sessionStorage.setItem('activePath',activePath);
        this.activePath = activePath;
    }
  },
};
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #666666;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  div {
    display: flex;
    align-items: center;
    img {
      margin-left: 20px;
      height: 40px;
    }
    span {
      margin-left: 15px;
      font-size: 25px;
    }
  }
}
.el-aside {
  background-color: #333743;
  .el-menu{
      border-right: none;
  }
}
.el-main {
  background-color: #ebedf1;
}

.toggle-button{
    background-color: #999999;
    color: wheat;
    line-height: 24px;
    text-align: center;
    letter-spacing: 0.3em;
}
</style>