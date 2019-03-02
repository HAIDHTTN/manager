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
            <el-input placeholder="请输入内容" v-model="pageData.query">
              <template slot="append">
                <el-button icon="el-icon-search" @click="searchUsers"></el-button>
              </template>
            </el-input>
          </div>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple-light">
          <el-button type="success" plain @click="dialogFormVisible = true">添加用户</el-button>
        </div>
      </el-col>
    </el-row>
    <!-- 操作框 -->
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
                  <el-switch
                    v-model="scope.row.mg_state"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    @change="changeStatus(scope.row)"
                  ></el-switch>
                </template>
              </el-table-column>
              <el-table-column label="操作" prop="">
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    plain
                    size="mini"
                    @click="editeOne(scope.row)"
                  ></el-button>
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    plain
                    size="mini"
                    @click="delOne(scope.row)"
                  ></el-button>
                  <el-button
                    type="success"
                    icon="el-icon-check"
                    plain
                    size="mini"
                    @click="whatRoles(scope.row)"
                  ></el-button>
                </template>
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
              :page-sizes="[5, 6, 8, 10]"
              :page-size="pageData.pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            ></el-pagination>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- 添加框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="用户名" prop="username" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改框 -->
    <el-dialog title="修改用户" :visible.sync="editeFormVisible">
      <el-form :model="form2" :rules="rules" ref="form">
        <el-form-item label="用户名" prop="username" :label-width="formLabelWidth">
          <el-input v-model="form2.username" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form2.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form2.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editeFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm2('form')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 角色编辑框 -->
    <el-dialog title="分配角色" :visible.sync="rolesFormVisible">
      <el-form  ref="rolesform">
        <el-form-item label="当前用户:" :label-width="formLabelWidth">
         {{defaultrole.username}}
        </el-form-item>
        <el-form-item label="请选择角色:" :label-width="formLabelWidth">
         
            <el-select  placeholder="请选择" v-model="defaultrole.role_name">
              
              <el-option v-for="(item, index) in roleList" :key="item.id" :label="item.roleName" :value="item.id"></el-option>
            </el-select>
        
        </el-form-item>
      </el-form>
      </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="rolesFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm3('rolesform')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
      

      
<script>
export default {
  name: "users",
  data() {
    return {
      level2: "用户管理",
      level3: "用户列表",
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
      userData: [],
      // 添加框
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      },
      // 修改框
      editeFormVisible: false,
      form2: {
        id: 0,
        username: "",
        email: "",
        mobile: ""
      },
      // 角色编辑框
      rolesFormVisible: false,
      defaultrole:'',
      roleList:[],
      formLabelWidth: "120px"
    };
  },
  methods: {
    async getData() {
      let res1 = await this.$axios.get("users", {
        params: this.pageData
      });
      this.userData = res1.data.data.users;
      this.total = res1.data.data.total;
      // this. pagenum=res1.data.data.pagenum;
      // this.query=res1.data.data.query;
    },
    // 搜索
    searchUsers() {
      this.getData();
      // console.log(1);
    },
    // 添加用户
    async submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // 成功
          // console.log(valid);
          let res2 = await this.$axios.post("users", this.form);
          console.log(res2);
          if (res2.data.meta.status == 201) {
            this.dialogFormVisible = false;
            this.getData();
          }
        } else {
          this.$message.error("请输入正确的用户信息");
          return false;
        }
      });
    },
    //  删除用户
    async delOne(value) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          console.log(value);
          let id = value.id;
          let res3 = await this.$axios.delete(`users/${id}`);
          console.log(res3);
          if (res3.data.meta.status == 200) {
            this.getData();
          } else {
            this.$message.error(res3.data.meta.msg);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 编辑用户
    async editeOne(value) {
      let id = value.id;
      this.editeFormVisible = true;
      let res4 = await this.$axios.get(`users/${id}`);
      console.log(res4);
      for (const key in res4.data.data) {
        this.form2[key] = res4.data.data[key];
      }
    },
    //提交改变
    async submitForm2(form2) {
      this.$refs[form2].validate(async valid => {
        if (valid) {
          // 成功
          // console.log(valid);
          let res5 = await this.$axios.put(
            `users/${this.form2.id}`,
            this.form2
          );
          console.log(res5);
          if (res5.data.meta.status == 200) {
            this.editeFormVisible = false;
            this.getData();
          } else {
            this.$message.error(res5.data.meta.msg);
          }
        } else {
          this.$message.error("更新失败");
          return false;
        }
      });
    },
    // 状态更新
    async changeStatus(value) {
      let res6 = await this.$axios.put(
        `users/${value.id}/state/${value.mg_state}`
      );
    },
    // 角色管理
    async whatRoles(value) {
      this.rolesFormVisible = true;
      this.defaultrole=value;
      let res7=await this.$axios.get('roles');
      this.roleList=res7.data.data; 
    },
    // 角色修改
    async submitForm3(value){
     let res8=await this.$axios.put(`users/${this.defaultrole.id}/role`,{rid:this.defaultrole.role_name});
      this.rolesFormVisible = false;
     
      
    }
  },
  async created() {
    this.getData();
  }
};
</script>
<style lang="scss">
#users-container {
  padding: 10px;
  .search {
    line-height: 55px;
  }
  .el-form-item__content {
    text-align: left;
  }
}
</style>
