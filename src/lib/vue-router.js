import Vue from 'vue'
import VueRouter from 'vue-router'
// 注册插件
Vue.use(VueRouter)


// 引入组件
import login from '../components/login.vue'
import main from '../components/main.vue'
import users from '../components/users.vue'
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
