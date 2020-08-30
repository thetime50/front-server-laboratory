<template>
<block-detail class="component-annot-detail"
    :visible.sync="visible"
    title="编辑">
    <div class="annot abs-full-block" v-if="edata">
        <annot class="full-block" 
            :json_data.sync="edata.annotation"
            :json_show="true"
            @confirm="annotConfirm"/>
    </div>
</block-detail>
</template>

<script>
/* message */
import common from '@/js/common.js'
import blockDetail from "./blockDetail.vue"
import annot from "./annot.vue"

export default {
    name: "annot-detail",
    components:{
        blockDetail,
        annot,
    },
    props:{
        // 
    },
    data () {
        return {
            visible:false,
            edata:null,
        };
    },
    methods:{
        show(para){
            if(typeof(para)=="object" && para && para._id){
                this.edata = common.CloneDeepObj(para);
            }else if(typeof(para)=="string"){
                // get data
            }else{
                console.log(para)
                throw new window.Error("type error")
            }
            this.visible = true
        },
        annotConfirm(){
            this.$nextTick(async ()=>{
                await this.axios.annotationUpdate(this.edata)
                this.visible = false
                this.$emit('refresh')
            })
        },
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-annot-detail{
    background-color: #fff;
}
</style>