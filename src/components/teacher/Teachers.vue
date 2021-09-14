<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>教师管理</el-breadcrumb-item>
      <el-breadcrumb-item>教师列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card>
      <el-row :gutter="30">
        <el-col :span="5">
          <el-button type="primary" @click="addDialogVisible = true"
            >添加教师</el-button
          >
        </el-col>
      </el-row>
      <!-- 数据区域 -->
      <el-table :data="teacherList" stripe border>
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column label="教师姓名" prop="teacherName"> </el-table-column>
        <el-table-column label="教师学校" prop="teacherSchool">
        </el-table-column>
        <el-table-column
          label="教师描述"
          prop="teacherDescription"
          class="des_tea"
        >
        </el-table-column>
        <el-table-column
          align="center"
          label="教师图片"
          prop="teacherImageUrlPath"
        >
          <template v-slot="scope">
            <el-image
              style="width: 60px; height: 88px"
              :src="scope.row.teacherImageUrlPath"
            >
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="更新时间" prop="uploadtime"> </el-table-column>
        <el-table-column label="是否为热门">
          <template v-slot="scope">
            <el-switch
              v-model="scope.row.hotOrNotState"
              @change="userStateChanged(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="210px" class="table_column_action">
          <template v-slot="scope">
            <el-tooltip
              effect="dark"
              content="编辑"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="primary"
                icon="el-icon-edit"
                @click="showEditDialog(scope.row.id)"
              ></el-button>
            </el-tooltip>

            <el-tooltip
              effect="dark"
              content="删除"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="info"
                icon="el-icon-delete"
                @click="removeTeacherById(scope.row.id)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <!-- <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 3, 5]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination> -->
    </el-card>

    <!-- 添加的对话框 -->
    <el-dialog
      title="添加教师资料"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <!-- 内容主题区域 -->
      <label class="el-form-item__label" style="width: 80px; margin-left: 20px"
        >上传图片</label
      >
      <!-- <el-upload
            class="upload-demo"
            :before-upload="beforeupload"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            style="margin-left:80px;"
            :file-list="fileList"
            >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload> -->

      <el-form
        :model="addTeacherForm"
        ref="addTeacherFormRef"
        label-width="100px"
      >
        <el-upload
          class="upload-demo"
          action="http://localhost:9999/upload/uploadPicAction"
          :limit="3"
          :on-exceed="handleExceed"
          :file-list="fileList"
          :on-error="handleError"
          name="file"
          :on-success="handleAlbumSuccess"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">
            上传文件不能为空，否则将产生样式问题
          </div>
        </el-upload>
        <el-form-item label="教师姓名" prop="teacherName">
          <el-input v-model="addTeacherForm.teacherName"></el-input>
        </el-form-item>
        <el-form-item label="教师学校" prop="teacherSchool">
          <el-input v-model="addTeacherForm.teacherSchool"></el-input>
        </el-form-item>
        <el-form-item label="教师描述" prop="teacherDescription">
          <el-input v-model="addTeacherForm.teacherDescription"></el-input>
        </el-form-item>
      </el-form>

      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改的对话框 -->
    <el-dialog
      title="修改教师信息"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <!-- 内容主体 -->
      <el-form
        :model="editTeacherForm"
        ref="editTeacherFormRef"
        label-width="70px"
      >
        <el-form-item label="教师名字" prop="teacherName">
          <el-input v-model="editTeacherForm.teacherName"></el-input>
        </el-form-item>
        <el-form-item label="教师学校" prop="teacherSchool">
          <el-input v-model="editTeacherForm.teacherSchool"></el-input>
        </el-form-item>
        <el-form-item label="教师描述" prop="teacherDescription">
          <el-input v-model="editTeacherForm.teacherDescription"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editTeacher">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      teacherList: [
        {
          teacherName: "测试",
          teacherSchool: "华东师范大学",
          teacherDescription: "这是一个描述",
          hotOrNotState: false,
        },
      ],
      // 控制添加教师对话框的显示与隐藏
      addDialogVisible: false,
      addTeacherForm: {
        teacherName: "",
        teacherSchool: "",
        teacherDescription: "",
      },

      // 图片列表
      fileList: [],

      //修改的弹窗
      editDialogVisible: false,
      //修改的表单
      editTeacherForm: {},
    };
  },
  created() {
    this.getTeacherList();
  },
  methods: {
    //获取教师列表
    getTeacherList() {
      var that = this;
      that
        .axios({
          method: "get",
          url: "http://localhost:9999/teacher/findAllTeacher",
        })
        .then((res) => {
          var { data } = res;
          //console.log(data);
          this.teacherList = data.data;
        });
    },

    //添加提交按钮
    onSubmit() {
      //表单提交的事件
      //var names = this.form.name;
      //下面append的东西就会到form表单数据的fields中；
      // this.param.append('message', names);

      //然后通过下面的方式把内容通过axios来传到后台
      //下面的this.$reqs 是在主js中通过Vue.prototype.$reqs = axios 来把axios赋给它;
      //console.log(this.addTeacherForm);

      this.axios({
        method: "put",
        url: "http://localhost:9999/teacher/teacher",
        data: {
          teacherName: this.addTeacherForm.teacherName,
          teacherSchool: this.addTeacherForm.teacherSchool,
          teacherImageUrlPath: this.addTeacherForm.teacherImageUrlPath,
          teacherDescription: this.addTeacherForm.teacherDescription,
        },
      }).then((res) => {
        //console.log(res);
        const { data } = res;
        if (data.code === 200) {
          this.$message({
            type: "success",
            message: "添加成功!",
          });
        }
        this.addDialogVisible = false;

        this.getTeacherList();
      });
    },

    //根据id删除教师
    async removeTeacherById(id) {
      //console.log(id);
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

      const { data: res } = await this.axios.post(
        `http://localhost:9999/teacher/teacher/remove/${id}`
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

      this.getTeacherList();
    },

    // 监听switch按钮
    userStateChanged(teacherInfo) {
      var that = this;
      var param;
      //console.log(teacherInfo);
      if (teacherInfo.hotOrNot === 1) {
        teacherInfo.hotOrNot = 0;
        param = 0;
      } else if (teacherInfo.hotOrNot === 0) {
        teacherInfo.hotOrNot = 1;
        param = 1;
      }
      that
        .axios({
          method: "post",
          url: "http://localhost:9999/teacher/teacher/hot",
          data: {
            id: teacherInfo.id,
            hotOrNot: param,
          },
        })
        .then(function (res) {
          //console.log(res.data);
          if (res.data.code == 200) {
            return that.$message({
              message: "教师状态更新成功！",
              type: "success",
            });
          } else {
            teacherInfo.hotOrNotState = !teacherInfo.hotOrNotState;
            return that.$message({
              message: "教师状态更新失败！",
              type: "error",
            });
          }
          //that.getTeacherList();
        });

      //that.getTeacherList();
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    handleAlbumSuccess(res, file, fileList) {
      //console.log("----");
      //console.log(res);
      const { data } = res;
      //console.log(data);
      //this.addTeacherForm["picName"] = data.name;
      this.addTeacherForm["teacherImageUrlPath"] = data.url;
    },
    handleError(err, file, fileList) {
      console.log("上传失败");
    },

    //添加关闭触发事件
    addDialogClosed() {
      this.$refs.addTeacherFormRef.resetFields();
    },

    //编辑关闭触发事件
    editDialogClosed() {
      this.$refs.editTeacherFormRef.resetFields();
    },

    //编辑教师资料操作
    async showEditDialog(id) {
      //console.log("---");
      const { data: res } = await this.axios.post(
        `http://localhost:9999/teacher/findByTeacherId/${id}`
      );
      if (res.code !== 200) return this.$message.error("获取用户列表失败！");

      //console.log(res);
      this.editTeacherForm = res.data;
      this.editDialogVisible = true;
    },

    //确定修改提交
    async editTeacher() {
      const { data: res } = await this.axios({
        method: "post",
        url: "http://localhost:9999/teacher/teacher/details",
        data: this.editTeacherForm,
      });
      //console.log(res);
      if (res.code === 200) {
        this.$message({
          type: "success",
          message: "修改成功!",
        });
      } else {
        this.$message({
          type: "error",
          message: "修改失败",
        });
      }
      //关闭弹窗，重新调用
      this.editDialogVisible = false;
      this.getTeacherList();
    },
  },
};
</script>

<style lang="less" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.des_tea {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
</style>