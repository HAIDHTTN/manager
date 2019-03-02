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
          <el-button type="info" plain @click="addRoles">添加角色</el-button>
        </div>
      </el-col>
    </el-row>
    <!-- 操作狂 -->
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
                        <div class="grid-content">
                          <el-button type="primary" plain size="small">
                            {{item.authName}}
                            <i class="el-icon-close" @click="delDag(props.row,item)"></i>
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
                                <i class="el-icon-close" @click="delDag(props.row,level2)"></i>
                              </el-button>
                              <i class="el-icon-arrow-right"></i>
                            </div>
                          </el-col>
                          <el-col :span="19">
                            <div class="grid-content">
                              <el-button
                                type="warning"
                                plain
                                size="small"
                                v-for="(level3, index) in level2.children"
                                :key="level3.id"
                              >
                                {{level3.authName}}
                                <i class="el-icon-close" @click="delDag(props.row,level3)"></i>
                              </el-button>
                            </div>
                          </el-col>
                        </el-row>
                      </el-col>
                    </el-row>
                    <!-- 没有权限 -->
                    <el-row v-if="props.row.children.length==0">没有权限</el-row>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column type="index" prop="index" label="#" width="60"></el-table-column>
              <el-table-column prop="roleName" label="角色名称" width="200"></el-table-column>
              <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
              <el-table-column prop="aoption" label="操作">
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
                    @click="getChecked(scope.row)"
                  ></el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </div>
      </el-col>
    </el-row>

    <!-- 添加框 -->
    <el-dialog title="添加角色" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="角色名称" prop="roleName" :label-width="formLabelWidth">
          <el-input v-model="form.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc" :label-width="formLabelWidth">
          <el-input v-model="form.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改框 -->
    <el-dialog title="修改用户" :visible.sync="editeFormVisible">
      <el-form :model="form2" :rules="rules" ref="form2">
        <el-form-item label="角色名称" prop="roleName" :label-width="formLabelWidth">
          <el-input v-model="form2.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc" :label-width="formLabelWidth">
          <el-input v-model="form2.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editeFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm2('form2')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 权限编辑框 -->
    <el-dialog title="权限分配" :visible.sync="rightsFormVisible">
      <el-tree
        :data="rightsList"
        show-checkbox
        node-key="id"
        ref="tree"
        default-expand-all
        :default-checked-keys="checkedList"
        :props="defaultProps"
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click=" rightsFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm3">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

      
<script>
export default {
  name: "roles",
  data() {
    return {
      level2: "权限管理",
      level3: "角色列表",
      inputValue: "",
      rolesData: [],
      rolesPermission: [],
      //添加数据
      dialogFormVisible: false,
      form: {
        roleName: "",
        roleDesc: ""
      },
      rules: {
        roleName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 5, max: 20, message: "长度在5 到 20 个字符", trigger: "blur" }
        ],
        roleDesc: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 5, max: 20, message: "长度在 5 到 20 个字符", trigger: "blur" }
        ]
      },
      //编辑数据
      editeFormVisible: false,
      form2: {
        roleName: "",
        roleDesc: ""
      },
      formLabelWidth: "120px",
      // 获取权限
      // 所有的权限
      rightsList: [],
       defaultProps: {
          children: 'children',
          label: 'authName'
        },
        // 选中的权限
        checkedList:[],
        select:{},
      rightsFormVisible: false
    };
  },
  methods: {
    async getData() {
      let res1 = await this.$axios.get("roles");
      // console.log(res1);
      this.rolesData = res1.data.data;
    },
    // 添加按钮
    addRoles() {
      this.dialogFormVisible = true;
    },
    // 添加提交按钮
    submitForm(formname) {
      this.$refs[formname].validate(async valid => {
        if (valid) {
          let res2 = await this.$axios.post("roles", this.form);
          this.dialogFormVisible = false;
          this.getData();
        } else {
          this.$message.error("请输入正确的用户信息");
          return false;
        }
      });
    },
    // 删除操作
    delOne(value) {
      this.$confirm("此操作将永久删除该角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let id = value.id;
          let res3 = await this.$axios.delete(`roles/${value.id}`);
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
    // 编辑操作
    editeOne(value) {
      this.editeFormVisible = true;
      this.form2 = value;
    },
    // 编辑完提交
    submitForm2(formname) {
      this.$refs[formname].validate(async valid => {
        if (valid) {
          // 成功
          let res5 = await this.$axios.put(
            `roles/${this.form2.id}`,
            this.form2
          );
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
    // 权限编辑
    async getChecked(value) {
      console.log(value );
      this.select=value;
      this.rightsFormVisible = true;
      let res = await this.$axios.get("rights/tree");
      // console.log(res);
      this.rightsList=res.data.data;
      this.checkedList=[];
      let findChildren=(father)=>{
        if(father.children){
          // console.log("有儿子");     
          father.children.forEach(v=>{ 
                          
            findChildren(v);
          })
        }else {
            this.checkedList.push(father.id);  
          // console.log("没有儿子");              
        }
      };
       findChildren(value);
        // console.log(this.checkedList); 
    },
    async submitForm3(){
           this.checkedList= this.$refs.tree.getCheckedKeys()
           let half= this.$refs.tree.getHalfCheckedKeys();
           let total=this.checkedList.concat(half);
          let rids=total.join(',');
          let res=await this.$axios.post(`roles/${this.select.id}/rights`,{rids});
          console.log(res);
           this.rightsFormVisible = false;
           this.getData()
           

      },
    // 删除权限
    async delDag(l,r){
      console.log(l);
      console.log(r);
      let res=await this.$axios.delete(`roles/${l.id}/rights/${r.id}`);
      console.log(res);
      l.children=res.data.data;
      
    },
  },
  
  async created() {
    this.getData();
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
    margin: 5px 20px 5px 0px;
    //   float: left;
  }
}
</style>
