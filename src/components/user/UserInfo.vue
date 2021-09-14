<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card>
      <el-row :gutter="30">
        <el-alert
          title="所有用户皆为微信用户，无法进行修改操作！"
          type="warning"
        >
        </el-alert>
      </el-row>

      <!-- 数据表格区域 -->
      <el-table :data="userList" stripe border>
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column label="用户昵称" prop="nickName"> </el-table-column>
        <el-table-column align="center" label="用户头像" prop="imageUrlPath">
          <template v-slot="scope">
            <el-image :src="scope.row.imageUrlPath"></el-image>
          </template>
        </el-table-column>
        <el-table-column label="用户性别" prop="gender"> </el-table-column>
        <el-table-column label="用户国家" prop="country"> </el-table-column>
        <el-table-column label="用户省市" prop="province"> </el-table-column>
        <el-table-column label="用户城市" prop="city"> </el-table-column>
        <el-table-column label="用户收藏" align="center" width="160px" prop="favorCourseName">
          <template v-slot="scope">
            <el-tag
              v-for="(favor, index) in scope.row.favorCourseName"
              :key="index"
              type="info"
              >{{ favor }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column align="center" width="160px" label="用户历史浏览" prop="historyCourseName">
          <template v-slot="scope">
            <el-tag style="margin-bottom:5px;"
              v-for="(history, index) in scope.row.historyCourseName"
              :key="index"
              type="success"
              >{{ history }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column  width="200px" label="更新时间" prop="createtime"> </el-table-column>

        <!-- 操作列 -->
        <el-table-column
          align="center"
          label="操作"
          width="150px"
          class="table_column_action"
        >
          <template v-slot="scope">
            <el-tooltip
              effect="light"
              content="删除"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                icon="el-icon-delete"
                @click="deleteUser(scope.row.openId)"
                size="mini"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //用户数据
      userList: [],
    };
  },
  created() {this.getAllUserDetails();},
  methods: {
    //获取用户数据
    async getAllUserDetails() {
      const { data: res } = await this.axios.get(
        "http://localhost:9999/userInfo/userInfo"
      );
      if (res.code === 200) {
        this.$message.success("获取用户信息成功");
      } else {
        this.$message.err("获取用户信息失败");
      }

      this.userList = res.data;
    },

    //删除用户
    async deleteUser(id) {
      const confirmResult = await this.$confirm(
        "此操作将永久删除此课程, 是否继续?",
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      // 点击确定 返回值为：confirm
      // 点击取消 返回值为： cancel
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消删除");
      }

      const { data: res } = await this.axios.delete(
        `http://localhost:9999/userInfo/userInfo/${id}`
      );
      if (res.code === 200) {
        this.$message({
          type: "sucess",
          message: "删除成功",
        });
      } else {
        this.$message({
          type: "error",
          message: "删除失败",
        });
      }

      this.getAllUserDetails();
    },
  },
};
</script>

<style lang="less">
</style>


