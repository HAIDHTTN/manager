<template>
  <div id="roles-container">
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
      <el-col :span="2">
        <div class="grid-content bg-purple-light">
          <el-button type="info" plain>添加角色</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple">
          <template>
            <el-table :data="rolesData" border style="width: 100%">
              <!-- 展开的权限 -->
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form label-position="left" inline class="demo-table-expand">
                      <!-- 有权限 -->
                    <el-row v-for="(item, index) in props.row.children">
                      <!-- 1级 -->
                      <el-col :span="4">
                        <div class="grid-content ">
                          <el-button type="primary" plain size="small">
                            {{item.authName}}
                            <i class="el-icon-close"></i>
                          </el-button>
                          <i class="el-icon-arrow-right"></i>
                        </div>
                      </el-col>
                      <!-- 2级 -->
                      <el-col :span="20">
                        <el-row v-for="(level2, index) in item.children" :key="level2.id">
                          <el-col :span="5">
                            <div class="grid-content">
                              <el-button type="success" plain size="small">
                                {{level2.authName}}
                                <i class="el-icon-close"></i>
                              </el-button>
                              <i class="el-icon-arrow-right"></i>
                            </div>
                          </el-col>
                          <el-col :span="19">
                            <div
                              class="grid-content"
                              
                            >
                              <el-button type="warning" plain size="small" v-for="(level3, index) in level2.children"
                              :key="level3.id">
                                {{level3.authName}} <i class="el-icon-close"></i>
                              </el-button>
                            </div>
                          </el-col>
                        </el-row>
                      </el-col>
                    </el-row>
                    <!-- 没有权限 -->
                    <el-row v-if="props.row.children.length==0">
                        没有权限
                    </el-row>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column type="index" prop="index" label="#" width="60"></el-table-column>
              <el-table-column prop="roleName" label="角色名称" width="200"></el-table-column>
              <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
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
  </div>
</template>

      
<script>
export default {
  data() {
    return {
      level2: "权限管理",
      level3: "角色列表",
      inputValue: "",
      rolesData: [],
      rolesPermission: []
    };
  },
  async created() {
    let res1 = await this.$axios.get("roles");
    this.rolesData = res1.data.data;
    console.log(this.rolesData);
  }
};
</script>
<style lang="scss">
#roles-container {
  padding: 10px;
  .search {
    line-height: 55px;
  }
  .grid-content button {
    margin-right: 5px;
    i {
      margin-left: 10px;
    }
  }
  .el-button {
      margin:5px 20px 5px 0px;
    //   float: left;
  }
}
</style>
