<template>
  <div class="userManage right-container" ref="rightContainer">
    <page-query-header :placeholder="placeholder" :buttonName="buttonName" @query="query"
                       @add="updateOrAdd()"></page-query-header>
    <el-table
      :data="userList"
      border
      stripe
      style="width: 100%">
      <el-table-column
        prop="name"
        label="用户名"
        align="center">
      </el-table-column>
      <el-table-column
        prop="loginCount"
        label="登录次数"
        align="center">
      </el-table-column>
      <el-table-column
        prop="lastVisit"
        label="上次登录时间"
        min-width="145"
        align="center">
      </el-table-column>
      <el-table-column
        prop="_id"
        label="操作"
        width="300"
        align="center">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="small" @click="updateOrAdd(scope.row._id)">修改</el-button>
          <el-button type="primary" icon="el-icon-refresh" size="small" @click="resetPassword(scope.row._id)">重置密码
          </el-button>
          <el-button type="danger" icon="el-icon-delete" size="small"
                     @click="deleteUser(scope.row._id)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :pageSize=pageSize
      :total=pageCount
      :currentPage=currentPage
      @current-change="handleCurrentChange"
      v-if="pageCount>0&&pageCount>pageSize"
    >
    </el-pagination>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" class="updateOrAddUser" width="500px"
               :close-on-click-modal="false" @close="close">
      <el-form name="userForm" :model="user" :rules="rules" ref="user">
        <el-form-item label="用户名" label-width="100px" prop="name">
          <el-input size="medium" v-model="user.name" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item label="设置密码" label-width="100px" prop="password" v-show="type === 'add'">
          <el-input auto-complete="off" type="password" size="medium" v-model="user.password"
                    placeholder="请输入6-20位且含有数字和字母的密码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit()">确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import {marginMixin} from '../../common/js/mixin/setRightContainerMargin'
  import PageQueryHeader from '../../base/page-query-header/page-query-header.vue'
  import {ERR_OK, SUCCESS_CODE, ERROR_CODE, PAGESIZE} from '../../common/js/config'
  import {queryAll, deleteOne, addOrUpdate} from '../../common/js/server'
  import crypto from 'crypto'
  import {stringify} from 'qs'
  export default {
    mixins: [marginMixin],
    data() {
      let validatePassword = (rule, value, callback) => {
        if (this.type === 'add') {
          let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
          if (!value) {
            callback(new Error('请输入密码'))
          } else if (value.length <= 5 || value.length >= 19) {
            callback(new Error('请输入6-20位的密码'))
          } else if (!reg.test(value)) {
            callback(new Error('密码必须同时含有数字和字母'))
          } else {
            callback();
          }
        } else {
          callback();
        }
      }
      return {
        userList: [],
        user: {},
        currentPage: 1,
        pageCount: 0,
        param: '',
        dialogFormVisible: false,
        type: '',
        rules: {
          name: [
            {required: true, message: '请输入用户名'}
          ],
          password: [
            {required: true, validator: validatePassword}
          ]
        }
      }
    },
    created() {
      this.dialogTitle = ''
      this.placeholder = '请输入用户名'
      this.buttonName = '添加用户'
      this.pageSize = PAGESIZE
      this.queryUsers()
    },
    methods: {
      query(param) {
        this.currentPage = 1
        this.param = param
        this.queryUsers()
      },
      updateOrAdd(id) {
        this.dialogFormVisible = true
        if (id) {
          this.dialogTitle = '修改用户'
          this.type = 'update'
          this.queryUser(id)
        } else {
          this.dialogTitle = '添加用户'
          this.type = 'add'
        }
      },
      submit() {
        this.$refs.user.validate((valid) => {
          if (valid) {
            if (this.type === 'add') {
              let md5 = crypto.createHash('md5')
              let password = md5.update(this.user.password).digest('hex')
              this.url = '/user/add'
              this.data = {
                name: this.user.name,
                password: password
              }
            } else {
              this.url = '/user/update'
              this.data = {
                name: this.user.name,
                id: this.user._id
              }
            }
            this.updateOrAddUser()
          } else {
            return false
          }
        })
      },
      close() {
        this.$refs.user.resetFields()
      },
      updateOrAddUser() {
        addOrUpdate(this.url, this.data, this).then((response) => {
          if (response) {
            this.$refs.user.resetFields()
            this.dialogFormVisible = false
            this.queryUsers()
          }
        })
      },
      queryUser(id) {
        let url = `/user/queryOne?id=${id}`
        queryAll(url, this).then((response) => {
          if (response) {
            this.user = response.user
            console.log(this.user)
          }
        })
      },
      queryUsers() {
        if (!this.param) {
          this.param = ''
        }
        let url = `/user/query?param=${this.param}&currentPage=${this.currentPage}&pageSize=${this.pageSize}`
        queryAll(url, this).then((response) => {
          if (response) {
            this.userList = response.userList
            this.pageCount = response.rows
          }
        })
      },
      deleteUser(id) {
        let url = `/user/delete?id=${id}`
        let title = '此操作将永久删除该用户, 是否继续?'
        deleteOne(url, title, this).then((response) => {
          if (response) {
            this.queryUsers()
          }
        })
      },
      handleCurrentChange(page) {
        this.currentPage = page
        this.queryUsers()
      },
      resetPassword(id) {
        this.$confirm('将该用户的密码重置为123456a?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let password = '123456a'
          let md5 = crypto.createHash('md5')
          password = md5.update(password).digest('hex')
          this.$ajax.get(`/user/resetPassword?id=${id}&password=${password}`).then((response) => {
            if (ERR_OK === response.status) {
              if (response.data.statueCode === SUCCESS_CODE) {
                this.queryUsers()
                this.$message({
                  message: response.data.msg,
                  type: 'success',
                  duration: 1000
                })
              } else if (response.data.statueCode === ERROR_CODE) {
                this.$message({
                  message: response.data.msg,
                  type: 'error',
                  duration: 1000
                })
              }
            } else {
              this.$message({
                message: '重置失败',
                type: 'error',
                duration: 1000
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消重置'
          });
        });
      }
    },
    components: {
      PageQueryHeader
    }
  }

</script>

<style>

</style>
