<template>
  <div class="left-menu">
    <el-menu class="el-menu-vertical-demo" :collapse="collapse"
             :default-active="$route.path" :router="true"
             background-color="#303133" text-color="#ffffff">
      <el-submenu :index="menu.name" v-for="menu, index in roleMenu">
        <template slot="title">
          <span slot="title">{{menu.name}}</span>
        </template>
        <el-menu-item-group v-for="subMenu, index in menu.subMenu">
          <el-menu-item :index="subMenu.indexPath">{{subMenu.name}}</el-menu-item>
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
      window.onresize = () => {
        this.w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
        if (this.$route.path === '/visit') {
          this.echarts.init(document.getElementById('main')).resize()
        }
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
        'collapse',
        'roleMenu'
      ])
    },
    watch: {
      collapse() {
        this.flag = ((this.w <= 992 && !this.collapse) || (this.w > 992 && this.collapse))
      },
      w() {
        this.echarts.init(document.getElementById('main')).resize()
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
