<template>
<div class="component-home flex-layout justify-center">
    <div class="page flex-none">home</div>
    <div class="demo flex-auto">
        thetime50 demo <br>
        <a href="https://github.com/thetime50/front-server-laboratory/tree/master/koa-poplar">
            github.com koa-poplar doc
        </a>
    </div>
</div>
</template>

<script>
/* message */

export default {
    name: "home",
    data () {
        return {
        };
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-home{
    .page{
        padding: 40px;
        font-size: 60px;
    }
    .demo{
        padding: 20px;
        font-size: 36px;
    }
}
</style>