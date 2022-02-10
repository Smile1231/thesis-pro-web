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
      <el-menu-item index="1">about</el-menu-item>
      <el-menu-item index="2">
        <template slot="title">Cas-OFFinder</template>
        <!-- <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu> -->
      </el-menu-item>
      <el-menu-item index="3">Microhomology</el-menu-item>
      <el-menu-item index="4">Cas-Designer</el-menu-item>
      <el-menu-item index="5">DataBase</el-menu-item>
      <el-menu-item index="6">Analyzer</el-menu-item>
      <el-menu-item index="7">Digenome-Seq</el-menu-item>
      <el-menu-item index="8">Base Editing</el-menu-item>
    </el-menu>
    <div class="line"></div>
    <div class="gene_body">
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
          info: Hwang G-H et al. Web-based design and analysis tools for CRISPR
          base editing. BMC Bioinformatics 19, 542 (2018).
        </p>

        <p>
          To comfirm that the substitutions are derived from CRISPR base
          editors, it is recommended to compare the treated data with untreated
          one as a negative control.
        </p>
        <p>
          Please input your data in below form, or download an example data
          here.
        </p>
      </div>
      <div class="gene_panel">
        <el-container class="gene_container">
          <el-main class="gene_main">
            <el-row :gutter="40">
              <el-col :span="12"
                ><div class="grid-content bg-purple">
                  <div class="panel_first">
                    <div class="panel_first_title">
                      <h2>Sequencing Data</h2>
                    </div>
                    <div class="panel_first_content">
                      <div class="content_subTitle">
                        <h5>File Type:</h5>
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
                          <el-col :span="12"
                            ><div class="grid-content bg-purple">
                              <div class="content_upload_right">
                                <el-upload
                                  class="upload-demo"
                                  action=""
                                  :on-preview="handlePreview"
                                  :on-remove="handleRemove"
                                  :before-remove="beforeRemove"
                                  multiple
                                  :limit="1"
                                  :on-exceed="handleExceed"
                                  :file-list="fileList"
                                >
                                  <el-tooltip
                                    class="item"
                                    effect="dark"
                                    content="Read 1 (fastq or gzipped fastq)"
                                    placement="top"
                                    visible-arrow="false"
                                  >
                                    <el-button size="small" type="primary"
                                      >click to upload</el-button
                                    >
                                  </el-tooltip>
                                  <div slot="tip" class="el-upload__tip">
                                    only upload txt file
                                  </div>
                                </el-upload>
                              </div>
                            </div></el-col
                          >
                          <el-col :span="12"
                            ><div class="">
                              <div class="content_upload_right">
                                <el-upload
                                  class="upload-demo"
                                  action=""
                                  :on-preview="handlePreview"
                                  :on-remove="handleRemove"
                                  :before-remove="beforeRemove"
                                  multiple
                                  :limit="1"
                                  :on-exceed="handleExceed"
                                  :file-list="fileList"
                                >
                                  <el-tooltip
                                    class="item"
                                    effect="dark"
                                    content="Read 2 (fastq or gzipped fastq)"
                                    placement="top"
                                    visible-arrow="false"
                                  >
                                    <el-button size="small" type="primary"
                                      >click to upload</el-button
                                    >
                                  </el-tooltip>
                                  <div slot="tip" class="el-upload__tip">
                                    only upload txt file
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
              <el-col :span="12"
                ><div class="grid-content bg-purple-light">
                  <div class="panel_first">
                    <div class="panel_first_title">
                      <h2>Control Data (optional)</h2>
                    </div>
                    <div class="panel_first_content">
                      <div class="content_subTitle">
                        <h5>File Type:</h5>
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
                          <el-col :span="12"
                            ><div class="">
                              <div class="content_upload_left">
                                <el-upload
                                  class="upload-demo"
                                  action=""
                                  :on-preview="handlePreview"
                                  :on-remove="handleRemove"
                                  :before-remove="beforeRemove"
                                  multiple
                                  :limit="1"
                                  :on-exceed="handleExceed"
                                  :file-list="fileList"
                                >
                                  <el-tooltip
                                    class="item"
                                    effect="dark"
                                    content="Read 1 (fastq or gzipped fastq)"
                                    placement="top"
                                    visible-arrow="false"
                                  >
                                    <el-button size="small" type="primary"
                                      >click to upload</el-button
                                    >
                                  </el-tooltip>
                                  <div slot="tip" class="el-upload__tip">
                                    only upload txt file
                                  </div>
                                </el-upload>
                              </div>
                            </div></el-col
                          >
                          <el-col :span="12"
                            ><div class="">
                              <div class="content_upload_right">
                                <el-upload
                                  class="upload-demo"
                                  action=""
                                  :on-preview="handlePreview"
                                  :on-remove="handleRemove"
                                  :before-remove="beforeRemove"
                                  multiple
                                  :limit="1"
                                  :on-exceed="handleExceed"
                                  :file-list="fileList"
                                >
                                  <el-tooltip
                                    class="item"
                                    effect="dark"
                                    content="Read 2 (fastq or gzipped fastq)"
                                    placement="top"
                                    visible-arrow="false"
                                  >
                                    <el-button size="small" type="primary"
                                      >click to upload</el-button
                                    >
                                  </el-tooltip>
                                  <div slot="tip" class="el-upload__tip">
                                    only upload txt file
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
            </el-row>

            <!-- 左边panel 下方 -->
            <el-row :gutter="40">
              <el-col :span="12"
                ><div class="grid-content bg-purple">
                  <div class="panel_first">
                    <div class="panel_first_title">
                      <h2>Basic Information</h2>
                    </div>
                    <div class="panel_first_content">
                      <div class="content_subTitle">
                        <h5>Full reference sequence (5' to 3'):</h5>
                      </div>
                      <!-- 下拉框 -->
                      <div class="content_textarea" style="width: 50%">
                        <el-input
                          type="textarea"
                          :rows="2"
                          placeholder="please input content"
                          v-model="textarea"
                        >
                        </el-input>
                      </div>
                      <div class="content_first_selector">
                        <div class="panel_first_selector_title">
                          <h5>PAM Type:</h5>
                        </div>
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

                      <!-- 第二个下拉框 -->
                      <div class="content_first_selector">
                        <div class="panel_first_selector_title">
                          <h5>Base editing type:</h5>
                        </div>
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

                      <!-- 第三个范围 -->
                      <div class="content_first_selector">
                        <div class="panel_first_selector_title">
                          <h5>Base editing window</h5>
                        </div>

                        <el-row>
                          <el-col :span="11"
                            ><div
                              class="grid-content bg-purple"
                              style="width: 80%"
                            >
                              <el-input
                                type="textarea"
                                :rows="1"
                                placeholder="请输入内容"
                                v-model="textarea"
                              >
                              </el-input></div
                          ></el-col>
                          <el-col :span="2"> To </el-col>
                          <el-col :span="11"
                            ><div class="" style="width: 80%">
                              <el-input
                                type="textarea"
                                :rows="1"
                                placeholder="请输入内容"
                                v-model="textarea"
                              >
                              </el-input></div
                          ></el-col>
                        </el-row>
                      </div>

                      <!-- 第四个范围 -->
                      <div class="content_first_selector">
                        <div class="panel_first_selector_title">
                          <h5>Base editing type:</h5>
                        </div>
                        <el-input
                          v-model="input"
                          placeholder=""
                          style="width: 70%"
                        ></el-input>
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
              <el-col :span="12"
                ><div class="grid-content bg-purple-light">
                  <div class="panel_first">
                    <div class="panel_first_title">
                      <h2>Basic Information</h2>
                    </div>
                    <div class="panel_first_content">
                      <div class="content_subTitle">
                        <h5>Full reference sequence (5' to 3'):</h5>
                      </div>
                      <!-- 下拉框 -->
                      <div class="content_textarea" style="width: 50%">
                        <el-input
                          type="textarea"
                          :rows="2"
                          placeholder="please input content"
                          v-model="textarea"
                        >
                        </el-input>
                      </div>
                      <div class="content_first_selector">
                        <div class="panel_first_selector_title">
                          <h5>PAM Type:</h5>
                        </div>
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

                      <!-- 第二个下拉框 -->
                      <div class="content_first_selector">
                        <div class="panel_first_selector_title">
                          <h5>Base editing type:</h5>
                        </div>
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

                      <!-- 第三个范围 -->
                      <div class="content_first_selector">
                        <div class="panel_first_selector_title">
                          <h5>Base editing window</h5>
                        </div>

                        <el-row>
                          <el-col :span="11"
                            ><div
                              class="grid-content bg-purple"
                              style="width: 80%"
                            >
                              <el-input
                                type="textarea"
                                :rows="1"
                                placeholder="请输入内容"
                                v-model="textarea"
                              >
                              </el-input></div
                          ></el-col>
                          <el-col :span="2"> To </el-col>
                          <el-col :span="11"
                            ><div class="" style="width: 80%">
                              <el-input
                                type="textarea"
                                :rows="1"
                                placeholder="请输入内容"
                                v-model="textarea"
                              >
                              </el-input></div
                          ></el-col>
                        </el-row>
                      </div>

                      <!-- 第四个范围 -->
                      <div class="content_first_selector">
                        <div class="panel_first_selector_title">
                          <h5>Base editing type:</h5>
                        </div>
                        <el-input
                          v-model="input"
                          placeholder=""
                          style="width: 70%"
                        ></el-input>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
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
      //文件上传列表
      fileList: [],
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`we can only upload one file `);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`confirm remove this file`);
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.gene_main {
  //   width: 100%;
  //   height: 100%;
  //   background-color: #85ffbd;
  //   background-image: linear-gradient(45deg, #85ffbd 0%, #fffb7d 100%);
  padding-bottom: 100px;
  .el-menu-demo {
    background-color: #c0b1b1;
    .nav_first {
      font-size: 20px;
      padding-left: 80px;
      padding-right: 100px;
      color: #222121;
    }
  }

  .gene_body {
    padding-left: 18px;
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
        font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
        font-size: 14px;
        line-height: 20px;
        color: #666;
      }
    }

    .gene_panel {
      //   border: 1px solid red;
      .gene_container {
      }
      .gene_main {
        // border: 1px solid blue;
        .panel_first {
          //   border: 1px solid blue;
          padding-top: 10px;
          padding-left: 20px;
          padding-bottom: 24px;
          .panel_first_title {
            border-bottom: 1px solid #e5e5e5;
          }
          .panel_first_content {
            padding-left: 14px;
            .content_select {
            }
            .content_file_upload {
              padding-top: 12px;

              .content_upload_left {
              }
              .content_upload_right {
              }
            }
          }
        }
      }
    }
  }
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


