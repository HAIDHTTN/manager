import Vue from 'vue'
import VueRouter from 'vue-router'
// 注册插件
Vue.use(VueRouter)


// 引入组件
import login from '../components/login.vue'
import main from '../components/main.vue'
// 定义路由
const routes=[
    {
        // 登录页
        path:'/login',
        component:login
    },
    {
        // 主页
        path:'/',
        component:main
    }
]

// 创建实例
const router=new VueRouter({
    routes
})

// 暴露
export default router;
