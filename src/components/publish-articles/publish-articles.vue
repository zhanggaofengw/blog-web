<template>
  <div class="publish-articles right-container" ref="rightContainer">
    <page-header :page-title="$route.meta.title"></page-header>
    <div class="articles-title">
      <el-input v-model="articlesTitle" placeholder="请输入文章标题"></el-input>
      <div class="articles-sort">
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
          <el-tag closable :color="item.color" size="medium" :type="'danger'" v-for="item, index in  articlesSorts"
                  :key="item._id" @click.native="" @close="handleClose(item._id,index,1)" class="publish-articles-sort">
            {{item.name}}
          </el-tag>
        </div>
      </div>
      <div class="articles-tag">
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
          <el-tag closable :color="item.color" size="medium" :type="'danger'" v-for="item, index in  articlesTags"
                  :key="item._id" @click.native="" @close="handleClose(item._id,index,2)" class="publish-articles-sort">
            {{item.name}}
          </el-tag>
        </div>
      </div>
    </div>
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
        articlesTitle: '',
        sortsValue: [],
        articlesSorts: [],
        tagsValue: [],
        articlesTags: [],
        tagList: []
      }
    },
    created() {
      this.queryTag()
    },
    methods: {
      queryTag() {
        this.$ajax.get('/tag/select').then((response) => {
          if (ERR_OK === response.status) {
            if (response.data.statueCode === SUCCESS_CODE) {
              this.tagList = response.data.tagList
            }
          }
        })
      },
      changeSortsOrTags(type) {
        if (SORT === type) {
          this.articlesSorts = this.articlesSorts.concat(this.sortsValue)
          this.changeDisabled(this.articlesSorts, this.sorts)
          this.sortsValue = []
        } else {
          this.articlesTags = this.articlesTags.concat(this.tagsValue)
          this.changeDisabled(this.articlesTags, this.tags)
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
          this.articlesSorts.splice(index, 1)
          arr = this.sorts
        } else {
          this.articlesTags.splice(index, 1)
          arr = this.tags
        }
        arr.forEach(function (item) {
          if (item._id === id) {
            item.disabled = false
            return
          }
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
  .publish-articles-sort.el-tag {
    margin: 12px 5px 0 0;
  }

  .publish-articles-sort.el-tag, .publish-articles-sort.el-tag--danger .el-tag__close {
    color: #fff;
  }

  .articles-tag, .articles-sort {
    margin: 10px 0;
  }

  .articles-tag .el-input__inner, .articles-sort .el-input__inner {
    width: 300px;
  }
</style>
