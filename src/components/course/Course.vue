<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>课程管理</el-breadcrumb-item>
      <el-breadcrumb-item>课程列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <el-row :gutter="30">
        <el-col :span="5">
          <el-button type="warning" @click="addDialog"> 添加课程 </el-button>
        </el-col>
      </el-row>

      <!-- 数据表格区域 -->
      <el-table :data="courseList" stripe border>
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column width="120px" label="课程名称" prop="title">
        </el-table-column>
        <el-table-column
          align="center"
          label="课程缩略图"
          prop="courseImageUrlPath"
        >
          <template v-slot="scope">
            <el-image :src="scope.row.courseImageUrlPath"></el-image>
          </template>
        </el-table-column>
        <!-- <el-table-column label="课程描述" prop="uploadtime" class="course_des">
          <template v-slot="scope">
            <p>{{ scope.row.description }}</p>
          </template>
        </el-table-column> -->
        <el-table-column label="学习人数" prop="learnNum"> </el-table-column>
        <el-table-column label="课程教师" prop="teacherName"> </el-table-column>
        <el-table-column
          width="300px"
          label="视频🔗地址"
          prop="videoUrlPath"
        ></el-table-column>
        <el-table-column
          label="开课季节"
          prop="courseWeather"
        ></el-table-column>
        <el-table-column
          width="210px"
          label="上课时间"
          prop="courseTimer"
        ></el-table-column>
        <el-table-column label="是否为热门">
          <template v-slot="scope">
            <el-switch
              v-model="scope.row.hotStateMsg"
              @change="courseStateChanged(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column align="center" label="课程状态" prop="courseStateMsg">
          <template v-slot="scope">
            <el-tag
              type="sucess"
              size="medium"
              v-if="scope.row.courseState === 0"
              >即将开课</el-tag
            >
            <el-tag type="info" size="medium" v-if="scope.row.courseState === 1"
              >已开课</el-tag
            >
            <el-tag
              type="warning"
              size="medium"
              v-if="scope.row.courseState === 2"
              >已结课</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column
          width="118px"
          label="教师学校"
          prop="teacherSchool"
        ></el-table-column>
        <el-table-column
          width="168px"
          label="上传时间"
          prop="uploadtime"
        ></el-table-column>

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
                type="primary"
                icon="el-icon-delete"
                @click="deleteCourse(scope.row.id)"
                size="mini"
              ></el-button>
            </el-tooltip>

            <el-tooltip
              effect="light"
              content="编辑"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="info"
                icon="el-icon-edit"
                @click="editCourse(scope.row.id)"
                size="mini"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!--添加窗口 -->
    <el-dialog
      title="添加课程资料"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <label class="el-form-item__label" style="width: 80px; margin-left: 20px"
        >上传资料</label
      >
      <!-- 内容主题区域 -->
      <el-form
        :model="addCourseForm"
        ref="addCourseFormRef"
        label-width="100px"
      >
        <el-upload
          class="upload-demo"
          action="http://localhost:9999/upload/uploadPicAction"
          :limit="1"
          :on-exceed="handleExceed"
          :file-list="picList"
          :on-error="handleError"
          name="file"
          :on-success="handlePicSuccess"
        >
          <el-button size="small" type="primary">点击上传图片</el-button>
          <div slot="tip" class="el-upload__tip">
            上传文件不能为空，否则将产生样式问题
          </div>
        </el-upload>

        <el-upload
          style="margin-left: 100px; margin-top: 10px; margin-bottom: 10px"
          class="upload-demo"
          action="http://localhost:9999/upload/uploadPicAction"
          :limit="1"
          :on-exceed="handleExceed"
          :file-list="videoList"
          :on-error="handleError"
          name="file"
          :on-success="handleVideoSuccess"
        >
          <el-button size="small" type="primary">点击上传视频</el-button>
          <div slot="tip" class="el-upload__tip">
            上传文件不能为空，否则将产生样式问题
          </div>
        </el-upload>
        <el-form-item label="课程标题" prop="title">
          <el-input v-model="addCourseForm.title"></el-input>
        </el-form-item>
        <el-form-item label="课程描述" prop="description">
          <el-input v-model="addCourseForm.description"></el-input>
        </el-form-item>
        <el-form-item label="课程学习人数" prop="learnNum">
          <el-input v-model="addCourseForm.learnNum"></el-input>
        </el-form-item>
        <el-form-item label="课程授课老师" prop="learnNum">
          <el-select
            v-model="addCourseForm.relatedTeacherId"
            placeholder="选择授课教师"
          >
            <el-option
              v-for="tea in teacherList"
              :key="tea.id"
              :label="tea.teacherName"
              :value="tea.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课程状态" prop="courseState">
          <el-select
            v-model="addCourseForm.courseState"
            placeholder="请选择课程状态"
          >
            <el-option label="即将开课" value="0"></el-option>
            <el-option label="已开课" value="1"></el-option>
            <el-option label="已结课" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课程季节" prop="courseWeather">
          <el-select
            v-model="addCourseForm.courseWeather"
            placeholder="请选择课程季节"
          >
            <el-option label="2021春" value="2021春"></el-option>
            <el-option label="2021夏" value="2021夏"></el-option>
            <el-option label="2021秋" value="2021秋"></el-option>
            <el-option label="2021冬" value="2021冬"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="授课时间" prop="courseTimer">
          <el-date-picker
            v-model="addCourseForm.courseTimer"
            type="datetime"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd"
            align="left"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>

      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑窗口 -->
    <el-dialog
      title="修改课程资料"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <label class="el-form-item__label" style="width: 80px; margin-left: 20px"
        >上传资料</label
      >
      <!-- 内容主题区域 -->
      <el-form
        :model="editCourseForm"
        ref="editCourseFormRef"
        label-width="100px"
      >
        <el-upload
          class="upload-demo"
          action="http://localhost:9999/upload/uploadPicAction"
          :limit="1"
          :on-exceed="handleExceed"
          :file-list="picListEdit"
          :on-error="handleError"
          name="file"
          :on-success="handlePicSuccessEdit"
        >
          <el-button size="small" type="primary">点击上传图片</el-button>
          <div slot="tip" class="el-upload__tip">
            上传文件不能为空，否则将产生样式问题
          </div>
        </el-upload>

        <el-upload
          style="margin-left: 100px; margin-top: 10px; margin-bottom: 10px"
          class="upload-demo"
          action="http://localhost:9999/upload/uploadPicAction"
          :limit="1"
          :on-exceed="handleExceed"
          :file-list="videoListEdit"
          :on-error="handleError"
          name="file"
          :on-success="handleVideoSuccessEdit"
        >
          <el-button size="small" type="primary">点击上传视频</el-button>
          <div slot="tip" class="el-upload__tip">
            上传文件不能为空，否则将产生样式问题
          </div>
        </el-upload>
        <el-form-item label="课程标题" prop="title">
          <el-input v-model="editCourseForm.title"></el-input>
        </el-form-item>
        <el-form-item label="课程描述" prop="description">
          <el-input v-model="editCourseForm.description"></el-input>
        </el-form-item>
        <el-form-item label="课程学习人数" prop="learnNum">
          <el-input v-model="editCourseForm.learnNum"></el-input>
        </el-form-item>
        <el-form-item label="课程授课老师" prop="learnNum">
          <el-select
            v-model="editCourseForm.relatedTeacherId"
            placeholder="选择授课教师"
          >
            <el-option
              v-for="tea in teacherList"
              :key="tea.id"
              :label="tea.teacherName"
              :value="tea.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课程状态" prop="courseState">
          <el-select
            v-model="editCourseForm.courseState"
            placeholder="请选择课程状态"
          >
            <el-option label="即将开课" value="0"></el-option>
            <el-option label="已开课" value="1"></el-option>
            <el-option label="已结课" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课程季节" prop="courseWeather">
          <el-select
            v-model="editCourseForm.courseWeather"
            placeholder="请选择课程季节"
          >
            <el-option label="2021春" value="2021春"></el-option>
            <el-option label="2021夏" value="2021夏"></el-option>
            <el-option label="2021秋" value="2021秋"></el-option>
            <el-option label="2021冬" value="2021冬"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="授课时间" prop="courseTimer">
          <el-date-picker
            v-model="editCourseForm.courseTimer"
            type="datetime"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd"
            align="left"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>

      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmitEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //课程数据
      courseList: [],

      //添加窗口
      addDialogVisible: false,

      //编辑窗口
      editDialogVisible: false,

      //添加表单数据
      addCourseForm: {
        title: "",
        description: "",
        learnNum: "",
        relatedTeacherId: "",
        courseState: "",
        courseWeather: "",
        courseTimer: "",
        hotOrNot: "0",
      },
      //图片列表
      picList: [],
      //视频列表
      videoList: [],
      //教师列表
      teacherList: [],
      //日期参数
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      //修改的表单
      editCourseForm: {},
      //修改图片列表
      picListEdit: [],
      //修改视频列表
      videoListEdit: [],
    };
  },
  created() {
    this.getAllCourse();
  },
  methods: {
    //获取课程资料
    async getAllCourse() {
      const { data: res } = await this.axios.get(
        "http://localhost:9999/studyCourse/AllStudyCourse"
      );
      if (res.code !== 200) return this.$message.err("获取课程列表信息失败！");

      this.courseList = res.data;
    },
    //切换热门
    async courseStateChanged(courseInfo) {
      if (courseInfo.hotOrNot === 1) {
        courseInfo.hotOrNot = 0;
      } else if (courseInfo.hotOrNot === 0) {
        courseInfo.hotOrNot = 1;
      }

      const { data: res } = await this.axios({
        method: "post",
        url: "http://localhost:9999/studyCourse/studyCourse/hot",
        data: courseInfo,
      });

      if (res.code === 200) return this.$message.success("课程状态更新成功！");
      else return this.$message.err("课程状态更新失败");
    },
    //添加按钮
    addDialog() {
      this.getAllTeacher();
      this.addDialogVisible = true;
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

    //图片上传成功钩子
    handlePicSuccess(res, file, fileList) {
      const { data } = res;
      this.addCourseForm["courseImageUrlPath"] = data.url;
    },
    //视频上传成功钩子
    handleVideoSuccess(res, file, fileList) {
      const { data } = res;
      this.addCourseForm["videoUrlPath"] = data.url;
    },
    //获取所有的教师方法
    async getAllTeacher() {
      const { data: res } = await this.axios.get(
        "http://localhost:9999/teacher/findAllTeacher"
      );
      if (res.code !== 200) return this.$message.err("获取教师列表失败！");

      this.teacherList = res.data;
    },
    //删除操作
    async deleteCourse(id) {
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
        `http://localhost:9999/studyCourse/studyCourse/${id}`
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
      this.getAllCourse();
    },
    //编辑操作
    async editCourse(id) {
      const { data: res } = await this.axios.post(
        `http://localhost:9999/studyCourse/getCourseById/${id}`
      );
      this.editCourseForm = res.data;

      this.editDialogVisible = true;
    },
    //添加关闭窗口钩子
    addDialogClosed() {
      this.$refs.addCourseFormRef.resetFields();
    },
    //添加确认钩子
    async onSubmit() {
      //console.log(this.addCourseForm);
      const { data: res } = await this.axios({
        method: "put",
        url: "http://localhost:9999/studyCourse/studyCourse",
        data: this.addCourseForm,
      });
      if (res.code === 200) {
        this.$message.success("添加课程成功");
      } else {
        this.$message.err("添加课程失败!");
      }

      this.addDialogVisible = false;
      this.getAllCourse();
    },

    //编辑关闭窗口钩子
    editDialogClosed() {
      this.$refs.editCourseFormRef.resetFields();
    },

    //图片修改上传成功钩子
    handlePicSuccessEdit(res, file, fileList) {
      const { data } = res;
      this.editCourseForm["courseImageUrlPath"] = data.url;
    },
    //视频修改上传成功钩子
    handleVideoSuccessEdit(res, file, fileList) {
      const { data } = res;
      this.editCourseForm["videoUrlPath"] = data.url;
    },
    //修改提交按钮
    async onSubmitEdit() {
      const { data: res } = await this.axios({
        method: "post",
        url: "http://localhost:9999/studyCourse/studyCourse/details",
        data: this.editCourseForm,
      });

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
      //关闭弹窗
      this.editDialogVisible = false;
      this.getAllCourse();
    },
  },
};
</script>

<style lang="less">
.course_des {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
</style>

