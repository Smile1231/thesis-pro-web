<template>
  <div class="gene_main">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#eaeaea"
      text-color="#858585"
      @select="handleSelect"
    >
      <el-menu-item class="nav_first">CRISPR GENE Tools</el-menu-item>
      <!-- <el-menu-item index="1">about</el-menu-item>
      <el-menu-item index="2">
        <template slot="title">Cas-OFFinder</template> -->
      <!-- <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu> -->
      <!-- </el-menu-item>
      <el-menu-item index="3">Microhomology</el-menu-item>
      <el-menu-item index="4">Cas-Designer</el-menu-item>
      <el-menu-item index="5">DataBase</el-menu-item>
      <el-menu-item index="6">Analyzer</el-menu-item>
      <el-menu-item index="7">Digenome-Seq</el-menu-item>
      <el-menu-item index="8">Base Editing</el-menu-item> -->
    </el-menu>
    <div class="line"></div>
    <div class="gene_body">
      <div class="font_style">
        <h2>BE-Analyzer</h2>
        <h3>
          A JavaScript-based instant assessment tool for NGS data of CRISPR base
          edited cells.
        </h3>
        <div class="p_all">
          <p>
            Thanks to the improvements in the newest JavaScript engines in the
            most recent web browsers, the JavaScript based internal algorithm of
            BE-Analyzer completely runs on the client-side so that large amounts
            of sequencing data do not need to be uploaded to the server.
          </p>
          <p>
            info: Hwang G-H et al. Web-based design and analysis tools for
            CRISPR base editing. BMC Bioinformatics 19, 542 (2018).
          </p>

          <p>
            To comfirm that the substitutions are derived from CRISPR base
            editors, it is recommended to compare the treated data with
            untreated one as a negative control.
          </p>
          <p>
            Please input your data in below form, or download an example data
            here.
          </p>
        </div>
      </div>
      <div class="gene_panel">
        <el-container class="gene_container">
          <el-main class="gene_main">
            <el-row :gutter="40">
              <!-- <el-col :span="5">
                <div class="grid-content bg-purple-light"></div>
              </el-col> -->
              <!-- 第一行panel -->
              <el-col :span="24"
                ><div class="grid-content bg-purple">
                  <div class="panel_all">
                    <div class="panel_title">
                      <h2>Sequencing Data</h2>
                    </div>
                    <div class="panel_first_content">
                      <div class="content_subTitle">
                        <h4>
                          Please upload a file with .fa.gz suffix
                          <a href="javascript:;" @click="downloadGZFile">
                            📝 &nbsp; download example
                          </a>
                        </h4>
                      </div>
                      <!-- 下拉框 -->
                      <div class="content_select">
                        <el-select
                          v-model="select"
                          filterable
                          placeholder="Please select"
                          size="medium"
                          style="width: 400px"
                        >
                          <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select>
                      </div>
                      <!-- 文件上传 -->
                      <div class="content_file_upload">
                        <el-row>
                          <!-- 第一个文件上传按钮 -->
                          <el-col :span="12"
                            ><div class="grid-content bg-purple">
                              <div class="content_upload_gz">
                                <el-upload
                                  class="upload-demo"
                                  ref="GZUpload"
                                  :action="uploadUrl"
                                  :before-remove="beforeGZRemove"
                                  :limit="1"
                                  :accept="acceptGZ"
                                  :on-exceed="handleExceed"
                                  :file-list="GZFileList"
                                  :on-success="onGZSuccess"
                                  :on-error="onError"
                                  :auto-upload="false"
                                >
                                  <el-button
                                    slot="trigger"
                                    size="medium"
                                    type="primary"
                                    >Click To Select File</el-button
                                  >
                                  <el-button
                                    style="margin-left: 10%"
                                    size="medium"
                                    type="success"
                                    @click="submitGZUpload"
                                    >Upload File To Server</el-button
                                  >
                                  <div slot="tip" class="el-upload__tip">
                                    Only Upload .gz File.
                                  </div>
                                </el-upload>
                              </div>
                            </div></el-col
                          >
                        </el-row>
                      </div>
                    </div>
                  </div>
                </div></el-col
              >
              <!-- <el-col :span="5"><div class="grid-content bg-purple"></div></el-col> -->
            </el-row>

            <!-- 第二行panel -->
            <el-row :gutter="40">
              <el-col :span="24"
                ><div class="grid-content bg-purple">
                  <div class="panel_all">
                    <div class="panel_title">
                      <h2>Basic Information</h2>
                    </div>
                    <div class="panel_sec_content">
                      <div class="content_subTitle">
                        <h4>
                          Please upload a file with .xlsx suffix
                          <a href="javascript:;" @click="downloadXLSXFile">
                            📝 &nbsp; download example
                          </a>
                        </h4>
                      </div>
                      <!-- 文件上传 -->
                      <div class="content_file_upload">
                        <el-row>
                          <!-- 第二个文件上传按钮 -->
                          <el-col :span="12"
                            ><div class="grid-content bg-purple">
                              <div class="content_upload_xlsx">
                                <el-upload
                                  class="upload-demo"
                                  ref="XLSXUpload"
                                  :action="uploadUrl"
                                  :before-remove="beforeXLSXRemove"
                                  :limit="1"
                                  :accept="acceptXLSX"
                                  :on-exceed="handleExceed"
                                  :file-list="XLSXFileList"
                                  :on-success="onXLSXSuccess"
                                  :on-error="onError"
                                  :auto-upload="false"
                                >
                                  <el-button
                                    slot="trigger"
                                    size="medium"
                                    type="primary"
                                    >Click To Select File</el-button
                                  >
                                  <el-button
                                    style="margin-left: 10%"
                                    size="medium"
                                    type="success"
                                    @click="submitXLSXUpload"
                                    >Upload File To Server</el-button
                                  >
                                  <div slot="tip" class="el-upload__tip">
                                    Only Upload .xlsx File
                                  </div>
                                </el-upload>
                              </div>
                            </div></el-col
                          >
                        </el-row>
                      </div>
                      <!-- 图片 -->
                      <div class="second_panel_pic">
                        <img
                          src="../../assets/be_analyzer_upper.png"
                          alt=""
                          style="width: 80%"
                        />
                      </div>

                      <!-- 图片 -->
                      <div class="second_panel_pic2">
                        <img
                          src="../../assets/BE-Analyzer-modify.png"
                          alt=""
                          style="width: 80%"
                        />
                      </div>

                      <!-- submit 按钮 -->
                      <div class="submit_button">
                        <el-button type="danger" size="big" @click="enterEmail"
                          >Submit</el-button
                        >
                      </div>
                      <!-- 大白话 -->
                      <p>
                        Note that reference sequences can be adjusted according
                        to the direction of crRNA. If your crRNA targets the
                        opposite strand of reference sequences, they will be
                        displayed as reverse complementary form.
                      </p>
                      <p>
                        1. Reference Komor AC et al., Nature 533, 420-424
                        (2016).
                      </p>
                      <p>
                        2. Kim YB et al., Nature Biotechnology 35, 371-376
                        (2017).
                      </p>
                      <p>
                        3. Nishida K et al., Science 353, aaf8729 (2016). Nicole
                        MG
                      </p>
                      <p>4. et al., Nature 551, 464-471 (2017).</p>
                    </div>
                  </div>
                </div></el-col
              >
            </el-row>
          </el-main>
        </el-container>
      </div>
    </div>

    <!-- 漂浮进度框 -->
    <div class="float_steps">
      <el-steps
        class="float_form"
        :active="active"
        direction="vertical"
        finish-status="success"
      >
        <el-step title="step 1" description="please select gz file and clink upload button"></el-step>
        <el-step title="step 2" description="please select xlsx file and clink upload button"></el-step>
        <el-step title="step 3" description="please click submit button,enter email and click confirm button"></el-step>
      </el-steps>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      activeIndex: "1",
      activeIndex2: "1",
      options: [
        {
          value: "Paired-end reads",
          label: "Paired-end reads",
        },
        {
          value: "Single-end read or fastq-joined file",
          label: "Single-end read or fastq-joined file",
        },
      ],
      select: "",
      uploadUrl: "http://localhost:9999/upload/uploadFile",
      acceptGZ: ".gz",
      acceptXLSX: ".xlsx",
      //文件上传列表
      GZFileList: [],
      XLSXFileList: [],
      email: "",
    };
  },
  methods: {
    // 点击步骤
    next() {
      if (this.active++ > 2) this.active = 0;
    },

    handleSelect() {},
    //下载xlsx 样例文件
    downloadXLSXFile() {
      var that = this;
      that.axios
        .post(
          "/download/XLSXExampleFile",
          { fileId: 123 },
          { responseType: "blob" } // 设置responseType对象格式为 blob:
        )
        .then((res) => {
          console.log(res);
          let blob = new Blob([res.data], {
            type: "application/octet-stream",
          }); // 获取请求返回的response对象中的blob 设置文件类型

          let url = window.URL.createObjectURL(blob); // 创建一个临时的url指向blob对象
          let a = document.createElement("a");
          a.href = url;
          a.download = "text.xlsx";
          a.click();
          window.URL.revokeObjectURL(url); //释放blob对象
        });
    },

    //下载 gz样例文件
    downloadGZFile() {
      var that = this;
      that.axios
        .post(
          "/download/GZExampleFile",
          { fileId: 123 },
          { responseType: "blob" } // 设置responseType对象格式为 blob:
        )
        .then((res) => {
          console.log(res);
          let blob = new Blob([res.data], {
            type: "application/octet-stream",
          }); // 获取请求返回的response对象中的blob 设置文件类型

          let url = window.URL.createObjectURL(blob); // 创建一个临时的url指向blob对象
          let a = document.createElement("a");
          a.href = url;
          a.download = "test.fq.gz";
          a.click();
          window.URL.revokeObjectURL(url); //释放blob对象
        });
    },
    handleExceed(files, fileList) {
      this.$message.warning(`you can only upload one file `);
    },
    beforeGZRemove(file, fileList) {
      this.GZFileList.pop();
      this.$message({
        type: "success",
        message: "Delete Succsssfully !!",
      });
    },
    onGZSuccess(res) {
      this.$message.success("upload successfully");
      this.GZFileList.push(res.data);
    },
    onError(res) {
      this.$message("fail to upload file , plz try again !");
    },
    submitGZUpload() {
      var that = this;
      that.$nextTick(() => {
        this.$refs.GZUpload.submit();
        this.active = 1;
      });
    },
    // second upload button
    onXLSXSuccess(res) {
      this.$message.success("upload successfully");
      this.XLSXFileList.push(res.data);
    },
    beforeXLSXRemove() {
      this.XLSXFileList.pop();
      this.$message({
        type: "success",
        message: "Delete Succsssfully !!",
      });
    },
    submitXLSXUpload() {
      var that = this;
      that.$nextTick(() => {
        this.$refs.XLSXUpload.submit();
        this.active = 2;
      });
    },

    enterEmail() {
      this.$prompt("Please enter Email", "Tips", {
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        inputPattern:
          /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputErrorMessage: "Email is not correct",
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "Your Email is : " + value,
          });
          this.email = value;
          this.submitAction();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Cancel Enter",
          });
        });
    },

    submitAction() {
      if (this.GZFileList.length == 0) {
        this.$message.warning("gz file can not be empty !");
      } else if (this.XLSXFileList.length == 0) {
        this.$message.warning("xlsx file can not be empty !");
      } else {
        // const qs = require('qs');
        var that = this;
        var param = {
          GZFileList: this.GZFileList,
          XLSXFileList: this.XLSXFileList,
          email: this.email,
        };
        that
          .axios({
            method: "post",
            url: "/business/submit",
            data: JSON.stringify(param),
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
            },
          })
          .then((res) => {
            if (res.data.code == 200) {
              that.$message.success(
                "submit successfully! , Plz wait for some time .You will receive Email in the later time. Check on your box! "
              );
              this.active = 3;
              setTimeout(function () {
                location.reload();
              }, 2000);
            }
          });
      }
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.gene_main {
  // width: 80%;
  //   height: 100%;
  // background-color: #85ffbd;
  //   background-image: linear-gradient(45deg, #85ffbd 0%, #fffb7d 100%);
  padding-bottom: 100px;
  .el-menu-demo {
    // background-color: #c0b1b1;
    .nav_first {
      font-size: 20px;
      padding-left: 80px;
      padding-right: 100px;
      color: #222121;
    }
  }

  .gene_body {
    background-color: #f9fafc;
    margin-left: 300px;
    width: 60%;
    padding-left: 18px;
    .font_style {
      h2 {
        margin-top: 0;
        padding-top: 10px;
      }
      .p_all {
        p {
          display: block;
          margin-block-start: 1em;
          margin-block-end: 1em;
          margin-inline-start: 0px;
          margin-inline-end: 0px;
          font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial,
            sans-serif;
          font-size: 14px;
          line-height: 20px;
          color: #666;
        }
      }
    }

    .gene_panel {
      //   border: 1px solid red;
      .gene_container {
      }
      .gene_main {
        // border: 1px solid blue;
        .panel_all {
          //   border: 1px solid blue;
          padding-top: 10px;
          padding-left: 20px;
          padding-bottom: 24px;
          .panel_title {
            border-bottom: 1px solid #e5e5e5;
          }
          .panel_first_content {
            .content_subTitle {
              a {
                margin-left: 50px;
              }
            }
            padding-left: 14px;
            .content_select {
            }
            .content_file_upload {
              padding-top: 20px;
              .content_upload_gz {
                .el-upload__tip {
                  margin-left: 14px;
                }
              }
            }
          }
          .panel_sec_content {
            padding-left: 14px;
            .content_subTitle {
              a {
                margin-left: 50px;
              }
            }
            .content_upload_xlsx {
              .el-upload__tip {
                margin-left: 14px;
              }
            }
            .submit_button {
              margin-top: 30px;
              text-align: center;
            }
          }
        }
      }
    }
  }

  .float_steps {
    .float_form {
      margin-left: 15px;
    }
    // border: #222121 solid 1px;
    background-color: #e4e7eb;
    width: 200px;
    height: 400px;
    position: fixed;
    float: right;
    left: 50%;
    top: 27%;
    // z-index: 500;
    margin-left: 630px;
    padding-bottom: 25px;
  }
}

.second_panel_tips {
  text-align: center;
  color: red;
}

.second_panel_submit_button {
  text-align: center;
}

.second_panel_pic {
  text-align: center;
}
.second_panel_pic2 {
  text-align: center;
  margin-top: 50px;
}

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>


