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
// 引入组件面包屑
import breadcrumb from './components/breadcrumb.vue'
Vue.component('breadcrumb', breadcrumb)
// 导入moment.js
import moment from 'moment'
// 导入全局样式
import './assets/base.css'
// 过滤器
Vue.filter('switchTime',function(value){
  return moment(value).format('YYYY-MM-DD-hh:mm:ss');
})
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
  
}).$mount('#app')
