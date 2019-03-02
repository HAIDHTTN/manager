import Vue from 'vue'
import VueRouter from 'vue-router'
// 注册插件
Vue.use(VueRouter)


// 引入组件
import login from '../components/login.vue'
import main from '../components/main.vue'
import users from '../components/users.vue'
import roles from '../components/roles.vue'
import rights from '../components/rights.vue'
import goods from '../components/goods.vue'
import params from '../components/params.vue'
import categories from '../components/categories.vue'
import orders from '../components/orders.vue'
import reports from '../components/reports.vue'
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
        component:main,
        children:[
           {
            path:'users',
            component:users
           } ,
           {
            path:'roles',
            component:roles
           },
           {
            path:'rights',
            component:rights
           },
           {
            path:'goods',
            component:goods
           },
           {
            path:'params',
            component:params
           },
           {
            path:'categories',
            component:categories
           },
           {
            path:'orders',
            component:orders
           },
           {
            path:'reports',
            component:reports
           }
        ]
          
        
    }
]

// 创建实例
const router=new VueRouter({
    routes
})

// 导航守卫
 router.beforeEach((to, from, next) => {
    if(to.path==='/login'){
        next()
    }else{
        let token=window.sessionStorage.getItem('token');
        if(token){
         //    登录成功
         next()
        }
        else{
         //    登录失败
         Vue.prototype.$message.error("请先登录");
        //  this.$router.push('login');
        next('/login')

    
        }
        

    }
   
   
    
    
})

// 暴露
export default router;
