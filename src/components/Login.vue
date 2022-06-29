<template>
    <div class="login_container">
        <div class="login_box">
            <!-- 头像区域 -->
            <div class="avatar_box">
                <img src="../assets/logo.png" alt="">
            </div>
            <!-- 表单区域 -->
            <el-form :model="loginForm"  :rules="loginRules" ref="loginFormRef" label-width="0px"  class="login_form">
                <el-form-item prop="username">
                    <!-- 用户名 -->
                      <el-input v-model="loginForm.username"  prefix-icon="el-icon-user-solid
"></el-input>
                 </el-form-item>
                 <el-form-item prop="password">
                     <!-- 密码 -->
                      <el-input type="password"  v-model="loginForm.password" prefix-icon="el-icon-lock
"></el-input>
                 </el-form-item>
                 <!-- 按钮 -->
                 <el-form-item class="btns">
                   <el-button type="primary" @click="login">Login</el-button>
                    <el-button type="info" @click="loginFormReset">Reset</el-button>
                 </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            //这是数据绑定区域
            loginForm: {
                username: 'root',
                password: '123456'
            },
            ruleForm: {
                username: '',
                password: ''
            },
            //定义规则
            loginRules: {
              username: [
                  { required: true, message: '请输入用户名', trigger: 'blur' },
                  { min: 3, max: 5, message: '用户名长度在 3 到 5 个字符', trigger: 'blur' }
              ],
              password: [
                  { required: true, message: '请输入密码', trigger: 'blur' },
                   { min: 3, max: 8, message: '密码长度在 3 到 8 个字符', trigger: 'blur' }
              ]
            }
        }
    },
    methods: {
            loginFormReset(){
                this.$refs.loginFormRef.resetFields();
            },
            login(){
                var that = this;
                // this.$refs.loginFormRef.validate(async (valid)=>{
                //     //console.log(valid);
                //     //进行验证登录
                //     if(!valid) return;
                //     const {data} =  await this.axios.post('login', that.loginForm);
                //         console.log(data);
                //         //console.log(that);
                //          that.$message({
                //             message: '登陆成功',
                //             type: 'success'
                //             });
                //         window.sessionStorage.setItem('token',"abcdefghijklmnopqrstuvwxyz");
                //         that.$router.push('/home');                                        
                // });
                window.sessionStorage.setItem('token',"abcdefghijklmnopqrstuvwxyz");
                that.$router.push('/geneIndex'); 
            }
        }
}
</script>

<style  lang="less" scoped>
.login_container{
    background-color: rgb(87, 71, 52);
    height: 100%;
}
.login_box{
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}
.avatar_box{
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #fff;
    img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
    }
}

.login_form{
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
}

.btns{
    display: flex;
    justify-content: flex-end;
}
</style>