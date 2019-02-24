<template>
    <div>
       main
        <el-button type="danger"   @click="loginOut">退出</el-button>
    </div>
</template>
<script>
export default {
   beforeCreate() {
       let token=window.sessionStorage.getItem('token');
       if(token){
        //    登录成功

       }
       else{
        //    登录失败
        this.$message.error("请先登录");
        this.$router.push('login');

       }
   },
   methods: {
       loginOut(){
           window.sessionStorage.removeItem('token');
           this.$router.push('login')
       }
   },
}
</script>
<style lang="">
    
</style>