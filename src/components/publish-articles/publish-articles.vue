<template>
  <div class="publish-article right-container" ref="rightContainer">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/articleManage' }">文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <form name="articleForm"></form>
    <div class="article-title">
      <el-input v-model="article.articleTitle" placeholder="请输入文章标题"></el-input>
      <div class="article-sort">
        <el-select v-model="sortsValue" multiple filterable placeholder="请选择文章分类" value-key="name">
          <el-option
            v-for="item in sorts"
            :key="item._id"
            :label="item.name"
            :value="item"
            :disabled="item.disabled">
          </el-option>
        </el-select>
        <el-button type="primary" @click="changeSortsOrTags(1)" :disabled="!sortsValue.length">确定</el-button>
        <div>
          <el-tag closable :color="item.color" size="medium" :type="'danger'"
                  v-for="item, index in  article.articleSorts"
                  :key="item._id" @click.native="" @close="handleClose(item._id,index,1)" class="publish-article-sort">
            {{item.name}}
          </el-tag>
        </div>
      </div>
      <div class="article-tag">
        <el-select v-model="tagsValue" multiple filterable placeholder="请选择文章标签" value-key="name">
          <el-option
            v-for="item in tags"
            :key="item._id"
            :label="item.name"
            :value="item"
            :disabled="item.disabled">
          </el-option>
        </el-select>
        <el-button type="primary" @click="changeSortsOrTags(2)" :disabled="!tagsValue.length">确定</el-button>
        <div>
          <el-tag closable :color="item.color" size="medium" :type="'danger'"
                  v-for="item, index in  article.articleTags"
                  :key="item._id" @click.native="" @close="handleClose(item._id,index,2)" class="publish-article-sort">
            {{item.name}}
          </el-tag>
        </div>
      </div>
    </div>
    <div class="article">
      <div ref="editor" style="text-align:left"></div>
    </div>
    <div class="article-footer">
      <div class="control">
        <el-switch
          v-model="comment"
          active-text="开启评论"
          inactive-text="关闭评论">
        </el-switch>
      </div>
      <div class="article-footer-r fr">
        <el-button size="small" @click="back()">返回列表</el-button>
        <el-button type="primary" size="small" @click="submit(save)"
                   :disabled="article.articleTags.length===0||article.articleSorts.length===0||!editorContent||!article.articleTitle">
          保存文章
        </el-button>
        <el-button type="warning" size="small" @click="submit(draft)">
          存为草稿
        </el-button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {marginMixin} from '../../common/js/mixin/setRightContainerMargin'
  import {ERR_OK, SUCCESS_CODE, ERROR_CODE} from '../../common/js/config'
  import {stringify} from 'qs'
  import E from 'wangeditor'
  const SORT = 1
  const TAG = 2
  const DRAFT = 0 //存为草稿
  const SAVE = 1 //保存
  export default {
    mixins: [marginMixin],
    data() {
      return {
        article: {
          articleTags: [],
          articleSorts: []
        },
        sortsValue: [],
        tagsValue: [],
        tagList: [],
        comment: true,
        editorContent: ''
      }
    },
    created() {
      this.queryTag()
      this.save = SAVE
      this.draft = DRAFT
      if (this.$route.params.addOrUpdate === 'add') {
        this.title = '添加文章'
        this.url = '/article/add'
      } else {
        this.title = '编辑文章'
        this.url = '/article/update'
        this.$nextTick(() => {
          this.queryArticle(this.$route.params.id)
        })
      }

    },
    methods: {
      submit(type) {
        this.article.type = type
        this.article.content = this.editorContent
        //1、开启评论  0、关闭评论
        this.comment ? this.article.comment = 1 : this.article.comment = 0
        this.addOrUpdateArticle()
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
      queryArticle(id) {
        this.$ajax.get(`/article/query?id=${id}`).then((response) => {
          if (ERR_OK === response.status) {
            if (response.data.statueCode === SUCCESS_CODE) {
              this.article = response.data.articleList[0]
              this.changeDisabled(this.article.articleSorts, this.sorts)
              this.changeDisabled(this.article.articleTags, this.tags)
              this.editor.txt.html(this.article.articleContent)
              this.editorContent = this.article.articleContent
              this.article.articleComment === 1 ? this.comment = true : this.comment = false
            }
          }
        })
      },
      addOrUpdateArticle() {
        this.$ajax.post(this.url, this.article).then((response) => {
          if (ERR_OK === response.status) {
            if (response.data.statueCode === SUCCESS_CODE) {
              this.$message({
                message: response.data.msg,
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.$router.push('/articleManage')
                }
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
              message: '添加文章失败',
              type: 'error',
              duration: 1000
            })
          }
        })
      },
      changeSortsOrTags(type) {
        if (SORT === type) {
          this.article.articleSorts = this.article.articleSorts.concat(this.sortsValue)
          this.changeDisabled(this.article.articleSorts, this.sorts)
          this.sortsValue = []
        } else {
          this.article.articleTags = this.article.articleTags.concat(this.tagsValue)
          this.changeDisabled(this.article.articleTags, this.tags)
          this.tagsValue = []
        }
      },
      changeDisabled(arr, list) {
        list.forEach(function (item) {
          arr.forEach(function (sort) {
            if (item._id === sort._id) {
              item.disabled = true
              return
            }
          })
        })
      },
      handleClose(id, index, type) {
        let arr = []
        if (SORT === type) {
          this.article.articleSorts.splice(index, 1)
          arr = this.sorts
        } else {
          this.article.articleTags.splice(index, 1)
          arr = this.tags
        }
        arr.forEach(function (item) {
          if (item._id === id) {
            item.disabled = false
            return
          }
        })
      },
      back() {
        this.$router.push('/articleManage')
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
    mounted() {
      this.editor = new E(this.$refs.editor)
      this.editor.customConfig.onchange = (html) => {
        this.editorContent = html
      }
      this.editor.customConfig.zIndex = 100
      this.editor.customConfig.uploadImgServer = `http:${process.env.BASE_URL}/uploadImg`
      this.editor.customConfig.uploadFileName = 'uploadImg'
      this.editor.create()
    }
  }
</script>

<style>
  .el-breadcrumb {
    padding: 10px 0;
  }

  .publish-article-sort.el-tag {
    margin: 12px 5px 0 0;
  }

  .publish-article-sort.el-tag, .publish-article-sort.el-tag--danger .el-tag__close {
    color: #fff;
  }

  .article-tag, .article-sort {
    margin: 10px 0;
  }

  .article-tag .el-input__inner, .article-sort .el-input__inner {
    width: 300px;
  }

  .article-footer {
    margin: 10px 0;
  }
</style>
