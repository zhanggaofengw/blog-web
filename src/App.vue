<template>
    <div id="app">
        <blog-header></blog-header>
        <left-menu></left-menu>
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

</style>
