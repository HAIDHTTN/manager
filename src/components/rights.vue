<template>
  <div id="users-container">
    <!-- 面包屑导航 -->
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple bread">
          <breadcrumb :level2="level2" :level3="level3"></breadcrumb>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple">
          <el-table :data="rightsData" border style="width: 100%">
            <el-table-column type="index" prop="index" label="#" width="80"></el-table-column>
            <el-table-column prop="authName" label="权限名称" width="250"></el-table-column>
            <el-table-column prop="path" label="路径" width="250"></el-table-column>
            <el-table-column prop="level" label="层级" width="180">
              <template slot-scope="scope">
                <span v-if="scope.row.level==='0'">一级</span>
                <span v-if="scope.row.level==='1'">二级</span>
                <span v-if="scope.row.level==='2'">三级</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

      
<script>
export default {
  name:'rights',
  data() {
    return {
      level2: "权限管理",
      level3: "权限列表",
      pageData: {
        // 查询参数
        query: "",
        // 当前页码
        pagenum: 1,
        // 每页显示的条数
        pagesize: 10
      },
      // 总条数
      total: 0,
      inputValue: "",
      rightsData: []
    };
  },
  async created() {
    let res = await this.$axios.get("rights/list");
    console.log(res);
    this.rightsData = res.data.data;
  }
};
</script>
<style lang="scss">
#users-container {
  padding: 10px;
  .search {
    line-height: 55px;
  }
}
</style>
