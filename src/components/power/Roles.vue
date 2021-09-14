<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <!-- 添加角色按钮 -->
      <el-row>
        <el-col>
          <el-button type="primary" @click="AddRoleDialogVisible = true"
            >添加角色</el-button
          >
        </el-col>
      </el-row>
      <el-table :data="rolesList" style="width: 100%" striped border>
        <!-- 展开列 -->
        <el-table-column type="expand">
          <template v-slot="scope">
            <el-row
              :class="['bdbottom', index1 === 0 ? 'bdtop' : '', 'vcenter']"
              v-for="(item1, index1) in scope.row.children"
              :key="item1.id"
            >
              <!-- 一级权限 -->
              <el-col :span="5">
                <el-tag closable>
                  {{ item1.authName }}
                </el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 二级和三级权限 -->
              <el-col :span="19">
                <!-- 通过for循环 再次进行渲染 -->
                <el-row
                  :class="[index2 === '0' ? '' : 'bdtop', 'venter']"
                  v-for="(item2, index2) in item1.children"
                  :key="item2.id"
                >
                  <!-- 二级权限 -->
                  <el-col :span="6">
                    <el-tag closable type="sucess">
                      {{ item2.authName }}
                    </el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <!-- 三级权限 -->
                  <el-col :span="18">
                    <el-tag
                      closable
                      type="warning"
                      v-for="item3 in item2.children"
                      :key="item3.id"
                    >
                      {{ item3.authName }}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <!-- 索引列 -->
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" width="300px">
          <template>
            <el-button type="primary" icon="el-icon-edit" size="mini"
              >编辑</el-button
            >
            <el-button type="danger" icon="el-icon-delete" size="mini"
              >删除</el-button
            >
            <el-button type="warning" icon="el-icon-setting" size="mini"
                @click="setRightDialogVisible = true"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加角色对话框 -->
    <el-dialog
      title="添加角色"
      :visible.sync="AddRoleDialogVisible"
      width="50%"
      @close="addRoleDialogClosed"
    >
      <el-form
        :model="addRoleForm"
        ref="addRoleFormRef"
        :rules="addRoleFormRules"
        label-width="100px"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addRoleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="addRoleForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="AddRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 分配角色对话框 -->
    <el-dialog
      title="分配权限"
      :visible.sync="setRightDialogVisible"
      width="40%"
    >
      <el-tree :data="rightsList" :props="treeProps"></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setRightDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //控制添加角色对话框
      AddRoleDialogVisible: false,
      //添加角色数据
      addRoleForm: {
        roleName: "",
        roleDesc: "",
      },
      //分配权限的弹窗显示
      setRightDialogVisible: false,
      //角色数据
      rolesList: [
        {
          id: 864,
          roleName: "111",
          roleDesc: "测试",
          children: [
            {
              id: 101,
              authName: "商品管理",
              path: "goods",
              children: [
                {
                  id: 115,
                  authName: "分类参数",
                  path: "params",
                  children: [
                    {
                      id: 142,
                      authName: "获取参数列表",
                      path: "categories",
                    },
                    {
                      id: 143,
                      authName: "创建商品参数",
                      path: "categories",
                    },
                    {
                      id: 144,
                      authName: "删除商品参数",
                      path: "categories",
                    },
                  ],
                },
                {
                  id: 121,
                  authName: "商品分类",
                  path: "categories",
                  children: [
                    {
                      id: 123,
                      authName: "删除分类",
                      path: "categories",
                    },
                  ],
                },
                {
                  id: 104,
                  authName: "商品列表",
                  path: "goods",
                  children: [
                    {
                      id: 105,
                      authName: "添加商品",
                      path: "goods",
                    },
                    {
                      id: 116,
                      authName: "商品修改",
                      path: "goods",
                    },
                  ],
                },
              ],
            },
            {
              id: 103,
              authName: "权限管理",
              path: "rights",
              children: [
                {
                  id: 111,
                  authName: "角色列表",
                  path: "roles",
                  children: [],
                },
              ],
            },
          ],
        },
      ],
      //权限数据
      rightsList: [
          {
            "id": 101, 
            "authName": "商品管理", 
            "path": "goods", 
            "pid": 0, 
            "children": [
                {
                    "id": 104, 
                    "authName": "商品列表", 
                    "path": "goods", 
                    "pid": 101, 
                    "children": [
                        {
                            "id": 105, 
                            "authName": "添加商品", 
                            "path": "goods", 
                            "pid": "104,101"
                        }, 
                        {
                            "id": 116, 
                            "authName": "商品修改", 
                            "path": "goods", 
                            "pid": "104,101"
                        }, 
                        {
                            "id": 117, 
                            "authName": "商品删除", 
                            "path": "goods", 
                            "pid": "104,101"
                        }, 
                        {
                            "id": 150, 
                            "authName": "更新商品图片", 
                            "path": "goods", 
                            "pid": "104,101"
                        }, 
                        {
                            "id": 151, 
                            "authName": "更新商品属性", 
                            "path": "goods", 
                            "pid": "104,101"
                        }, 
                        {
                            "id": 152, 
                            "authName": "更新商品状态", 
                            "path": "goods", 
                            "pid": "104,101"
                        }, 
                        {
                            "id": 153, 
                            "authName": "获取商品详情", 
                            "path": "goods", 
                            "pid": "104,101"
                        }
                    ]
                }, 
                {
                    "id": 115, 
                    "authName": "分类参数", 
                    "path": "params", 
                    "pid": 101, 
                    "children": [
                        {
                            "id": 142, 
                            "authName": "获取参数列表", 
                            "path": "categories", 
                            "pid": "115,101"
                        }, 
                        {
                            "id": 143, 
                            "authName": "创建商品参数", 
                            "path": "categories", 
                            "pid": "115,101"
                        }, 
                        {
                            "id": 144, 
                            "authName": "删除商品参数", 
                            "path": "categories", 
                            "pid": "115,101"
                        }
                    ]
                }, 
                {
                    "id": 121, 
                    "authName": "商品分类", 
                    "path": "categories", 
                    "pid": 101, 
                    "children": [
                        {
                            "id": 122, 
                            "authName": "添加分类", 
                            "path": "categories", 
                            "pid": "121,101"
                        }, 
                        {
                            "id": 123, 
                            "authName": "删除分类", 
                            "path": "categories", 
                            "pid": "121,101"
                        }, 
                        {
                            "id": 149, 
                            "authName": "获取分类详情", 
                            "path": "categories", 
                            "pid": "121,101"
                        }
                    ]
                }
            ]
        }, 
        {
            "id": 102, 
            "authName": "订单管理", 
            "path": "orders", 
            "pid": 0, 
            "children": [
                {
                    "id": 107, 
                    "authName": "订单列表", 
                    "path": "orders", 
                    "pid": 102, 
                    "children": [
                        {
                            "id": 109, 
                            "authName": "添加订单", 
                            "path": "orders", 
                            "pid": "107,102"
                        }, 
                        {
                            "id": 154, 
                            "authName": "订单更新", 
                            "path": "orders", 
                            "pid": "107,102"
                        }, 
                        {
                            "id": 155, 
                            "authName": "获取订单详情", 
                            "path": "orders", 
                            "pid": "107,102"
                        }
                    ]
                }
            ]
        }
      ],
      //树形控件的绑定对象
      treeProps: {
          label: 'authName',
          children: 'children'
      },
      //定义检验规则
      addRoleFormRules: {
        roleName: [{ required: true, message: "请输角色名", trigger: "blur" }],
        roleDesc: [
          { required: true, message: "请输入角色描述", trigger: "blur" },
        ],
      },
    };
  },
  created() {},
  methods: {
    addRoleDialogClosed() {
      this.$refs.addRoleFormRef.resetFields();
    },
  },
};
</script>


<style lang="less" scoped>
.el-tag {
  margin: 7px;
}
.bdtop {
  border-top: 1px solid #eee;
}
.bdbottom {
  border-bottom: 1px solid #eee;
}
.vcenter {
  display: flex;
  align-items: center;
}
</style>