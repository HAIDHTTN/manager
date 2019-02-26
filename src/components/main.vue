<template>
  <div id="container-box">
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="6" class="bg-purple-dark">
            <div class="grid-content bg-purple-dark">
              <img class="logo" src="../assets/logo.png" alt>
            </div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content bg-purple-dark">
              <h2>电商后台管理系统</h2>
            </div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple-dark">
              <el-button type="danger" @click="loginOut" class="btn-loginOut">退出</el-button>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-col :span="24">
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              unique-opened
              router
              collapse-transition
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b"
            >
              <el-submenu
                v-for="(item1, index) in menusList"
                :key="item1.id+''"
                :index="item1.path"
              >
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>{{item1.authName}}</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item
                    v-for="(item2, index) in item1.children"
                    :key="item2.id+''"
                    :index="'/'+item2.path"
                  >
                    <i class="el-icon-menu"></i>
                    <span>{{item2.authName}}</span>
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import breadcrumb from "./breadcrumb";
export default {
  // components: {
  //     breadcrumb
  //     },
  data() {
    return {
      menusList: []
    };
  },
  methods: {
    //   退出按钮
    loginOut() {
      this.$confirm("是否确定要退出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "退出成功!"
          });
          window.sessionStorage.removeItem("token");
          this.$router.push("login");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出"
          });
        });
    }
  },
  created() {
    this.$axios("menus", {
      // headers:{
      //     Authorization :window.sessionStorage.getItem('token')
      // }
    })
      .then(res => {
        this.menusList = res.data.data;
        // console.log(this.menusList);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style lang="scss">
#container-box {
  width: 100%;
  height: 100%;
  .el-container {
    height: 100%;
  }
  .el-header {
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
    line-height: 60px;
    color: #fff;
    padding: 0px;
  }

  .el-aside {
    background-color: #d3dce6;
    color: #333;
    // text-align: left;
    line-height: 200px;
  }

  .el-main {
    background-color: #e9eef3;
    color: #333;
    text-align: center;
    padding: 10px;
  }
  .el-row {
      margin-bottom: 5px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .el-submenu__title {
    padding-left: 0xp;
  }
}
</style>