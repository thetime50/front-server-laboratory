<template>
<div class="component-graph" ref="graph">
    graph
</div>
</template>

<script>
// <script lang="ts">
/* message */
// import {Action, Annotator} from "poplar-annotation";
// import {LabelCategory} from "poplar-annotation/dist/Store/LabelCategory";
// import {ConnectionCategory} from "poplar-annotation/dist/Store/ConnectionCategory";
import {xyy} from './demo.js'

export default {
    name: "graph",
    data () {
        return {
        };
    },
    mounted(){
        // this.$nextTick(()=>{
        //     // new Annotator(xyy,this.$refs.graph)
        // })
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-graph{
    
}
</style>