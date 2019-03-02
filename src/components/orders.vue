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
          <template>
            <el-table :data="orderData" border style="width: 100%">
              <el-table-column type="index" prop="index" label="#" width="60"></el-table-column>
              <el-table-column prop="order_number" label="订单编号" width="250"></el-table-column>
              <el-table-column prop="order_price" label="订单价格" width="100"></el-table-column>
              <el-table-column prop="order_pay" label="是否付款" width="100">
                  <template slot-scope="prop">
                      <el-button type="danger" plain v-if="prop.row.order_pay==='0'">未付款</el-button>
                      <el-button type="danger" plain v-else>已付款</el-button>                              
                  </template>
              </el-table-column>
              <el-table-column prop="is_send" label="是否发货" width="60"></el-table-column>
              <el-table-column prop="add_time" label="下单时间" width="180">
                <template slot-scope="prop">{{prop.row.add_time|switchTime}}</template>
              </el-table-column>
              <el-table-column prop="aoption" label="操作">
                <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
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
  data() {
    return {
        level2:"订单管理",
        level3:'订单列表',
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
        orderData: []
    };
  },
  methods: {
      async getData(){
           let res=await this.$axios
      .get("orders", {
        params: this.pageData
      })
      console.log(res);  
       this.orderData = res.data.data.goods;
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
