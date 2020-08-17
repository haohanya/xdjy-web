<template>
  <div class="box">
    <el-form :inline="true" :model="seachMap" class="demo-form-inline">
      <el-form-item label="品牌名称">
        <el-input v-model="seachMap.name" placeholder="品牌名称(支持模糊查询)"></el-input>
      </el-form-item>
      <el-form-item label="品牌首字母">
        <el-input v-model="seachMap.firstChar" placeholder="品牌首字母"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="fetchPage">查询</el-button>
        <el-button type="primary" @click="dialogVisible=true,dialogTitle='添加窗口'">添加</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        type="index"
        label="序号">
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称">
      </el-table-column>
      <el-table-column
        prop="firstChar"
        label="首字母">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row),dialogVisible=true,dialogTitle='编辑窗口'">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      class="centered">
    </el-pagination>
    <el-dialog
      :title.sync="dialogTitle"
      :visible.sync="dialogVisible"
      @close="pojo={}"
      width="50%">
      <el-form :model="pojo" status-icon ref="pojo" label-width="100px" class="demo-ruleForm">
        <el-form-item label="品牌名称" prop="name">
          <el-input type="text" v-model="pojo.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="品牌首字母" prop="firstChar">
          <el-input type="text" v-model="pojo.firstChar" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="品牌Logo" prop="firstChar">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitBrand()">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { findPage,del,add,brandByid,upDate} from '@/api/shop/brand/index'
  export default {
  data() {
    return {
      dialogVisible: false,
      tableData: [],
      seachMap: {
        name: '',
        firstChar: ''
      },
      currentPage: 1,
      total: 10,
      size: 10,
      pojo: {},
      imageUrl: '',
      folder: 'brand',
      dialogTitle: '添加'
    }
  },
  created() {
    this.fetchPage()
  },
    methods: {
    fetchPage() {
      findPage(this.seachMap,this.currentPage,this.size).then(response => {
        this.tableData = response.data.rows;
        console.log(response);
        this.total = response.data.total;
      });
    },
      /**
       * 品牌删除
       */
      brandDel(id){
        del(id).then(response =>{
          if (response.code == 200){
            this.$message({
              message: '删除成功!',
              type: 'success'
            });
            this.fetchPage()
          }
        })
      },
    /**
     * 每页分页数量被改变
     */
    handleSizeChange(val) {
      this.size = val;
      this.fetchPage();
    },
    /**
     * 当前页数被改变
     */
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchPage();
    },
    /**
     * 编辑
     */
    handleEdit(index,row) {
        brandByid(row.id).then(response =>{
          this.pojo = response.data
        })
    },
    /**
     * 删除
     */
    handleDelete(index,row) {
      this.brandDel(row.id);
      this.fetchPage();
    },
      /**
       * 添加编辑品牌
       *
       */
      submitBrand(){
        if (this.pojo.id!=null && this.pojo.id!=''){
          upDate(this.pojo).then(response =>{
            if (response.code == 200){
              this.dialogVisible = false;
              this.pojo = {};
              this.$message({
                message: '修改成功!',
                type: 'success'
              });
            }
          })
        }else {
          add(this.pojo).then(response =>{
            if (response.code == 200){
              this.dialogVisible = false;
              this.pojo = {};
              this.$message({
                message: '添加成功!',
                type: 'success'
              });
            }
          })
        }
        this.fetchPage()
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
  }
}
</script>

<style scoped>
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    border-radius: 6px;
    border: 1px dashed #d9d9d9;
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .box {
    margin-top: 10px;
  }
  .el-table .cell {
    text-align: center;
  }

  .centered {
    text-align: center;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
