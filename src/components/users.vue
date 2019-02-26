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
    <!-- 搜索框 -->
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <div>
            <el-input placeholder="请输入内容" v-model="inputValue">
              <template slot="append">
                <el-button icon="el-icon-search"></el-button>
              </template>
            </el-input>
          </div>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple-light">
          <el-button type="success" plain>添加用户</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple">
          <template>
            <el-table :data="userData" border style="width: 100%">
              <el-table-column type="index" prop="index" label="#" width="180"></el-table-column>
              <el-table-column prop="username" label="姓名" width="180"></el-table-column>
              <el-table-column prop="email" label="邮箱"></el-table-column>
              <el-table-column prop="mobile" label="电话" width="180"></el-table-column>
              <el-table-column prop="mg_state" label="用户状态" width="180">
                  <template slot-scope="scope">
                    <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                  </template>      
              </el-table-column>
              <el-table-column prop="aoption" label="操作">
                <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
                <el-button type="danger" icon="el-icon-delete" plain size="mini"></el-button>
                <el-button type="success" icon="el-icon-check" plain size="mini"></el-button>
              </el-table-column>
            </el-table>
          </template>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple">
          <div class="block">
            <el-pagination
            
              :current-page="pageData.pagenum"
              :page-sizes="[100, 200, 300, 400]"
              :page-size="pageData.pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            ></el-pagination>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

      
<script>
export default {
  data() {
    return {
        level2:"用户管理",
        level3:'用户列表',
        pageData:{
         // 查询参数
          query: "",
        // 当前页码
          pagenum: 1,
          // 每页显示的条数
          pagesize: 10,
        },
        // 总条数
        total:0,
        inputValue: "",
        userData: []
    };
  },
  created() {
    this.$axios
      .get("users", {
        params: {
         
          // 当前页码
          pagenum: 1,
          // 每页显示的条数
          pagesize: 10
        }
      })
      .then(res => {
        console.log(res);
        this.userData = res.data.data.users;
        this.total=res.data.data.total;
        this. pagenum=res.data.data.pagenum;
      });
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
