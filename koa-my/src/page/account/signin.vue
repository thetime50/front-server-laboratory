<template>
<div class="component-signin">
    <div>登录</div>
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
</div>
</template>

<script>
/* message */

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
                                this.$router.push('HelloWorld');
                            }
                        });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-signin{
    color: #1989fa;
    font-size: 60px;
    padding: 20px;
}
</style>