import Vue from 'vue'
import App from './App.vue'
// 导入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// 导入自己抽取的axios
import VueAxios from "./lib/vue-axios";
Vue.use(VueAxios)
// 引入自己抽取的vue-router
import router from "./lib/vue-router"


// 导入全局样式
import './assets/base.css'


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
  
}).$mount('#app')
