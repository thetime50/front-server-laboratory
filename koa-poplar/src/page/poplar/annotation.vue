<template>
<div class="component-annotation flex-layout">
    <el-form><!--  :model=""> -->
      <!-- <el-form-item label=""></el-form-item> -->
      <el-button type="trimary" @click="doadd">新增</el-button>
    </el-form>
    <div class="flex-auto table-wrap">
        <el-table :data="annotList" height="100%">
            <el-table-column label="人员" prop="username"/>
            <el-table-column label="文本">
                <template v-slot="scope">
                    {{scope.row.annotation && scope.row.annotation.content.slice(0,20)}}
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template v-slot="scope">
                    <el-button type="primary" @click="doedit(scope.row)">编辑</el-button>
                    <el-button type="primary" @click="dodel(scope.row._id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <annot-detail ref="detail" @refresh="refresh"/>
</div>
</template>

<script lang="ts">
// <script>
/* message */
import annotDetail from "./annotDetail.vue"

import Vue from "vue";
export default Vue.extend({
// export default ({
    name: "annotation",
    components: {
        annotDetail,
    },
    data() {
        return {
            jsonData: null,//'' as any,//Object | string//

            annotList:[],
        };
    },
    async created(): Promise<void> {
        this.refresh()
    },
    computed: {
        // 
    },
    methods: {
        async refresh(){
            let result = await this.axios.annotationRetrive()
            this.annotList = result.data
        },
        async doadd(){
            let result = await this.axios.annotationCreate()
            this.$refs.detail.show(result.data)
        },
        doedit(edata){
            this.$refs.detail.show(edata)
        },
        dodel(_id){
            (async ()=>{
                await this.axios.annotationDelete(_id)
                this.refresh()
            })()
        },
    },
})
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-annotation{
    position: relative;
    padding: 10px;
    text-align: left;
    .annot{
        background-color: #fff;
    }
    .table-wrap{
        // 
    }
}
</style>