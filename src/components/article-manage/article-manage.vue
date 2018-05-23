<template>
  <div class="article right-container" ref="rightContainer">
    <el-col :sm="4" :xs="24">
      <page-header :page-title="$route.meta.title"></page-header>
    </el-col>
    <el-col :sm="{span:16, offset:4}" :xs="24">
      <div class="queryArticle">
        <el-input placeholder="请输入文章标题" v-model="param" class="input-with-select" size="medium">
          <el-button slot="append" icon="el-icon-search" @click="currentPage=1;queryArticleList()"></el-button>
        </el-input>
      </div>
    </el-col>
    <el-button type="primary" size="small" class="fr addArticle" @click="addArticle()">添加文章</el-button>
    <div>
    </div>
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
          <el-button type="danger" icon="el-icon-delete" size="small">删除</el-button>
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
  import PageHeader from '../../base/page-header/page-header.vue'
  import {ERR_OK, SUCCESS_CODE, PAGESIZE} from '../../common/js/config'
  const SORT = 1
  const TAG = 2
  export default {
    mixins: [marginMixin],
    data() {
      return {
        articleList: [],
        param: '',
        currentPage: 1,
        pageCount: 0
      }
    },
    created () {
      this.pageSize = PAGESIZE
      this.queryArticleList()
    },
    methods: {
      queryArticleList() {
        this.$ajax.get(`/article/query?param=${this.param}&currentPage=${this.currentPage}&pageSize=${this.pageSize}`).then((response) => {
          if (ERR_OK === response.status) {
            if (response.data.statueCode === SUCCESS_CODE) {
              this.articleList = response.data.articleList
              this.pageCount = response.data.rows
              console.log(this.articleList)
            }
          }
        })
      },
      preview(articleContent, articleTitle) {
        this.$alert(articleContent, articleTitle, {
          dangerouslyUseHTMLString: true
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
      PageHeader
    }
  }
</script>

<style>
  .addArticle {
    margin: 10px 0;
  }

  .el-message-box {
    width: 80%;
    min-width: 420px;
  }

  .el-pagination {
    margin-top: 10px;
    text-align: right;
  }

  .el-table__body .sort, .el-table__body .tag {
    padding-right: 5px;
  }

  .article .el-pagination.is-background .btn-next, .article .el-pagination.is-background .btn-prev, .article .el-pagination.is-background .el-pager li {
    background: #fff;
  }
</style>
