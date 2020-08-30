<template>
<div class="component-annotaton flex-layout">
    <el-form><!--  :model=""> -->
      <!-- <el-form-item label=""></el-form-item> -->
      <el-button type="trimary" @click="doadd">新增</el-button>
    </el-form>
    <div class="flex-auto table-wrap">
        <el-table :data="annotList" height="100%">
            <el-table-column label="人员" prop="username"/>
            <el-table-column label="文本">
                <template v-slot="scope">
                    {{scope.row.data.annotaton && scope.row.data.annotaton.content.slice(0,20)}}
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template v-slot="scope">
                    <el-button type="primary" @click="doedit">编辑</el-button>
                    <el-button type="primary" @click="doedit">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <annot-detail ref="detail"/>
</div>
</template>

<script lang="ts">
// <script>
/* message */
import annotDetail from "./annotDetail.vue"

import Vue from "vue";
export default Vue.extend({
// export default ({
    name: "annotaton",
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

        // let result = await this.axios.annotationCreate({})
        // console.log(result)
    },
    computed: {
        // 
    },
    methods: {
        async doadd(){
            let data = await this.axios.annotationCreate()
            this.$refs.detail.show(data.data)
        },
    },
})
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-annotaton{
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