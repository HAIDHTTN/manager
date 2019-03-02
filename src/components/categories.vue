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
      <el-col :span="2">
        <div class="grid-content bg-purple-light">
          <el-button type="success" plain>添加分类</el-button>
        </div>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple">
         
            <el-table :data="categoriesData" border style="width:100%">
                 <!-- 树形table -->
          <el-tree-grid
            prop="cat_name"
            label="分类名称"
            treeKey="cat_id"
            parentKey="cat_pid"
            levelKey="cat_level"
            childKey="children"
            :indentSize="30"
          ></el-tree-grid>
               
              <el-table-column prop="cat_level" label="级别" width="100">
                  <template slot-scope="prop">
                      <span v-if="prop.row.cat_level=='0'">一级</span>
                      <span v-if="prop.row.cat_level=='1'">二级</span>
                      <span v-if="prop.row.cat_level=='2'">三级</span>             
                  </template>
              </el-table-column>
              <el-table-column prop="goods_weight" label="是否有效" width="100"></el-table-column>
              <el-table-column prop="aoption" label="操作">
                <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
                <el-button type="danger" icon="el-icon-delete" plain size="mini"></el-button>
              </el-table-column>
            </el-table>
        
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="18">
        <div class="grid-content bg-purple">
          <div class="block">
            <el-pagination
              @size-change="sizeChange"
              @current-change="currentChange"
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
  </div>
</template>

      
<script>
import ElTreeGrid from 'element-tree-grid'
// Vue.component(ElTreeGrid.name,ElTreeGrid);
export default {
  name:'categories',
    components:{ElTreeGrid},
  data() {
    return {
        level2:"商品管理",
        level3:'商品分类',
        pageData:{
        // 当前页码
          pagenum: 1,
          // 每页显示的条数
          pagesize: 6,
        },
        // 总条数
        total:0,
        inputValue: "",
        categoriesData: []
    };
  },
  methods: {
      async getData(){
           let res=await this.$axios
      .get("categories", {
        params: this.pageData
      })
     console.log(res);  
       this.categoriesData = res.data.data.result;
        this.total=res.data.data.total;
      },
      sizeChange(value){
         this. pageData.pagesize=value;
         this.getData()
          
      },
      currentChange(value){
          console.log(value);   
          this.pageData.pagenum=value;
          console.log(this.pageData.pagenum);
          
          this.getData()
          
      }
  },
  async created() {
   this.getData()
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
