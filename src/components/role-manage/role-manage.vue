<template>
  <div>
    <page-query-header :placeholder="placeholder" :buttonName="buttonName" @query="query"
                       @add="updateOrAdd()"></page-query-header>
    <el-table
      :data="roleList"
      border
      stripe
      style="width: 100%">
      <el-table-column
        prop="name"
        label="角色名称"
        align="center">
      </el-table-column>
      <el-table-column
        prop="createdAt"
        label="创建时间"
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
          <el-button type="danger" icon="el-icon-delete" size="small"
                     @click="deleteRole(scope.row._id)">删除
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
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" class="updateOrAddRole" width="500px"
               :close-on-click-modal="false" @close="close">
      <el-form name="roleForm" :model="role" :rules="rules" ref="role" @submit.native.prevent>
        <el-form-item label="角色名称" label-width="100px" prop="name">
          <el-input size="medium" v-model="role.name" placeholder="角色名称"></el-input>
        </el-form-item>
        <el-form-item label="角色菜单" label-width="100px" prop="userRole">
          <el-tree
            ref="tree"
            :data="menuList"
            show-checkbox
            node-key="id"
            highlight-current
            :default-expanded-keys="expandedKeys"
            :default-checked-keys="role.roleId"
            :props="defaultProps">
          </el-tree>
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
  import PageQueryHeader from '../../base/page-query-header/page-query-header.vue'
  import {ERR_OK, SUCCESS_CODE, ERROR_CODE, PAGESIZE} from '../../common/js/config'
  import {queryAll, deleteOne, addOrUpdate} from '../../common/js/server'
  export default {
    data() {
      let validateUserRole = (rule, value, callback) => {
        if (this.role.permissionIds.length ===0) {
          callback(new Error('请至少选择一个菜单'))
        } else {
          callback();
        }
      }
      return {
        role: {},
        roleList: [],
        menuList: [],
        currentPage: 1,
        pageCount: 0,
        param: '',
        dialogFormVisible: false,
        rules: {
          name: [
            {required: true, message: '请输入用户名'}
          ],
          userRole: [
            {required: true, validator: validateUserRole}
          ]
        },
        defaultProps: {
          children: 'subMenu',
          label: 'name'
        },
        expandedKeys: []
      }
    },
    created() {
      this.dialogTitle = ''
      this.placeholder = '请输入角色名称'
      this.buttonName = '添加角色'
      this.pageSize = PAGESIZE
      this.queryRoles()
      this.queryPermission()
    },
    methods: {
      query(param) {
        this.currentPage = 1
        this.param = param
        this.queryRoles()
      },
      close() {
        this.$refs.tree.setCheckedKeys([]) //清空勾选
        this.$refs.role.resetFields()
      },
      updateOrAdd(id) {
        this.dialogFormVisible = true
        if (id) {
          this.dialogTitle = '修改角色'
          this.type = 'update'
          this.queryRole(id)
        } else {
          this.dialogTitle = '添加角色'
          this.type = 'add'
        }
      },
      queryRole(id) {
        let url = `/permission/queryOne?id=${id}`
        queryAll(url, this).then((response) => {
          if (response) {
            this.role = response.role
            this.$refs.tree.setCheckedKeys(this.role.roleId)
          }
        })
      },
      queryRoles() {
        if (!this.param) {
          this.param = ''
        }
        let url = `/permission/query?param=${this.param}&currentPage=${this.currentPage}&pageSize=${this.pageSize}`
        queryAll(url, this).then((response) => {
          if (response) {
            this.roleList = response.roleList
            this.pageCount = response.rows
          }
        })
      },
      queryPermission() {
        let url = '/permission/select'
        queryAll(url, this).then((response) => {
          if (response) {
            this.menuList = response.menuList
            this.menuList = this.menuFilter(this.menuList)
            console.log(this.menuList)
          }
        })
      },
      submit() {
        this.role.permissionIds = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())
        this.role.roleId = this.$refs.tree.getCheckedKeys(true) //只包含子节点，方便默认勾选角色菜单
        this.$refs.role.validate((valid) => {
          if (valid) {
            if (this.type === 'add') {
              this.url = '/permission/add'
            } else {
              this.url = '/permission/update'

            }
            this.data = this.role
            this.updateOrAddRole()
          } else {
            return false
          }
        })
      },
      updateOrAddRole() {
        addOrUpdate(this.url, this.data, this).then((response) => {
          if (response) {
            this.$refs.tree.setCheckedKeys([]) //清空勾选
            this.$refs.role.resetFields()
            this.dialogFormVisible = false
            this.queryRoles()
          }
        })
      },
      menuFilter(list) {
        let menu = []
        list.forEach((item) => {
          if (item.pid === 0) {
            this.expandedKeys.push(item.id)
            menu.push(item)
            list.forEach((i) => {
              if (item._id === i.pid) {
                if (!item.subMenu) {
                  item.subMenu = []
                }
                item.subMenu.push(i)
              }
            })
          }
        })
        return menu
      },
      deleteRole(id) {
        let url = `/permission/delete?id=${id}`
        let title = '此操作将永久删除该角色, 是否继续?'
        deleteOne(url, title, this).then((response) => {
          if (response) {
            this.queryRoles()
          }
        })
      }
    },
    components: {
      PageQueryHeader
    }
  }
</script>

<style>

</style>
