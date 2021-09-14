<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
<!-- 卡片视图 -->
    <el-card>
        <el-table
        :data="rightsList"
        border
        stripe
        >
        <el-table-column type="index"  label="#" ></el-table-column>
        <el-table-column prop="authname" label="权限名称" > </el-table-column>
        <el-table-column prop="path" label="路径" > </el-table-column>
        <el-table-column prop="level" label="等级">
            <template v-slot="scope">
                <el-tag type="success" size = "medium" v-if="scope.row.level === '0'">一级权限</el-tag>
                <el-tag type="info" size = "medium" v-else-if="scope.row.level === '1'">二级权限</el-tag>
                <el-tag type="warnign" size = "medium" v-else>三级权限</el-tag>
            </template>
        </el-table-column>
        </el-table>
    </el-card>
  </div>
</template>>

<script>
export default {
    data() {
        return {
            //权限列表数据
            rightsList: []
        }
    },
    created() {
        this.getRightsList();
    },
    methods: {
        //获取权限列表
        getRightsList(){
                var that = this;
                that.axios
            .get("getRights")
            .then(function (res) {
                console.log(res.data);
                //进行赋值
                that.rightsList = res.data;
                //that.total = res.data.totalpage;
            })
            .catch(function (error) {
                 console.log(error);
            });
        }
    },
};
</script>

<style lang="less" scoped>
</style>

