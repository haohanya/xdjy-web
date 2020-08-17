<template>
  <div class="app-container">

 <el-form ref="elForm" :model="searchMap" :rules="rules" size="medium" label-width="100px">
   <el-row>
     <el-col :span="7">
       <el-row>
         <el-form-item label="真实姓名" prop="userName">
           <el-input v-model="searchMap.userName" placeholder="请输入真实姓名" clearable :style="{width: '100%'}">
           </el-input>
         </el-form-item>
       </el-row>
     </el-col>
     <el-col :span="7">
       <el-row>
         <el-form-item label="类型" prop="payType">
           <el-select v-model="searchMap.payType" placeholder="请选择状态" clearable :style="{width: '100%'}">
             <el-option v-for="(item, index) in typeOptions" :key="index" :label="item.label"
               :value="item.value" :disabled="item.disabled"></el-option>
           </el-select>
         </el-form-item>
       </el-row>
     </el-col>
     <el-col :span="7">
       <el-row>
         <el-form-item label="状态" prop="orderStatus">
           <el-select v-model="searchMap.orderStatus" placeholder="请选择状态" clearable :style="{width: '100%'}">
             <el-option v-for="(item, index) in statusOptions" :key="index" :label="item.label"
               :value="item.value" :disabled="item.disabled"></el-option>
           </el-select>
         </el-form-item>
       </el-row>
     </el-col>
   </el-row>
   <el-form-item size="large">
     <el-button type="primary" @click="submitForm">搜索</el-button>
     <el-button @click="resetForm">重置</el-button>
   </el-form-item>
 </el-form>
  <!-- 缴费日志开头-->
  <el-table
     :data="tableData"
     border
     style="width: 100%">
     <el-table-column
     fixed
       type="index"
       label="序号"
       width="120">
     </el-table-column>
     <el-table-column
       prop="createdTime"
       label="创建时间"
       width="135">
       <template slot-scope="scope">
         {{scope.row.createdTime | formatDate}}
       </template>
     </el-table-column>
     <el-table-column
       prop="userName"
       label="姓名"
       width="120">
     </el-table-column>
     <el-table-column
     prop="payType"
       label="类型"
       width="120">
     </el-table-column>
     <el-table-column
       prop="money"
       label="金额"
       width="120">
     </el-table-column>
      <el-table-column
       prop="money"
       label="付款时间"
       width="135">
       <template slot-scope="scope">
         {{scope.row.payTime | formatDate}}
       </template>
     </el-table-column>
     <el-table-column
       prop="endTime"
       label="完成时间"
       width="135">
       <template slot-scope="scope">
         {{scope.row.endTime | formatDate}}
       </template>
     </el-table-column>
     <el-table-column
       prop="orderStatus"
       label="状态"
       width="220">
       <template slot-scope="scope">
         <el-switch
           style="display: block"
           disabled
           v-model="scope.row.orderStatus"
           :active-value="1"
           :inactive-value="0"
           active-color="#13ce66"
           inactive-color="#ff4949"
           active-text="已支付"
           inactive-text="未支付">
         </el-switch>
       </template>
     </el-table-column>
     <el-table-column
       prop="weOrderId"
       label="流水号"
       width="150">
     </el-table-column>
     <el-table-column
       prop="message"
       label="备注"
       width="150">
     </el-table-column>
     <el-table-column
       label="操作"
       width="100">
       <template slot-scope="scope">
               <el-button @click="findOne(scope.row),dialogFormVisible=true" type="text" size="small">编辑</el-button>
             </template>
     </el-table-column>
   </el-table>
   <!-- 缴费日志结尾-->

     <el-pagination
           @size-change="handleSizeChange"
           @current-change="handleCurrentChange"
           :current-page="pageNum"
           :page-sizes="[1, 10, 20, 50]"
           :page-size="pageSize"
           layout="total, sizes, prev, pager, next, jumper"
           :total="total">
         </el-pagination>
         <el-dialog title="缴费记录" :visible.sync="dialogFormVisible">
           <el-form :model="order">
             <el-form-item label="姓名" :label-width="formLabelWidth">
                   <el-input v-model="order.userName" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="金额" :label-width="formLabelWidth">
                    <el-input v-model="order.money" autocomplete="off"></el-input>
               </el-form-item>
               <el-form-item label="类型" :label-width="formLabelWidth">
                      <el-select v-model="order.payType" placeholder="请选择">
                         <el-option
                           v-for="item in typeOptions"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                         </el-option>
                       </el-select>
                </el-form-item>
                <el-form-item label="状态" :label-width="formLabelWidth">
                      <el-select v-model="order.orderStatus" placeholder="请选择">
                         <el-option
                           v-for="item in statusOptions"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                         </el-option>
                       </el-select>
                 </el-form-item>
           </el-form>
           <div slot="footer" class="dialog-footer">
             <el-button @click="dialogFormVisible = false">取 消</el-button>
             <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
           </div>
         </el-dialog>

   </div>

</template>
<script>
  //条件分页查询全部缴费日志
  import { getPage } from '@/api/pay/order';
  //根据id查询
  import { getOne } from '@/api/pay/order';
  //日期处理
  import {formatDate} from '@/utils/date';



  export default {
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'gray',
          deleted: 'danger'
        }
        return statusMap[status]
      },
      formatDate(time) {
        if(time != null){
              var date = new Date(time);//Mon Jan 19 1970 01:28:27 GMT+0800 (中国标准时间)
              return formatDate(date, 'yyyy-MM-dd hh:mm');
            }
            }

    },
    data() {
      return {
        //支付日志数据数组
                tableData: [],
                searchMap: {},
                order:{},
                pageNum: 0,
                pageSize: 1,
                total:3,
                dialogFormVisible:false,
                formLabelWidth: '100px',
                 formData: {
                        name: undefined,
                        type: undefined,
                        status: undefined,
                      },
                      rules: {

                      },
                      typeOptions: [{
                        "label": "水费",
                        "value": "水费"
                      }, {
                        "label": "电费",
                        "value": "电费"
                      },{
                        "label": "住宿费",
                        "value": "住宿费"
                      }],
                      statusOptions: [{
                        "label": "已支付",
                        "value": 1
                      }, {
                        "label": "未支付",
                        "value": 0
                      }],
                    }
                  },



     created() {
     this.fetchData()
    },
    methods: {
           fetchData() {
             getPage(this.pageNum,this.pageSize,this.searchMap).then(response => {
               this.tableData = response.data.rows;
               this.total=response.data.total;
             })
           },
           handleSizeChange($val){

             this.pageSize=$val;
             this.fetchData();
           },
           handleCurrentChange($val){
              console.log($val)
             this.pageNum=$val
             this.fetchData();
           },
           submitForm() {
                 this.$refs['elForm'].validate(valid => {
                   this.fetchData();
                   // TODO 提交表单
                 })
               },
               resetForm() {
                 this.$refs['elForm'].resetFields()
               },
               findOne(rows){
                 getOne(rows.id).then(response=>{
                   this.order= response.data;
                   console.log(this.order);
                 })
                 }
    }

  }
</script>
