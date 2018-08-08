<template>
  <div>
    <blog-header></blog-header>
    <left-menu></left-menu>
    <div class="home right-container" :class="{ visit: $route.path === '/home/visit'}" ref="rightContainer">
      <router-view></router-view>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import LeftMenu from '../../components/left-menu/left-menu.vue'
  import BlogHeader from '../../components/header/header.vue'
  import {mapGetters} from 'vuex'

  export default {
    computed: {
      ...mapGetters([
        'collapse'
      ])
    },
    created() {
      this.flag = true
      this.$nextTick(() => {
        this.$refs.rightContainer.style.transition = 'margin 0 linear'
        this.setMargin()
      })
    },
    methods: {
      setMargin() {
        if (this.collapse) {
          this.$refs.rightContainer.style.marginLeft = '0'
        } else {
          this.$refs.rightContainer.style.marginLeft = '200px'
        }
        if (this.$route.path === '/home/visit') {
          setTimeout(() => {
            this.echarts.init(document.getElementById('main')).resize()
          }, 300)
        }
      }
    },
    watch: {
      collapse() {
        if (this.flag) {
          this.$refs.rightContainer.style.transition = 'margin .3s linear'
          this.flag = false
        }
        this.setMargin()
      }
    },
    components: {
      LeftMenu,
      BlogHeader
    }
  }

</script>

<style>
  .visit {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .visit #main{
    height: 100%;
  }
</style>
