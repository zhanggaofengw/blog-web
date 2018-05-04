<template>
    <div id="app">
        <blog-header v-if="isLogin"></blog-header>
        <left-menu v-if="isLogin"></left-menu>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import LeftMenu from './components/left-menu/left-menu.vue'
    import BlogHeader from './components/header/header.vue'
    export default {
        components: {
            LeftMenu,
            BlogHeader
        },
        computed: {
          ...mapGetters([
            'isLogin'
          ])
        }

    }
</script>

<style>

</style>
