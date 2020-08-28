<template>
<div class="component-signin">
    <template v-if="!username">
        <div class="title">登录</div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="名称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="ruleForm.pass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm">登录</el-button>
                <el-button @click="resetForm">重置</el-button>
            </el-form-item>
        </el-form>
    </template>
    <template v-else>
        <div class="user">
            用户：{{username}}
        </div>
        <el-button type="primary" @click="logout()">注销</el-button>
    </template>
</div>
</template>

<script>
/* message */
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

export default {
    name: "signin",
    data () {
        return {
            ruleForm: {
                name: '',
                pass: '',
            },
            rules: {
                name: [
                    { required: true, message: '请输入您的名称', trigger: 'blur' },
                    { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
                ],
                pass: [
                    {
                        required: true, 
                        validator: (rule, value, callback) => {
                            if (value === '') {
                                callback(new Error('请输入密码'));
                            } else {
                                if (this.ruleForm.checkPass !== '') {
                                this.$refs.ruleForm.validateField('checkPass');
                                }
                                callback();
                            }
                        }, 
                        trigger: 'blur' 
                    }
                ]
            },
        }
    },
    computed:{
        ...mapState(['username'])
    },
    methods:{
        //重置表单
        resetForm() {
            this.$refs.ruleForm.resetFields();
        },
        //提交表单
        submitForm() {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    this.axios.userLogin(this.ruleForm)
                        .then(({ data }) => {
                            //账号不存在
                            if (data.info === false) {
                                    this.$message({
                                    type: 'info',
                                    message: '账号不存在'
                                });
                                return;
                            }
                            if (data.success) {
                                    this.$message({
                                    type: 'success',
                                    message: '登录成功'
                                });
                                //拿到返回的token和username，并存到store
                                let token = data.token;
                                let username = data.username;
                                this.$store.dispatch('UserLogin', token);
                                this.$store.dispatch('UserName', username);
                                //跳到目标页
                                // this.$router.push('HelloWorld');
                            }
                        });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        logout(){
            //清除token
            this.$store.dispatch('UserLogout');
            if (!this.$store.state.token) {
                // this.$router.push('/login')
                this.$message({
                    type: 'success',
                    message: '登出成功'
                })
            } else {
                this.$message({
                    type: 'info',
                    message: '登出失败'
                })
            }
        },
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-signin{
    padding: 20px;
    color: #1989fa;
    .title{
        font-size: 60px;
    }
    .user{
        padding: 10px;
    }
}
</style>