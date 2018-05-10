<template>
    <div id="app">
        <blog-header v-if="$route.path !== '/login' && $route.path !== '/'"></blog-header>
        <left-menu v-if="$route.path !== '/login' && $route.path !== '/'"></left-menu>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>
    import LeftMenu from './components/left-menu/left-menu.vue'
    import BlogHeader from './components/header/header.vue'
    export default {
        components: {
            LeftMenu,
            BlogHeader
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
