<template>
<div class="component-annotator">
    <annot class="full-block" 
        :json_data="jsonData"/>
</div>
</template>

<script lang="ts">
// <script>
/* message */
import annot from "./annot.vue"

import Vue from "vue";
export default Vue.extend({
// export default ({
    name: "annotator",
    components: {
        annot,
    },
    data() {
        return {
            jsonData: null,//'' as any,//Object | string//
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
        // 
    },
})
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-annotator{
    
    
}
</style>