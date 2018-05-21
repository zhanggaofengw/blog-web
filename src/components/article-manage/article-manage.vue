<template>
  <div class="article right-container" ref="rightContainer">
    <page-header :page-title="$route.meta.title"></page-header>
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
        prop=""
        label="浏览量">
      </el-table-column>
      <el-table-column
        prop="tagAndSort"
        label="所属分类">
        <template slot-scope="scope">
          <span v-for="item, index in scope.row.tagAndSort" :key="item._id"
                v-if="item.category == 1">{{item.name}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="tagAndSort"
        label="所属标签">
        <template slot-scope="scope">
          <span v-for="item, index in scope.row.tagAndSort" :key="item._id"
                v-if="item.category == 2">{{item.name}}</span>
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
        label="操作"
        width="300"
        align="center"
      >
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="small">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" size="small">删除</el-button>
          <el-button type="warning" icon="el-icon-search" size="small">预览</el-button>
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
      }
    },
    components: {
      PageHeader
    }
  }
</script>

<style>

</style>
