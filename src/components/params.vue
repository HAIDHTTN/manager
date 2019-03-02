<template>
  <div id="params-container">
    <!-- 面包屑导航 -->
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple bread">
          <breadcrumb :level2="level2" :level3="level3"></breadcrumb>
        </div>
      </el-col>
    </el-row>
    <!-- 搜索框  -->
    <el-row>
      <el-alert title="注意:只允许为第三级分类设置相关参数" type="warning" show-icon></el-alert>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple">
          <div class="block">
            <span>请选择商品分类:</span>
            <el-cascader
              :props="props"
              expand-trigger="hover"
              :options="paramsData"
              v-model="selectedOptions2"
              @change="handleChange"
            ></el-cascader>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple">
          <template>
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="动态参数" name="first">
                <el-button type="primary" plain size="small">动态参数</el-button>
                <template>
                  <el-table :data="paramsData" border style="width: 100%">
                       <el-table-column prop="username" label="" width="60"></el-table-column>
                    <el-table-column type="index" prop="index" label="#" width="60"></el-table-column>
                    <el-table-column prop="username" label="商品参数" width="180"></el-table-column>
                
                    <el-table-column prop="aoption" label="操作">
                      <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
                      <el-button type="danger" icon="el-icon-delete" plain size="mini"></el-button>
                      <el-button type="success" icon="el-icon-check" plain size="mini"></el-button>
                    </el-table-column>
                  </el-table>
                </template>
              </el-tab-pane>
              <el-tab-pane label="静态参数" name="second">
                <el-button type="primary" plain size="small">静态参数</el-button>
                <template>
                  <el-table :data="paramsData" border style="width: 100%">
                    <el-table-column type="index" prop="index" label="#" width="60"></el-table-column>
                    <el-table-column prop="username" label="属性名称" width="180"></el-table-column>
                    <el-table-column prop="email" label="属性值"></el-table-column>
                    <el-table-column prop="aoption" label="操作">
                      <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
                      <el-button type="danger" icon="el-icon-delete" plain size="mini"></el-button>
                      <el-button type="success" icon="el-icon-check" plain size="mini"></el-button>
                    </el-table-column>
                  </el-table>
                </template>
              </el-tab-pane>
            </el-tabs>
          </template>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
       

      
<script>
export default {
  name:'params',
  data() {
    return {
      level2: "商品管理",
      level3: "分类参数",
      paramsData: [],
      props: {
        label: "cat_name",
        value: "cat_id"
      },
      selectedOptions2: [],
      activeName: "first"
    };
  },
  async created() {
    let res = await this.$axios.get("categories?type=3");
    console.log(res);
    this.paramsData = res.data.data;
    console.log(this.paramsData);
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>
<style lang="scss">
#params-container {
  padding: 10px;
  .grid-content {
    text-align: left;
  }
}
</style>
