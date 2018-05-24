<template>
  <div class="left-menu">
    <el-menu class="el-menu-vertical-demo" :collapse="collapse"
             :default-active="defaultActive" :router="true"
             background-color="#303133" text-color="#ffffff">
      <el-menu-item :index="'/articleManage'">
        <span slot="title">文章管理</span>
      </el-menu-item>
      <el-menu-item :index="'/label'">
        <span slot="title">分类/标签</span>
      </el-menu-item>
      <el-submenu index="5">
        <template slot="title">
          <span slot="title">系统管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item :index="'/userManage'">用户管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapMutations} from 'vuex'
  export default {
    data() {
      return {
        w: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        flag: false
      }
    },
    mounted() {
      const that = this
      window.onresize = () => {
        return (() => {
          that.w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
        })()
      }
    },
    created() {
      if (this.w <= 992) {
        this.setCollapse(true)
      } else {
        this.setCollapse(false)
      }
    },
    methods: {
      ...mapMutations({
        setCollapse: 'SET_COLLAPSE'
      })
    },
    computed: {
      ...mapGetters([
        'collapse'
      ]),
      defaultActive () {
        return this.$route.path.lastIndexOf('/') === 0 ? this.$route.path : this.$route.meta.activeMenu
      }
    },
    watch: {
      collapse() {
        if ((this.w <= 992 && !this.collapse) || (this.w > 992 && this.collapse)) {
          this.flag = true
        } else {
          this.flag = false
        }
      },
      w() {
        if (this.flag) {
          return
        }
        if (this.w <= 992) {
          if (this.collapse) {
            return
          }
          this.setCollapse(true)
        } else {
          if (!this.collapse) {
            return
          }
          this.setCollapse(false)
        }
      }
    }
  }
</script>

<style>
  .left-menu .el-menu--collapse {
    width: 0;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    height: 100%;
    min-height: 400px;
  }

  .left-menu {
    position: fixed;
    left: 0;
    top: 50px;
    bottom: 0;
  }

  .left-menu ul {
    border: 0;
  }

  .left-menu .el-menu--collapse .el-menu-item, .left-menu .el-menu--collapse .el-submenu__title, .left-menu .el-menu--collapse .el-tooltip {
    padding: 0 !important;
  }

  @media screen and (max-width: 560px) {
    .left-menu {
      top: 100px;
    }
  }
</style>
