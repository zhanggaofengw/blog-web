<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapActions} from 'vuex'
  import {queryAll} from './common/js/server'

  export default {
    created() {
      if (sessionStorage.getItem('userId') && this.roleMenu.length === 0) {
        let url = `/permission/queryMenu?id=${sessionStorage.getItem('userId')}`
        queryAll(url, this).then((response) => {
          if (response) {
            this.addRouterAndMenu({
              menuList: response.menuList
            })
            this.$router.addRoutes(this.routes)
          }
        })
      }
    },
    methods: {
      ...mapActions([
        'addRouterAndMenu'
      ])
    },
    computed: {
      ...mapGetters([
        'roleMenu',
        'routes'
      ])
    }
  }
</script>

<style>
  .right-container {
    padding: 10px;
    margin-top: 50px;
  }

  @media screen and (max-width: 560px) {
    .right-container {
      margin-top: 100px;
    }
  }
</style>
