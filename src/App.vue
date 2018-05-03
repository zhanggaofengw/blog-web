<template>
    <div id="app">
        <left-menu></left-menu>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>
    import LeftMenu from './components/left-menu/left-menu.vue'
    export default {
        components: {
            LeftMenu
        }
    }
</script>

<style>

</style>
