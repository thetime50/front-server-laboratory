import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
// import vuetify from "./plugins/vuetify";
import "roboto-fontface/css/roboto/roboto-fontface.css";
// import "@mdi/font/css/materialdesignicons.css";
// import i18n from "./i18n";

//////////////////////////////////////////////////////////////////////////////
import axios from "@/api/axios.js"

//引入store
import store from './store/index'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './js/directives.js'

// import promise from 'es6-promise'
// promise.polyfill();

Vue.use(ElementUI, { size: 'small' });

Vue.config.productionTip = false

//全局方法
Vue.prototype.axios = axios
///////////////////////////////////////////////////////////////////////////

Vue.config.productionTip = false;
Vue.prototype.$eventbus = new Vue();
new Vue({
    router,
    store,

    // @ts-ignore
    // vuetify,

    // i18n,
    render: (h) => h(App),
}).$mount("#app");
