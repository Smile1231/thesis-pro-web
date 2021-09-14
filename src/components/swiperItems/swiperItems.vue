<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>轮播图管理</el-breadcrumb-item>
      <el-breadcrumb-item>轮播图列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <el-row :gutter="30">
        <el-col :span="5">
          <el-button type="primary" @click="addDialogVisible = true" plain>
            添加轮播图
          </el-button>
        </el-col>
      </el-row>

      <!-- 数据表格区域 -->
      <el-table :data="swiperList" stripe border>
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column label="图片名称" prop="imageName"> </el-table-column>
        <el-table-column align="center" label="图片缩略图" prop="imageUrlPath">
          <template v-slot="scope">
            <el-image
              style="width: 80px; height: 100px"
              :src="scope.row.imageUrlPath"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column label="上传时间" prop="uploadtime"></el-table-column>
        <!-- 操作列 -->
        <el-table-column
          align="center"
          label="操作"
          width="210px"
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
                type="primary"
                icon="el-icon-delete"
                @click="DeleteSwiper(scope.row.id)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加的对话框 -->
    <el-dialog
      title="添加轮播图"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <!-- 主题内容区域 -->
      <label class="el-form-item__label" style="width: 80px; margin-left: 20px"
        >上传图片</label
      >
      <el-form :model="addItemsForm" ref="addItemsFormRef" label-width="100px">
        <el-upload
          class="upload-demo"
          action="http://localhost:9999/upload/uploadPicAction"
          :limit="1"
          :on-exceed="handleExceed"
          :file-list="fileList"
          :on-error="handleError"
          name="file"
          :on-success="handleAlbumSuccess"
        >
          <el-button size="small" type="info">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">
            上传文件不能为空，否则将产生样式问题
          </div>
        </el-upload>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //轮播图数据
      swiperList: [],
      //添加按钮
      addDialogVisible: false,
      //添加表单数据
      addItemsForm: {},
      //文件列表
      fileList: [],
    };
  },
  created() {
    this.getSwiperItems();
  },
  methods: {
    //获取轮播图
    async getSwiperItems() {
      const { data: res } = await this.axios.get(
        "http://localhost:9999/swiperItems/swiperItems"
      );
      this.swiperList = res.data;
    },
    //超过文件数量钩子
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    //上传失败钩子
    handleError(err, file, fileList) {
      this.$message.err("上传失败");
    },

    //添加关闭触发事件
    addDialogClosed() {
      this.$refs.addItemsFormRef.resetFields();
    },

    //上传成功钩子
    handleAlbumSuccess(res, file, fileList) {
      const { data } = res;

      //赋值入表单
      this.addItemsForm["imageName"] = data.name;
      this.addItemsForm["imageUrlPath"] = data.url;
    },

    //添加轮播图按钮
    async onSubmit() {
      const { data: res } = await this.axios({
        method: "put",
        url: "http://localhost:9999/swiperItems/swiperItems",
        data: this.addItemsForm,
      });

      if (res.code === 200) {
        this.$message({
          message: "添加成功！",
          type: "success",
        });
      } else {
        this.$message.error("上传失败！");
      }

      this.addDialogVisible = false;
      this.getSwiperItems();
    },

    //删除按钮点击
    async DeleteSwiper(id) {
        // 判断是否删除
      const confirmResult = await this.$confirm(
        "此操作将永久删除此用户, 是否继续?",
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
        `http://localhost:9999/swiperItems/swiperItems/${id}`
      );
      if (res.code === 200) {
        this.$message({
          message: "删除成功！",
          type: "success",
        });
      } else {
        this.$message.error("删除失败！");
      }

      this.getSwiperItems();
    },
  },
};
</script>

<style lang="less" scoped>
</style>