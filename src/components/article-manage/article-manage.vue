<template>
  <div class="article right-container" ref="rightContainer">
    <page-header :page-title="$route.meta.title"></page-header>
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
  </div>
</template>

<script type="text/ecmascript-6">
  import {marginMixin} from '../../common/js/mixin/setRightContainerMargin'
  import PageHeader from '../../base/page-header/page-header.vue'
  import {ERR_OK, SUCCESS_CODE} from '../../common/js/config'
  const SORT = 1
  const TAG = 2
  export default {
    mixins: [marginMixin],
    data() {
      return {
        articleList: []
      }
    },
    created () {
      this.queryArticleList()
    },
    methods: {
      queryArticleList() {
        this.$ajax.get('/article/query').then((response) => {
          if (ERR_OK === response.status) {
            if (response.data.statueCode === SUCCESS_CODE) {
              this.articleList = response.data.articleList
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
      }
    },
    components: {
      PageHeader
    }
  }
</script>

<style>
  .addArticle {
    margin-top: -36px;
  }

  .el-table__body .sort, .el-table__body .tag {
    padding-right: 5px;
  }
</style>
