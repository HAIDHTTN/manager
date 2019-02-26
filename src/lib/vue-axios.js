import axios from 'axios'
// import Vue from 'vue'
import {Message} from 'element-ui'

// 设置基地址
axios.defaults.baseURL = "http://localhost:8888/api/private/v1/";

// 拦截器
axios.interceptors.request.use(function (config) {
    if (config.url.indexOf('/login') != -1) {
        // 是登录界面
    } else {
        //不是登录界面 
        config.headers.Authorization = window.sessionStorage.getItem('token');
    }
    return config;
}, function (error) {
    // console.log(error);
    return Promise.reject(error);
});
    axios.interceptors.response.use(function (res) {
    // console.log(res);
    if(res.data.meta.status===400) {
        //登录失败
        // Vue.prototype.$message.error(res.data.meta.msg);    
        Message.error(res.data.meta.msg);    
    }else if(res.data.meta.status===200){
        // 登录成功
        // Vue.prototype.$message.success(res.data.meta.msg);
       Message.success(res.data.meta.msg);
    }
    return res;
  }, function (err) {
    return Promise.reject(err);
  });

//   暴露
export default {
    install(Vue) {
        Vue.prototype.$axios = axios;
    }
}