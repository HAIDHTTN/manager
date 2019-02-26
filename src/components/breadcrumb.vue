<template>
  <div id="bread">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{level2}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{level3}}</el-breadcrumb-item>
     
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
    props:['level2','level3']
};
</script>
<style lang="scss">
#bread {
.nav {
    line-height: 35px;
    padding-left: 20px;
     font-size: 16px;
}
}

</style>
