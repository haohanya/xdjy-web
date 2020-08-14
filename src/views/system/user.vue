<template>
  <div class="app-container">

    <!-- 搜索表单 -->
    <el-form ref="elForm" :model="searchData" :rules="rules" size="medium" label-width="100px">
      <el-row>
        <el-col :span="7">
          <el-row>
            <el-form-item label="真实姓名" prop="name">
              <el-input v-model="searchData.name" placeholder="请输入真实姓名" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
          </el-row>
        </el-col>
        <el-col :span="7">
          <el-row>
            <el-form-item label="性别" prop="sex">
              <el-select v-model="searchData.sex" placeholder="请选择性别" clearable :style="{width: '100%'}">
                <el-option v-for="(item, index) in sexOptions" :key="index" :label="item.label"
                           :value="item.value" :disabled="item.disabled"></el-option>
              </el-select>
            </el-form-item>
          </el-row>
        </el-col>
        <el-col :span="7">
          <el-row>
            <el-form-item label="状态" prop="status">
              <el-select v-model="searchData.status" placeholder="请选择状态" clearable :style="{width: '100%'}">
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
        <el-button @click="dialogVisible = true">新增</el-button>
      </el-form-item>
    </el-form>

    <!-- 数据列表 -->

    <el-table
      :data="rows"
      style="width: 100%">
      <el-table-column
        prop="username"
        label="用户名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="真实姓名"
        width="180">
      </el-table-column>
      <el-table-column
        label="性别">
        <template slot-scope="scope">
          {{scope.row.status == 0 ? '男' : '女' }}
        </template>
      </el-table-column>
      <el-table-column
        label="用户状态">
        <template slot-scope="scope">
          {{scope.row.status == 0 ? '不可用' : '正常' }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button @click="handleEditRow(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="handleDelRow(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total">
    </el-pagination>

    <!-- 表单弹窗 -->
    <el-dialog v-bind="$attrs" :visible.sync="dialogVisible" v-on="$listeners" @open="onOpen" @close="onClose" title="用户编辑">
      <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
        <el-form-item label="用户账名" prop="username">
          <el-input v-model="formData.username" placeholder="请输入用户账名" clearable :style="{width: '100%'}">
          </el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formData.password" placeholder="请输入密码" clearable :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="formData.phone" placeholder="请输入手机号" clearable :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="formData.email" placeholder="请输入邮箱" clearable :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="name">
          <el-input v-model="formData.name" placeholder="请输入真实姓名" clearable :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickName">
          <el-input v-model="formData.nickName" placeholder="请输入昵称" clearable :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="QQ" prop="qq">
          <el-input v-model="formData.qq" placeholder="请输入QQ" clearable :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="idNumber">
          <el-input v-model="formData.idNumber" placeholder="请输入身份证号" clearable :style="{width: '100%'}">
          </el-input>
        </el-form-item>
        <el-form-item label="用户状态" prop="status" required>
          <el-switch v-model="formData.status" active-text="启用" inactive-text="禁用" :active-value='1'
                     :inactive-value='0'></el-switch>
        </el-form-item>
        <el-form-item label="性别" prop="sex" required>
          <el-switch v-model="formData.sex" active-text="男" inactive-text="女" :active-value='0'
                     :inactive-value='1'></el-switch>
        </el-form-item>
        <el-form-item label="身份证图片" prop="idNumberImg" required>
          <el-upload ref="idNumberImg" :file-list="idNumberImgfileList" :action="idNumberImgAction"
                     :before-upload="idNumberImgBeforeUpload" list-type="picture-card" accept="image/*" name="idNumberImg">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="证件照" prop="idPhoto" required>
          <el-upload ref="idPhoto" :file-list="idPhotofileList" :action="idPhotoAction"
                     :before-upload="idPhotoBeforeUpload" list-type="picture-card" accept="image/*">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="展示头像" prop="headImg" required>
          <el-upload ref="headImg" :file-list="headImgfileList" :action="headImgAction"
                     :before-upload="headImgBeforeUpload" list-type="picture-card" accept="image/*">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="handelConfirm">确定</el-button>
      </div>
    </el-dialog>

    <!-- 表单弹窗end -->
  </div>
</template>

<script>
import { getList, findUserById } from '@/api/system/user'

export default {
  data() {
    return {
      rows: [],
      // 增删改表单数据
      formData: {
        username: undefined,
        password: undefined,
        phone: undefined,
        email: undefined,
        name: undefined,
        nickName: undefined,
        qq: undefined,
        idNumber: undefined,
        status: 0,
        sex: 0,
        idNumberImg: undefined,
        idPhoto: undefined,
        headImg: undefined
      },
      // 搜索表单
      searchData: {
        name: undefined,
        sex: undefined,
        status: undefined
      },
      rules: {
        username: [{
          required: true,
          message: '请输入用户账名',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }],
        phone: [{
          required: true,
          message: '请输入手机号',
          trigger: 'blur'
        }],
        email: [{
          required: true,
          message: '请输入邮箱',
          trigger: 'blur'
        }],
        name: [{
          required: true,
          message: '请输入真实姓名',
          trigger: 'blur'
        }],
        nickName: [{
          required: true,
          message: '请输入昵称',
          trigger: 'blur'
        }],
        qq: [{
          required: true,
          message: '请输入QQ',
          trigger: 'blur'
        }],
        idNumber: [{
          required: true,
          message: '请输入身份证号',
          trigger: 'blur'
        }]
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
      total: 0,
      // 图片上传接口
      idNumberImgAction: 'https://jsonplacehol/der.typicode.com/posts/',
      idNumberImgfileList: [],
      idPhotoAction: 'https://jsonplaceholder.typicode.com/posts/',
      idPhotofileList: [],
      headImgAction: 'https://jsonplaceholder.typicode.com/posts/',
      headImgfileList: [],
      dialogVisible: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    /* 搜索表单 */
    submitForm() {
      this.fetchData()
    },
    // 重置搜索表单
    resetForm() {
      this.$refs['elForm'].resetFields()
    },
    /**
     * 分页查询
     */
    fetchData() {
      getList({ size: 10, curr: 1, data: this.searchData }).then(response => {
        console.log(response)
        this.rows = response.data.rows
        this.total = response.data.total
      })
    },
    /**
     * 删除当前行
     * @param row 行信息
     */
    handleDelRow(row) {
      console.log(row)
    },
    /**
     * 编辑当前行
     * @param row
     */
    handleEditRow(row) {
      this.onOpen()
      findUserById(row.id).then(response => {
        this.formData = response.data
      })
    },
    /* 表单弹出 */
    onOpen() {
      this.dialogVisible = true
    },
    onClose() {
      this.dialogVisible = false
      this.$refs['elForm'].resetFields()
    },
    close() {
      this.$emit('update:visible', false)
    },
    handelConfirm() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        this.close()
      })
    },
    idNumberImgBeforeUpload(file) {
      let isAccept = new RegExp('image/*').test(file.type)
      if (!isAccept) {
        this.$message.error('应该选择image/*类型的文件')
      }
      return isAccept
    },
    idPhotoBeforeUpload(file) {
      let isAccept = new RegExp('image/*').test(file.type)
      if (!isAccept) {
        this.$message.error('应该选择image/*类型的文件')
      }
      return isAccept
    },
    headImgBeforeUpload(file) {
      let isAccept = new RegExp('image/*').test(file.type)
      if (!isAccept) {
        this.$message.error('应该选择image/*类型的文件')
      }
      return isAccept
    }
    /* 表单弹出end */
  }
}
</script>
