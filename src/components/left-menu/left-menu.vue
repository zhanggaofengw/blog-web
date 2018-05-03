<template>
    <div class="left-menu">
        <el-menu  class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="collapse" background-color="#303133" text-color="#ffffff">
            <el-menu-item index="1">
                <span slot="title">文章管理</span>
            </el-menu-item>
            <el-menu-item index="2">
                <span slot="title">发布文章</span>
            </el-menu-item>
            <el-menu-item index="3">
                <span slot="title">用户管理</span>
            </el-menu-item>
            <el-menu-item index="4">
                <span slot="title">分类/标签</span>
            </el-menu-item>
            <el-submenu  index="5">
                <template slot="title">
                    <span slot="title">系统管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="1-1">选项</el-menu-item>
                </el-menu-item-group>
            </el-submenu >
        </el-menu>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapGetters, mapMutations} from 'vuex'
    export default {
        data() {
            return {
                w: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
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
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            ...mapMutations({
                setCollapse: 'SET_COLLAPSE'
            })
        },
        computed: {
            ...mapGetters([
                'collapse'
            ])
        },
        watch: {
            w() {
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
    .left-menu .el-menu--collapse{
        width: 0;
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        height: 100%;
        min-height: 400px;
    }
    .left-menu{
        position: fixed;
        left: 0;
        top: 50px;
        bottom: 0;
    }
    .left-menu ul{
        border: 0;
    }
    .left-menu .el-menu--collapse .el-menu-item,.left-menu .el-menu--collapse .el-submenu__title,.left-menu .el-menu--collapse .el-tooltip{
        padding: 0 !important;
    }
</style>
