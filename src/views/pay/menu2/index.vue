<template>
  <div class="app-container">

 <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
   <el-row>
     <el-col :span="7">
       <el-row>
         <el-form-item label="真实姓名" prop="name">
           <el-input v-model="formData.name" placeholder="请输入真实姓名" clearable :style="{width: '100%'}">
           </el-input>
         </el-form-item>
       </el-row>
     </el-col>
     <el-col :span="7">
       <el-row>
         <el-form-item label="性别" prop="sex">
           <el-select v-model="formData.sex" placeholder="请选择性别" clearable :style="{width: '100%'}">
             <el-option v-for="(item, index) in sexOptions" :key="index" :label="item.label"
               :value="item.value" :disabled="item.disabled"></el-option>
           </el-select>
         </el-form-item>
       </el-row>
     </el-col>
     <el-col :span="7">
       <el-row>
         <el-form-item label="状态" prop="status">
           <el-select v-model="formData.status" placeholder="请选择状态" clearable :style="{width: '100%'}">
             <el-option v-for="(item, index) in statusOptions" :key="index" :label="item.label"
               :value="item.value" :disabled="item.disabled"></el-option>
           </el-select>
         </el-form-item>
       </el-row>
     </el-col>
   </el-row>
   <el-form-item size="large">
     <el-button type="primary" @click="submitForm">提交</el-button>
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
       width="<25></25>0">
     </el-table-column>
     <el-table-column
       label="操作"
       width="100">
       <template slot-scope="scope">
         <el-button  type="text" size="small">查看</el-button>
         <el-button type="text" size="small">编辑</el-button>
       </template>
     </el-table-column>
   </el-table>
   <!-- 缴费日志结尾-->

     <el-pagination
           @size-change="handleSizeChange"
           @current-change="handleCurrentChange"
           :current-page="pageNum"
           :page-sizes="[10, 20, 50]"
           :page-size="pageSize"
           layout="total, sizes, prev, pager, next, jumper"
           :total="total">
         </el-pagination>

   </div>

</template>
<script>
  //条件分页查询全部缴费日志
  import { getPage } from '@/api/pay/order'
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
                pageNum: 1,
                pageSize: 10,
                total:0,
                 formData: {
                        name: undefined,
                        sex: undefined,
                        status: undefined,
                      },
                      rules: {
                        name: [{
                          required: true,
                          message: '请输入真实姓名',
                          trigger: 'blur'
                        }],
                        sex: [{
                          required: true,
                          message: '请选择性别',
                          trigger: 'change'
                        }],
                        status: [{
                          required: true,
                          message: '请选择状态',
                          trigger: 'change'
                        }],
                      },
                      sexOptions: [{
                        "label": "男",
                        "value": 0
                      }, {
                        "label": "女",
                        "value": 1
                      }],
                      statusOptions: [{
                        "label": "正常",
                        "value": 1
                      }, {
                        "label": "不可用",
                        "value": 0
                      }],
                    }
                  },



     created() {
     this.fetchData()
    },
    methods: {
      resetForm(formName) {
              this.$refs[formName].resetFields();
            },
           fetchData() {
             getPage(this.pageNum,this.pageSize,this.searchMap).then(response => {

               this.tableData = response.data.rows;
               this.total=response.data.total;

             })
           },
           handleSizeChange(){

           },
           handleCurrentChange(){

           },
           submitForm() {
                 this.$refs['elForm'].validate(valid => {
                   if (!valid) return
                   // TODO 提交表单
                 })
               },
               resetForm() {
                 this.$refs['elForm'].resetFields()
               },
    }

  }
</script>
