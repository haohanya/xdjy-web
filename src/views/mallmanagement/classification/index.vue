<template>
  <div class="box">
    <el-form :inline="true" :model="seachMap" class="demo-form-inline">
      <el-form-item label="分类名称">
        <el-input v-model="seachMap.name" placeholder="分类名称(支持模糊查询)"></el-input>
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
        prop="isShow"
        label="是否显示">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.isShow"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        prop="isMenu"
        label="是否菜单">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.isMenu"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0">
          </el-switch>
        </template>
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
      @close="pojo={},category={},categoryItem=[]"
      width="50%">
      <el-form :model="category" status-icon ref="category" label-width="100px" class="demo-ruleForm">
        <el-form-item label="分类名称" prop="name">
          <el-input type="text" v-model="category.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否显示" prop="isShow">
            <el-switch
              v-model="category.isShow"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="0">
            </el-switch>
        </el-form-item>
        <el-form-item label="是否菜单" prop="isMenu">
            <el-switch
              v-model="category.isMenu"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="0">
            </el-switch>
        </el-form-item>
        <el-form-item>
          <div class="categoryItem">
            <el-button size="mini" type="primary" @click="addCategory()">添加分类子项</el-button>
          </div>
        </el-form-item>
          <div class="itemClass">
            <template v-for="item in categoryItem" >

              <el-form-item label="分类子项" >
              <el-row :gutter="20">
                <el-col :span="10">
                    <el-input type="text" v-model="item.name" autocomplete="off"></el-input>
                </el-col>
                <el-col :span="10">
                    <el-select
                      style="width: 100%"
                      v-model="item.item"
                      multiple
                      filterable
                      allow-create
                      default-first-option
                      placeholder="请输入父子项内容">
                    </el-select>
                </el-col>
                <el-button type="danger" icon="el-icon-delete" circle @click="deleteCategory(item)"></el-button>
              </el-row>
              </el-form-item>


            </template>
          </div>
        <el-form-item>
          <el-button type="primary" @click="submitBrand()">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import { findPage,del,add,categoryByid,upDate} from '@/api/shop/category/index'
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
          dialogTitle: '添加',
          category:{

          },
          categoryItem: [
          ],
          categoryMap:{

          }
        }
      },
      created() {
        this.fetchPage()
      },
      methods: {
        deleteCategory(item){
          this.categoryItem.splice(item,1)
        }
        ,
        addCategory(){
            this.categoryItem.push({});
        },
        fetchPage() {
          findPage(this.seachMap, this.currentPage, this.size).then(response => {
            this.tableData = response.data.rows;
            console.log(response);
            this.total = response.data.total;
          });
        },
        /**
         * 分类删除
         */
        categoryDel(id) {

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
        handleEdit(index, row) {
          categoryByid(row.id).then(response => {
            this.category = response.data.category;
            for (let key in response.data.categoryItem){
              let selectVal = [];
              for (let v in response.data.categoryItem[key]){
                 selectVal.push(response.data.categoryItem[key][v].name);
              }
              this.categoryItem.push({name:key,item:selectVal});
            }
          })
        },
        /**
         * 删除
         */
        handleDelete(index, row) {
            this.categoryDel(row.id);
        },
        /**
         * 分类删除
         */
        categoryDel(id){
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
         * 添加编辑品牌
         *
         */
        submitBrand() {
          this.categoryMap.category = this.category;
          this.categoryMap.categoryItem = this.categoryItem;
          if (this.categoryMap.category.id != null && this.categoryMap.category.id != '') {
            upDate(this.categoryMap).then(response => {
              if (response.code == 200) {
                this.dialogVisible = false;
                this.categoryItem = {};
                this.$message({
                  message: '修改成功!',
                  type: 'success'
                })
              }
            })
          } else {
            add(this.categoryMap).then(response =>{
              if (response.code == 200){
                this.dialogVisible = false;
                this.categoryItem = {};
                this.$message({
                  message: '添加成功!',
                  type: 'success'
                });
              }
            })
          }
          this.fetchPage();
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
  .categoryItem {
    width: 100%;
    vertical-align: middle;
  }
  .itemClass{
    width: 100%;
    height: 100%;
    border-color: #409EFF;
  }
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
