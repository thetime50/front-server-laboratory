(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-92c3fa2e"],{"61b4":function(e,r,s){"use strict";s.r(r);var t=function(){var e=this,r=e.$createElement,s=e._self._c||r;return s("div",{staticClass:"component-signup"},[s("div",[e._v("注册")]),s("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"100px"}},[s("el-form-item",{attrs:{label:"名称",prop:"name"}},[s("el-input",{model:{value:e.ruleForm.name,callback:function(r){e.$set(e.ruleForm,"name",r)},expression:"ruleForm.name"}})],1),s("el-form-item",{attrs:{label:"密码",prop:"pass"}},[s("el-input",{attrs:{type:"password","auto-complete":"off"},model:{value:e.ruleForm.pass,callback:function(r){e.$set(e.ruleForm,"pass",r)},expression:"ruleForm.pass"}})],1),s("el-form-item",{attrs:{label:"确认密码",prop:"checkPass"}},[s("el-input",{attrs:{type:"password","auto-complete":"off"},model:{value:e.ruleForm.checkPass,callback:function(r){e.$set(e.ruleForm,"checkPass",r)},expression:"ruleForm.checkPass"}})],1),s("el-form-item",[s("el-button",{attrs:{type:"primary"},on:{click:e.submitForm}},[e._v("注册")]),s("el-button",{on:{click:e.resetForm}},[e._v("重置")])],1)],1)],1)},o=[],a={name:"signup",data:function(){var e=this;return{activeName:"second",ruleForm:{name:"",pass:"",checkPass:""},rules:{name:[{required:!0,message:"请输入您的名称",trigger:"blur"},{min:2,max:5,message:"长度在 2 到 5 个字符",trigger:"blur"}],pass:[{required:!0,validator:function(r,s,t){""===s?t(new Error("请输入密码")):(""!==e.ruleForm.checkPass&&e.$refs.ruleForm.validateField("checkPass"),t())},trigger:"blur"}],checkPass:[{required:!0,validator:function(r,s,t){""===s?t(new Error("请再次输入密码")):s!==e.ruleForm.pass?t(new Error("两次输入密码不一致!")):t()},trigger:"blur"}]}}},methods:{submitForm:function(){var e=this;this.$refs.ruleForm.validate((function(r){if(!r)return console.log("error submit!!"),!1;e.axios.userRegister(e.ruleForm).then((function(r){var s=r.data;s.success?e.$alert("注册成功","",{confirmButtonText:"确定"}).then((function(){e.$router.push("/account/signin")})):e.$message({type:"info",message:"用户名已经存在"})}))}))},resetForm:function(){this.$refs.ruleForm.resetFields()}}},l=a,n=(s("b674"),s("9ca4")),u=Object(n["a"])(l,t,o,!1,null,"f3968eb4",null);r["default"]=u.exports},6510:function(e,r,s){},b674:function(e,r,s){"use strict";var t=s("6510"),o=s.n(t);o.a}}]);
//# sourceMappingURL=chunk-92c3fa2e.b83927a7.js.map