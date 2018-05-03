<template>
    <div class="left-menu">
        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
            <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group>
        <el-menu  class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" background-color="#303133" text-color="#ffffff">
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
    export default {
        data() {
            return {
                isCollapse: true
            };
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        height: 100%;
        min-height: 400px;
    }
    .left-menu{
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
    }
</style>
