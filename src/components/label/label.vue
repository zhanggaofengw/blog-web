<template>
  <div class="label right-container" ref="rightContainer">
    <page-header :page-title="$route.meta.title"></page-header>
    <div class="label-container clearFloat">
      <div class="sort fl">
        <div class="item-header">
          <span class="title">分类列表</span>
          <span class="add pointer fr">新增分类</span>
        </div>
        <div class="item-wrapper">
          <el-tag closable color="#2f353b" size="medium" :type="'danger'">
            默认分类
          </el-tag>
          <el-tag closable color="#2f353b" size="medium" :type="'danger'">
            默认分类
          </el-tag>
          <el-tag closable color="#2f353b" size="medium" :type="'danger'">
            默认分类
          </el-tag>
          <el-tag closable color="#2f353b" size="medium" :type="'danger'">
            默认分类
          </el-tag>
          <el-tag closable color="#2f353b" size="medium" :type="'danger'">
            默认分类
          </el-tag>
          <el-tag closable color="#2f353b" size="medium" :type="'danger'">
            默认分类
          </el-tag>
          <el-tag closable color="#2f353b" size="medium" :type="'danger'">
            默认分类
          </el-tag>
          <el-tag closable color="#2f353b" size="medium" :type="'danger'">
            默认分类
          </el-tag>

        </div>
      </div>
      <div class="tag fl">
        <div class="item-header">
          <span class="title">标签列表</span>
          <span class="add pointer fr">新增列表</span>
        </div>
        <div class="item-wrapper">
          <el-tag closable color="#2f353b" size="medium" :type="'danger'">
            默认分类
          </el-tag>
          <el-tag closable color="#2f353b" size="medium" :type="'danger'">
            默认分类
          </el-tag>
          <el-tag closable color="#2f353b" size="medium" :type="'danger'">
            默认分类
          </el-tag>
          <el-tag closable color="#2f353b" size="medium" :type="'danger'">
            默认分类
          </el-tag>
          <el-tag closable color="#2f353b" size="medium" :type="'danger'">
            默认分类
          </el-tag>
          <el-tag closable color="#2f353b" size="medium" :type="'danger'">
            默认分类
          </el-tag>
          <el-tag closable color="#2f353b" size="medium" :type="'danger'">
            默认分类
          </el-tag>
          <el-tag closable color="#2f353b" size="medium" :type="'danger'">
            默认分类
          </el-tag>

        </div>
      </div>
    </div>
    <div class="add-sort-tag">
      <el-input v-model="input" size="medium" placeholder="请输入分类名称"></el-input>
      <div class="block">
        <span class="demonstration fl">选择分类颜色</span>
        <el-color-picker v-model="color"></el-color-picker>
      </div>
      <el-button type="success" size="medium">保存分类</el-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {marginMixin} from '../../common/js/mixin/setRightContainerMargin'
  import PageHeader from '../../base/page-header/page-header.vue'
  export default {
    mixins: [marginMixin],
    data() {
      return {
        input: '',
        color: '#2f353b'
      }
    },
    methods: {},
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
    margin-bottom: 5px;
  }

  .add-sort-tag{
    margin-top: 20px;
  }
  .add-sort-tag .el-input{
    width: 300px;
  }
  .add-sort-tag .block{
    margin: 10px 0;
  }
  .add-sort-tag .demonstration{
    line-height: 42px;
    margin-right: 10px;
  }
</style>
