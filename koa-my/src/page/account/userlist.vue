<template>
<ul class="component-userlist scroll-y">
    <li v-for="(item,index) in users" :key="item._id">
        {{ index + 1 }}.{{ item.username }}
        <el-button @click="del_user(index)">删除</el-button>
    </li>
</ul>
</template>

<script>
/* message */

export default {
    name: "userlist",
    data () {
        return {
            users:[]
        };
    },
    created(){
        this.axios.getUser().then((response) => {
            if(response.status === 401){
                //不成功跳转回登录页
                // this.$router.push('/login');
                //并且清除掉这个token
                this.$store.dispatch('UserLogout');
            }else{
                //成功了就把data.result里的数据放入users，在页面展示
                this.users = response.data.result;
            }
        })
    },
    methods:{
        del_user(index, event){
            let thisID = {
                id:this.users[index]._id
            }
            this.axios.delUser(thisID)
                .then(response => {
                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    });
                    //移除节点
                    this.users.splice(index, 1);
                }).catch((err) => {
                    console.log(err);
                });
        },
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-userlist{
    list-style-type: none;
    padding: 0;
    li {
        display: block;
        margin: 0 10px;
    }
}
</style>