<template>
  <div class="label right-container" ref="rightContainer">
    <page-header :page-title="$route.meta.title"></page-header>
    <div class="label-container clearFloat">
      <div class="sort fl">
        <div class="item-header">
          <span class="title">分类列表</span>
          <span class="add pointer fr" @click="showCategory(1)">新增分类</span>
        </div>
        <div class="item-wrapper">
          <el-tag closable :color="item.color" size="medium" :type="'danger'" v-for="item, index in  sorts"
                  :key="item._id" class="cursor" @click.native="dialogFormVisible = true; showDialog(item)"
                  @close="handleClose(item)">
            {{item.name}}
          </el-tag>
        </div>
      </div>
      <div class="tag fl">
        <div class="item-header">
          <span class="title">标签列表</span>
          <span class="add pointer fr" @click="showCategory(2)">新增列表</span>
        </div>
        <div class="item-wrapper">
          <el-tag closable :color="item.color" size="medium" :type="'danger'" v-for="item, index in  tags"
                  :key="item._id" @click.native="dialogFormVisible = true; showDialog(item)" @close="handleClose(item)">
            {{item.name}}
          </el-tag>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div class="add-sort-tag" v-show="show">
        <el-input v-model="tag.sortOrTagName" size="medium" :placeholder="placeholderName"></el-input>
        <div class="block">
          <span class="demonstration fl">选择{{category}}颜色</span>
          <el-color-picker v-model="tag.color"></el-color-picker>
        </div>
        <el-button type="success" size="medium" :disabled="!tag.sortOrTagName || !tag.color" @click="addOrUpdateTag(tag.isAddOrUpdate)">
          保存{{category}}
        </el-button>
      </div>
    </transition>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" class="updateTag" width="500px">
      <el-form>
        <el-form-item label="分类名称" label-width="100px">
          <el-input auto-complete="off" size="medium" v-model="updateTag.name"></el-input>
        </el-form-item>
        <el-form-item label="分类颜色" label-width="100px">
          <el-color-picker v-model="updateTag.color"></el-color-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false; addOrUpdateTag(updateTag.isAddOrUpdate)" :disabled="!updateTag.name || !updateTag.color">确
          定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import {marginMixin} from '../../common/js/mixin/setRightContainerMargin'
  import {stringify} from 'qs'
  import {ERR_OK, SUCCESS_CODE, ERROR_CODE} from '../../common/js/config'
  import PageHeader from '../../base/page-header/page-header.vue'
  const SORT = 1
  const TAG = 2
  export default {
    mixins: [marginMixin],
    data() {
      return {
        tag: {
          color: '#2f353b'
        },
        updateTag: {},
        show: false,
        category: '',
        placeholderName: '',
        tagList: [],
        dialogFormVisible: false,
      }
    },
    created() {
      this.queryTag()
      this.dialogTitle = ''
      this.dialogName = ''
      this.dialogColor = ''
    },
    methods: {
      showDialog(item) {
        this.updateTag = JSON.parse(JSON.stringify(item))
        this.updateTag.isAddOrUpdate = 'update'
        if (this.updateTag.category == SORT) {
          this.dialogTitle = '修改分类'
          this.dialogName = '分类名称'
          this.dialogColor = '分类颜色'
        } else {
          this.dialogTitle = '修改列表'
          this.dialogName = '列表名称'
          this.dialogColor = '列表颜色'
        }
      },
      showCategory(categoryName) {
        this.show = true
        if (categoryName === SORT) {
          this.category = '分类'
        } else {
          this.category = '列表'
        }
        this.placeholderName = `请输入${this.category}名称`
        this.tag.category = categoryName
        this.tag.isAddOrUpdate = 'add'
      },
      addOrUpdateTag(isAddOrUpdate) {
        let url = '/tag'
        if (isAddOrUpdate === 'add') {
          url += `/add?${stringify(this.tag)}`
        } else {
          url += `/update?${stringify(this.updateTag)}`
        }
        this.$ajax.get(url).then((response) => {
          if (ERR_OK === response.status) {
            if (response.data.statueCode === SUCCESS_CODE) {
              if (isAddOrUpdate === 'add') {
                this.show = false
                this.tag = {
                  color: '#2f353b'
                }
              } else {
                this.dialogFormVisible = false
              }
              this.queryTag()
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
              message: '新增失败',
              type: 'error',
              duration: 1000
            })
          }
        })
      },
      queryTag() {
        this.$ajax.get('/tag/select').then((response) => {
          if (ERR_OK === response.status) {
            if (response.data.statueCode === SUCCESS_CODE) {
              this.tagList = response.data.tagList
            }
          }
        })
      },
      deleteTag(id) {
        this.$ajax.get(`/tag/delete?id=${id}`).then((response) => {
          if (ERR_OK === response.status) {
            if (response.data.statueCode === SUCCESS_CODE) {
              this.queryTag()
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
              message: '删除失败',
              type: 'error',
              duration: 1000
            })
          }
        })
      },
      handleClose(item) {
        let titleName = ''
        if (item.category == SORT){
          titleName = '分类'
        } else {
          titleName = '列表'
        }
        this.$confirm(`确定要删除${item.name}${titleName}?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteTag(item._id)
        }).catch(() => {
        })
      }
    },
    computed: {
      sorts: function () {
        var self = this
        return self.tagList.filter(function (tag) {
          return tag.category == SORT
        })
      },
      tags: function () {
        var self = this
        return self.tagList.filter(function (tag) {
          return tag.category == TAG
        })
      }
    },
    components: {
      PageHeader
    }
  }
</script>

<style>
  .label-container .tag {
    width: 49%;
  }

  .label-container .add {
    padding: 15px 10px;
  }

  .label-container .sort .add:hover {
    background: #117ff1;
  }

  .label-container .tag .add:hover {
    background: #d20715;
  }

  .label-container .title {
    display: inline-block;
    padding: 15px 0;
  }

  .label-container .sort {
    width: 49%;
    margin-right: 2%;
  }

  .label-container .item-header {
    padding-left: 10px;
    color: #fff;
  }

  .label-container .sort .item-header {
    background: #409EFF
  }

  .label-container .tag .item-header {
    background: #e7505a
  }

  .label-container .item-wrapper, .add-sort-tag {
    padding: 15px;
    background: #fff;
    box-shadow: 2px 2px 4px 1px #ccc;
  }

  .label-container .el-tag {
    color: #fff;
  }

  .label-container .el-tag--medium {
    margin: 0 5px 5px 0;
    cursor: pointer;
  }

  .add-sort-tag {
    margin-top: 20px;
  }

  .add-sort-tag .el-input {
    width: 300px;
  }

  .add-sort-tag .block {
    margin: 10px 0;
  }

  .add-sort-tag .demonstration {
    line-height: 42px;
    margin-right: 10px;
  }

  .add-sort-tag .el-icon-arrow-down:before, .updateTag .el-icon-arrow-down:before {
    content: '';
  }

  .label-container .el-tag--danger .el-tag__close {
    color: #fff;
  }

  .updateTag .el-dialog__body {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    padding-bottom: 0;
  }

  .fade-enter-active, .fade-leave-active {
    transition: all .35s linear
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
