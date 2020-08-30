<template>
<div class="component-annot flex-layout">
    <!-- <div class="text flex-none">
        <el-input v-if="jsonData" type="textarea" v-model="jsonData.content"
            :rows='5'/>
    </div> -->
    <div class="centent flex-auto flex-layout frow">
        <div class="flex-mean scroll-y" v-resize:throttle="onResize">
            <div class="container" ref="container"></div>
        </div>
        <div class="flex-mean scroll-y">
            <!-- <code v-html="this.json"></code> -->
            <vue-json-pretty :data="annotator && annotator.store.json"/>
        </div>
    </div>
    <div class="flex-none bnt-nav">
        <el-button type="primary" @click="download"> 下载JSON</el-button>
        <el-button type="primary" @click="downloadSVG"> 下载SVG</el-button>
        <el-button type="primary" @click="uploadClick"> <i class="el-icon-upload"/>上传</el-button>
        <el-button type="primary" @click="useDefault"> 使用样例</el-button>
    </div>

    <!-- 标签分类 -->
    <div class="dialog-wrap flex-none">
        <el-dialog 
            title="标签分类"
            width="250px" 
            :visible.sync="showLabelCategoriesDialog">
            <el-radio-group v-model="selectedLabelCategory">
                <div v-for="category in this.labelCategories">
                    <el-radio :key="category.id"
                        :label="category.id"
                        >{{category.text}}</el-radio>
                </div>
            </el-radio-group>
            <template v-slot:footer>
                <el-button @click="showLabelCategoriesDialog = false" type="primary">
                    取消
                </el-button>
                <el-button @click="addLabel" type="primary">
                    确定
                </el-button>
            </template>
        </el-dialog>
        <el-dialog 
            title="连接分类" 
            width="250px" 
            :visible.sync="showConnectionCategoriesDialog">
            <el-radio-group v-model="selectedConnectionCategory">
                <div v-for="category in this.connectionCategories">
                    <el-radio :key="category.id"
                        :label="category.id"
                        >{{category.text}}</el-radio>
                </div>
            </el-radio-group>
            <template v-slot:footer>
                <el-button @click="showConnectionCategoriesDialog = false" type="primary">
                    取消
                </el-button>
                <el-button @click="addConnection" type="primary">
                    确定
                </el-button>
            </template>
        </el-dialog>
    </div>
</div>
</template>

<script lang="ts">
// <script>
/* message */
import {Action, Annotator} from "poplar-annotation";
import {LabelCategory} from "poplar-annotation/dist/Store/LabelCategory";
import {ConnectionCategory} from "poplar-annotation/dist/Store/ConnectionCategory";
import tstest from "./tstest.vue"
import * as annot from "./annot.js"
import {xyy} from './demo.js'
import vueJsonPretty from "vue-json-pretty"

enum CategorySelectMode {
    Create,
    Update
}

import Vue from "vue";
export default Vue.extend({
// export default ({
    name: "annot",
    components: {
        // tstest,
        vueJsonPretty,
    },
    props:{
        json_data:{type:Object},
    },
    data() {
        return {
            // jsonData: null,//'' as any,//Object | string//
            annotator: null as Annotator | null,
            selectedLabelCategory: null as LabelCategory.Entity | null,
            selectedConnectionCategory: null as ConnectionCategory.Entity | null,
            showLabelCategoriesDialog: false as boolean,
            showConnectionCategoriesDialog: false as boolean,
            json: "" as string,
            startIndex: -1,
            endIndex: -1,
            first: -1,
            second: -1,
            categorySelectMode: CategorySelectMode.Create,
            selectedId: -1
        };
    },
    async created(): Promise<void> {
        // this.$eventbus.$on("fileUploaded", (jsonData: JSON) => {
        //     this.loadJSON(jsonData)
        // });
        // this.$eventbus.$on("downloadRequest", () => {
        //     this.download();
        // });
        // this.$eventbus.$on("downloadSVGRequest", () => {
        //     this.downloadSVG();
        // });

        // let result = await this.axios.annotationCreate({})
        // console.log(result)
    },
    mounted(): void {
        if (this.jsonData !== null && this.jsonData.content) {
            this.annotator = this.createAnnotator();
            // this.updateJSON();
        }
    },
    computed: {
        jsonData:{
            get(){
                return this.json_data
            },
            set(val){
                this.$emit('update:json_data',val)
            }
        },
        labelCategories(): LabelCategory.Entity[] {
            if (this.annotator === null) {
                return [];
            }
            const result = [];
            for (const [_, category] of this.annotator.store.labelCategoryRepo) {
                result.push(category);
            }
            return result;
        },
        connectionCategories(): ConnectionCategory.Entity[] {
            if (this.annotator === null) {
                return [];
            }
            const result = [];
            for (const [_, category] of this.annotator.store.connectionCategoryRepo) {
                result.push(category);
            }
            return result;
        }
    },
    methods: {
        // updateJSON(): void {
        //     this.json = this.highlight(JSON.stringify(this.annotator.store.json, null, 4));
        //     // this.json = ""
        // },

        addLabel(): void {
            if (this.categorySelectMode === CategorySelectMode.Update) {
                this.annotator.applyAction(Action.Label.Update(this.selectedId, this.selectedLabelCategory));
            } else {
                this.annotator.applyAction(Action.Label.Create(this.selectedLabelCategory, this.startIndex, this.endIndex));
            }
            this.showLabelCategoriesDialog = false;
            // this.updateJSON();
        },
        addConnection(): void {
            if (this.categorySelectMode === CategorySelectMode.Update) {
                this.annotator.applyAction(Action.Connection.Update(this.selectedId, this.selectedConnectionCategory));
            } else {
                this.annotator.applyAction(Action.Connection.Create(this.selectedConnectionCategory, this.from, this.to));
            }
            this.showConnectionCategoriesDialog = false;
            // this.updateJSON();
        },
        createAnnotator(): Annotator {
            const annotator = new Annotator(this.jsonData, this.$refs.container as HTMLElement);
            annotator.on("textSelected", (startIndex, endIndex) => {
                // console.log("textSelected")
                this.startIndex = startIndex;
                this.endIndex = endIndex;
                this.categorySelectMode = CategorySelectMode.Create;
                this.showLabelCategoriesDialog = true;
            });
            annotator.on("twoLabelsClicked", (fromLabelId, toLabelId) => {
                // console.log("twoLabelsClicked")
                this.from = fromLabelId;
                this.to = toLabelId;
                this.categorySelectMode = CategorySelectMode.Create;
                this.showConnectionCategoriesDialog = true;
            });
            annotator.on("labelRightClicked", (labelId, event: MouseEvent) => {
                // console.log("labelRightClicked")
                if (event.ctrlKey) {
                    this.categorySelectMode = CategorySelectMode.Update;
                    this.selectedId = labelId;
                    this.showLabelCategoriesDialog = true;
                } else {
                    annotator.applyAction(Action.Label.Delete(labelId));
                }
                // this.updateJSON();
            });
            annotator.on("connectionRightClicked", (connectionId, event: MouseEvent) => {
                // console.log("connectionRightClicked")
                if (event.ctrlKey) {
                    this.categorySelectMode = CategorySelectMode.Update;
                    this.selectedId = connectionId;
                    this.showConnectionCategoriesDialog = true;
                } else {
                    annotator.applyAction(Action.Connection.Delete(connectionId));
                }
                // this.updateJSON();
            });
            annotator.on("contentInput", (position, value) => {
                annotator.applyAction(Action.Content.Splice(position, 0, value));
                // this.updateJSON();
            });
            annotator.on("contentDelete", (position, length) => {
                annotator.applyAction(Action.Content.Splice(position, length, ""));
                // this.updateJSON();
            });
            return annotator;
        },

        // highlight(code: string): string {
        //     return Prism.highlight(code, Prism.languages.javascript, "javascript");
        // },

        // event
        uploadClick(e){
            let eli = document.createElement('input')
            eli.type="file"
            eli.multiple=false
            eli.addEventListener('change',this.uploadFile)
            eli.click()
        },
        uploadFile(e){
            let reader = new FileReader();
            reader.readAsText(e.target.files[0]);
            reader.onload = (event) => {
                // window.setTimeout(() => {
                //    this.$eventbus.$emit("fileUploaded", JSON.parse(event.target.result.toString()));
                //    this.$forceUpdate();//vue 强制刷新
                // }, 10);
                this.loadJSON(JSON.parse(event.target.result.toString()))
            };
            // this.$router.push("annotate").catch(_ => {
            // });
        },
        annotatorRefresh(){
            if (this.annotator !== null) {
                this.annotator.remove();
            }
            if (this.jsonData !== null && this.jsonData.content) {
                this.annotator = this.createAnnotator();
                // this.updateJSON();
            }
        },
        loadJSON(jsonData:Object):void{
            this.jsonData = jsonData;
            this.annotatorRefresh()
        },

        download: function () {
            const eleLink = document.createElement("a");
            eleLink.download = "data.json";
            eleLink.style.display = "none";
            const blob = new Blob([JSON.stringify(this.annotator.store.json, null, 4)]);
            eleLink.href = URL.createObjectURL(blob);
            document.body.appendChild(eleLink);
            eleLink.click();
            document.body.removeChild(eleLink);
        },
        downloadSVG: function () {
            const eleLink = document.createElement("a");
            eleLink.download = "data.svg";
            eleLink.style.display = "none";
            const blob = new Blob([this.annotator.export()]);
            eleLink.href = URL.createObjectURL(blob);
            document.body.appendChild(eleLink);
            eleLink.click();
            document.body.removeChild(eleLink);
        },
        
        useDefault() {
            // window.setTimeout(() => {
            //     this.$eventbus.$emit("fileUploaded", xyy);
            //     this.$forceUpdate();
            // }, 10);
            // this.$router.push("annotate").catch(_ => {
            // });
            this.loadJSON(xyy)
        },

        onResize(){
            this.annotatorRefresh()
        }
    },
    watch:{
        // "jsonData.content"(){
        //     this.annotatorRefresh()
        // },
        jsonData:{
            handler(after,before){
                if(!after){
                    this.jsonData = annot.getProto()
                }
            },
            immediate:true,
        },
    },
})
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-annot{

    .container{
        ::v-deep{
            textarea{
                width: auto !important;
                color: #123456;
            }
        }
    }

    .centent{
        >div{
            padding:10px;
            padding-bottom: 0;
        }
    }
    .bnt-nav{
        padding: 10px;
        text-align: center;
    }
    .vjs-tree.is-root{
        text-align: left;
    }
    
//////////////////////////////////////
    // .container > svg {
    //     width: 45vw;
    // }

    .poplar-annotation-label {
        font-size: 14px;
    }

    .poplar-annotation-connection {
        font-family: "PingFang SC", serif;
        font-size: 12px;
    }
    
}
</style>