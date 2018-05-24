<template>
  <div class="article right-container" ref="rightContainer">
    <page-query-header :placeholder="placeholder" :buttonName="buttonName"
                       @query="query" @add="addArticle"></page-query-header>
    <el-table
      :data="articleList"
      border
      stripe
      style="width: 100%">
      <el-table-column
        prop="articleTitle"
        label="文章标题">
      </el-table-column>
      <el-table-column
        prop="createdAt"
        label="发布时间"
        min-width="145"
      >
      </el-table-column>
      <el-table-column
        prop="pageViews"
        label="浏览量">
      </el-table-column>
      <el-table-column
        prop="articleSorts"
        label="所属分类"
        align="center">
        <template slot-scope="scope">
          <span class="sort" v-for="item, index in scope.row.articleSorts"
                :key="item._id">{{item.name}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="articleTags"
        label="所属标签"
        align="center">
        <template slot-scope="scope">
          <span class="tag" v-for="item, index in scope.row.articleTags" :key="item._id">{{item.name}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="articleType"
        label="发布状态"
        align="center">
        <template slot-scope="scope">
          <el-button type="success" size="small" v-if="scope.row.articleType==1">已发布</el-button>
          <el-button type="info" size="small" v-if="scope.row.articleType==0">草稿</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="articleContent, articleTitle, _id"
        label="操作"
        width="300"
        align="center"
      >
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="small" @click="edit(scope.row._id)">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" size="small" @click="deleteArticle(scope.row._id)">删除
          </el-button>
          <el-button type="warning" icon="el-icon-search" size="small"
                     @click="preview(scope.row.articleContent, scope.row.articleTitle)">预览
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
  </div>
</template>

<script type="text/ecmascript-6">
  import {marginMixin} from '../../common/js/mixin/setRightContainerMargin'
  import PageQueryHeader from '../../base/page-query-header/page-query-header.vue'
  import {PAGESIZE} from '../../common/js/config'
  import {queryAll, deleteOne} from '../../common/js/server'
  const SORT = 1
  const TAG = 2
  export default {
    mixins: [marginMixin],
    data() {
      return {
        articleList: [],
        currentPage: 1,
        pageCount: 0,
        param: ''
      }
    },
    created () {
      this.placeholder = '请输入文章标题'
      this.buttonName = '添加文章'
      this.pageSize = PAGESIZE
      this.queryArticleList()
    },
    methods: {
      query(param) {
        this.currentPage = 1
        this.param = param
        this.queryArticleList()
      },
      queryArticleList() {
        if (!this.param) {
          this.param = ''
        }
        let url = `/article/query?param=${this.param}&currentPage=${this.currentPage}&pageSize=${this.pageSize}`
        queryAll(url, this).then((response) => {
          if (response) {
            this.articleList = response.articleList
            this.pageCount = response.rows
          }
        })
      },
      preview(articleContent, articleTitle) {
        this.$alert(articleContent, articleTitle, {
          customClass: 'previewBox',
          dangerouslyUseHTMLString: true
        })
      },
      deleteArticle(id) {
        let url = `/article/delete?id=${id}`
        let title = '此操作将永久删除该文章, 是否继续?'
        deleteOne(url, title, this).then((response) => {
          if (response) {
            this.queryArticleList()
          }
        })
      },
      addArticle() {
        this.$router.push('/publishArticles/add/null')
      },
      edit(id) {
        this.$router.push(`/publishArticles/update/${id}`)
      },
      handleCurrentChange(page) {
        this.currentPage = page
        this.queryArticleList()
      }
    },
    components: {
      PageQueryHeader
    }
  }
</script>

<style>

  .previewBox.el-message-box {
    width: 80%;
    min-width: 420px;
  }

  .el-table__body .sort, .el-table__body .tag {
    padding-right: 5px;
  }

  .article .el-pagination.is-background .btn-next, .article .el-pagination.is-background .btn-prev, .article .el-pagination.is-background .el-pager li {
    background: #fff;
  }
</style>
