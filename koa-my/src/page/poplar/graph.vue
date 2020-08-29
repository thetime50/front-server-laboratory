<template>
<div class="component-graph flex-layout frow" ref="graph">
    <div class="flex-mean">
        <div class="container" ref="container"></div>
    </div>
    <div class="flex-mean">
        <div class="code-container">
            <code v-html="this.json"></code>
        </div>
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
import {xyy} from './demo.js'

enum CategorySelectMode {
    Create,
    Update
}

import Vue from "vue";
// export default Vue.extend({
export default ({
    name: "graph",
    components: {
        // tstest,
    },
    data() {
        return {
            jsonData: null,
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
    methods: {
        // updateJSON(): void {
        //     this.json = this.highlight(JSON.stringify(this.annotator.store.json, null, 4));
        // },
        // addLabel(): void {
        //     if (this.categorySelectMode === CategorySelectMode.Update) {
        //         this.annotator.applyAction(Action.Label.Update(this.selectedId, this.selectedLabelCategory));
        //     } else {
        //         this.annotator.applyAction(Action.Label.Create(this.selectedLabelCategory, this.startIndex, this.endIndex));
        //     }
        //     this.showLabelCategoriesDialog = false;
        //     this.updateJSON();
        // },
        // addConnection(): void {
        //     if (this.categorySelectMode === CategorySelectMode.Update) {
        //         this.annotator.applyAction(Action.Connection.Update(this.selectedId, this.selectedConnectionCategory));
        //     } else {
        //         this.annotator.applyAction(Action.Connection.Create(this.selectedConnectionCategory, this.from, this.to));
        //     }
        //     this.showConnectionCategoriesDialog = false;
        //     this.updateJSON();
        // },
        // createAnnotator(): Annotator {
        //     const annotator = new Annotator(this.jsonData, this.$refs.container);
        //     annotator.on("textSelected", (startIndex, endIndex) => {
        //         this.startIndex = startIndex;
        //         this.endIndex = endIndex;
        //         this.categorySelectMode = CategorySelectMode.Create;
        //         this.showLabelCategoriesDialog = true;
        //     });
        //     annotator.on("twoLabelsClicked", (fromLabelId, toLabelId) => {
        //         this.from = fromLabelId;
        //         this.to = toLabelId;
        //         this.categorySelectMode = CategorySelectMode.Create;
        //         this.showConnectionCategoriesDialog = true;
        //     });
        //     annotator.on("labelRightClicked", (labelId, event: MouseEvent) => {
        //         if (event.ctrlKey) {
        //             this.categorySelectMode = CategorySelectMode.Update;
        //             this.selectedId = labelId;
        //             this.showLabelCategoriesDialog = true;
        //         } else {
        //             annotator.applyAction(Action.Label.Delete(labelId));
        //         }
        //         this.updateJSON();
        //     });
        //     annotator.on("connectionRightClicked", (connectionId, event: MouseEvent) => {
        //         if (event.ctrlKey) {
        //             this.categorySelectMode = CategorySelectMode.Update;
        //             this.selectedId = connectionId;
        //             this.showConnectionCategoriesDialog = true;
        //         } else {
        //             annotator.applyAction(Action.Connection.Delete(connectionId));
        //         }
        //         this.updateJSON();
        //     });
        //     annotator.on("contentInput", (position, value) => {
        //         annotator.applyAction(Action.Content.Splice(position, 0, value));
        //         this.updateJSON();
        //     });
        //     annotator.on("contentDelete", (position, length) => {
        //         annotator.applyAction(Action.Content.Splice(position, length, ""));
        //         this.updateJSON();
        //     });
        //     return annotator;
        // },
        // highlight(code: string): string {
        //     return Prism.highlight(code, Prism.languages.javascript, "javascript");
        // },
        // download: function () {
        //     const eleLink = document.createElement("a");
        //     eleLink.download = "data.json";
        //     eleLink.style.display = "none";
        //     const blob = new Blob([JSON.stringify(this.annotator.store.json, null, 4)]);
        //     eleLink.href = URL.createObjectURL(blob);
        //     document.body.appendChild(eleLink);
        //     eleLink.click();
        //     document.body.removeChild(eleLink);
        // },
        // downloadSVG: function () {
        //     const eleLink = document.createElement("a");
        //     eleLink.download = "data.svg";
        //     eleLink.style.display = "none";
        //     const blob = new Blob([this.annotator.export()]);
        //     eleLink.href = URL.createObjectURL(blob);
        //     document.body.appendChild(eleLink);
        //     eleLink.click();
        //     document.body.removeChild(eleLink);
        // },
    },
    computed: {
        // labelCategories(): LabelCategory.Entity[] {
        //     if (this.annotator === null) {
        //         return [];
        //     }
        //     const result = [];
        //     for (const [_, category] of this.annotator.store.labelCategoryRepo) {
        //         result.push(category);
        //     }
        //     return result;
        // },
        // connectionCategories(): ConnectionCategory.Entity[] {
        //     if (this.annotator === null) {
        //         return [];
        //     }
        //     const result = [];
        //     for (const [_, category] of this.annotator.store.connectionCategoryRepo) {
        //         result.push(category);
        //     }
        //     return result;
        // }
    },
    created(): void {
        // this.$eventbus.$on("fileUploaded", (jsonData: JSON) => {
        //     this.jsonData = jsonData;
        //     if (this.annotator !== null) {
        //         this.annotator.remove();
        //     }
        //     if (this.jsonData !== null && this.jsonData.content) {
        //         this.annotator = this.createAnnotator();
        //         this.updateJSON();
        //     }
        // });
        // this.$eventbus.$on("downloadRequest", () => {
        //     this.download();
        // });
        // this.$eventbus.$on("downloadSVGRequest", () => {
        //     this.downloadSVG();
        // });
    },
    mounted(): void {
        // if (this.jsonData !== null && this.jsonData.content) {
        //     this.annotator = this.createAnnotator();
        //     this.updateJSON();
        // }
    },
})
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-graph{
    .code-container-wrapper,
    .container-wrapper {
        min-height: calc(100vh - 64px);
        max-height: calc(100vh - 64px);
        overflow: hidden;
        padding: 0 !important;
    }

    .container-wrapper {
        border-right: solid 2px black;
    }

    .code-container-wrapper {
        border-left: solid 2px black;
    }

    .container,
    .code-container {
        padding-top: 10px;
        overflow: scroll;
        height: calc(100vh - 64px);
    }

    code {
        max-width: calc(45vw - 16px);
        background: rgb(32, 32, 32) !important;
        box-shadow: none !important;
        padding: 8px !important;
        padding-right: 40px !important;
        margin-bottom: 20px;
    }
}
</style>
<style rel="stylesheet/scss" lang="scss">
.component-graph{
    .container > svg {
        width: 45vw;
    }

    .poplar-annotation-label {
        font-size: 14px;
    }

    .poplar-annotation-connection {
        font-family: "PingFang SC", serif;
        font-size: 12px;
    }
    
}
</style>