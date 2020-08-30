<template>
<div class="component-block-detail abs-full-block flex-layout" v-if="visible_">
    <div class="header flex-none flex-layout frow">
        <div class="title flex-auto">
            {{title}}
        </div>
        <div class="close flex-none" @click="close">
            <i class="el-icon-close" />
        </div>
    </div>
    <div class="centent flex-auto">
        <slot />
    </div>
    <div class="footer flex-none" v-if="$slots.footer">
        <slot name-"footer"/>
    </div>
</div>
</template>

<script>
/* message */

export default {
    name: "block-detail",
    props:{
        visible:{type:Boolean,default:false},
        title:{type:String, default:''},
    },
    data () {
        return {
            // 
        };
    },
    computed:{
        visible_:{
            get(){
                return this.visible
            },
            set(val){
                this.$emit('update:visible',val)
            },
        },
    },
    methods:{
        close(){
            this.visible_=false
        }
    },
    watch:{
        visible_(after,before){
            if(after){
                this.$emit("open")
                this.$emit("opened")
            }else{
                this.$emit("open")
                this.$emit("opened")
            }
        }
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-block-detail{
    background-color: #fff;
}
</style>