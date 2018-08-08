<template>
  <div>
    <el-col :sm="4" :xs="24">
      <page-header :page-title="$route.name"></page-header>
    </el-col>
    <el-col :sm="{span:16, offset:4}" :xs="24">
      <div class="query">
        <el-input :placeholder="placeholder" v-model="param" class="input-with-select" size="medium">
          <el-button slot="append" icon="el-icon-search" @click="query()"></el-button>
        </el-input>
      </div>
    </el-col>
    <el-button type="primary" size="small" class="fr addBtn" @click="add()">{{buttonName}}</el-button>
  </div>
</template>

<script type="text/ecmascript-6">
  import PageHeader from '../../base/page-header/page-header.vue'
  export default{
    data() {
      return {
        param: ''
      }
    },
    props: {
      placeholder: String,
      buttonName: String
    },
    methods: {
      query() {
        this.$emit('query', this.param)
      },
      add() {
        this.$emit('add', this.param)
      }
    },
    components: {
      PageHeader
    }
  }
</script>

<style>
  button.addBtn {
    margin: 10px 0;
  }
</style>
