<template>
<div class="component-signup">
    <div>注册</div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm">注册</el-button>
            <el-button @click="resetForm">重置</el-button>
        </el-form-item>
    </el-form>
</div>
</template>

<script>
/* message */

export default {
    name: "signup",
    data () {
        return {
            activeName: 'second',
            ruleForm: {
                name: '',
                pass: '',
                checkPass: '',
            },
            rules: {
                name: [
                    { required: true, message: '请输入您的名称', trigger: 'blur' },
                    { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
                ],
                pass: [
                    {
                        required: true, 
                        validator:(rule, value, callback) => {
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
                ],
                checkPass: [
                    { 
                        required: true, 
                        validator:(rule, value, callback) => {
                            if (value === '') {
                                callback(new Error('请再次输入密码'));
                            } else if (value !== this.ruleForm.pass) {
                                callback(new Error('两次输入密码不一致!'));
                            } else {
                                callback();
                            }
                        }, 
                        trigger: 'blur' 
                    }
                ],
            }
        }
    },
    methods: {
        submitForm() {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    this.axios.userRegister(this.ruleForm)
                        .then(({ data }) => {
                            if (data.success) {
                                this.$alert('注册成功','',{
                                    confirmButtonText: '确定',
                                }).then(()=>{
                                    this.$router.push("/account/signin")
                                });
                            } else {
                                this.$message({
                                    type: 'info',
                                    message: '用户名已经存在'
                                });
                            }
                        })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm() {
            this.$refs.ruleForm.resetFields();
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-signup{
    color: #1989fa;
    font-size: 60px;
    padding: 20px;
}
</style>