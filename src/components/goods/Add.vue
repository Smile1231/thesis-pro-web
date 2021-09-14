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
      <!-- 警告提示信息 -->
      <el-alert
        title="添加商品信息"
        type="warning"
        :closable="false"
        center
        show-icon
      >
      </el-alert>
      <!-- 步骤条 -->

      <el-steps
        :space="200"
        :active="activeaTitle - 0"
        finish-status="success"
        align-center
      >
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
      </el-steps>
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="100px"
        class="demo-ruleForm"
        label-position="top"
      >
        <el-tabs
          v-model="activeaTitle"
          :tab-position="'left'"
        >
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="goodsName">
              <el-input v-model="addForm.goodsName"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goodsPrice">
              <el-input v-model="addForm.goodsPrice" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goodsWeight">
              <el-input v-model="addForm.goodsWeight" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goodsNum">
              <el-input v-model="addForm.goodsNum" type="number"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">商品参数</el-tab-pane>
          <el-tab-pane label="商品属性" name="2">商品属性</el-tab-pane>
          <el-tab-pane label="商品图片" name="3">商品图片</el-tab-pane>
          <el-tab-pane label="商品内容" name="4">商品内容</el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //激活的索引
      activeaTitle: "0",
      addForm: {
        goodsName: "",
        goodsPrice: 0,
        goodsWeight: 0,
        goodsNum: 0
      },
      addFormRules: {
        goodsName: [
          { required: true, message: "请输入商品名称", trigger: "blur" }  
        ],
        goodsWeight: [
          { required: true, message: "请输入商品名称", trigger: "blur" }
        ],
        goodsPrice: [
          { required: true, message: "请输入商品名称", trigger: "blur" }
        ],
        goodsNum: [
          { required: true, message: "请输入商品名称", trigger: "blur" }
        ],
      },
    };
  },
};
</script>

<style lang="less" scoped>
</style>
