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
          <el-button type="success" plain>添加商品</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple">
          <template>
            <el-table :data="goodsData" border style="width: 100%">
              <el-table-column type="index" prop="index" label="#" width="60"></el-table-column>
              <el-table-column prop="goods_name" label="商品名称" width="500"></el-table-column>
              <el-table-column prop="goods_price" label="商品价格" width="100"></el-table-column>
              <el-table-column prop="goods_weight" label="商品重量" width="100"></el-table-column>
              <el-table-column prop="add_time" label="创建时间" width="180">
                <template slot-scope="prop">{{prop.row.add_time|switchTime}}</template>
              </el-table-column>
              <el-table-column prop="aoption" label="操作">
                <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
                <el-button type="danger" icon="el-icon-delete" plain size="mini"></el-button>
              </el-table-column>
            </el-table>
          </template>
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
export default {
  name:'goods',
  data() {
    return {
        level2:"商品管理",
        level3:'商品列表',
        pageData:{
         // 查询参数
          query: "",
        // 当前页码
          pagenum: 1,
          // 每页显示的条数
          pagesize: 6,
        },
        // 总条数
        total:0,
        inputValue: "",
        goodsData: []
    };
  },
  methods: {
      async getData(){
           let res=await this.$axios
      .get("goods", {
        params: this.pageData
      })
    //   console.log(res);  
       this.goodsData = res.data.data.goods;
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
