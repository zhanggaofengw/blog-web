<template>
    <div class="header">
        <div class="left-logo fl">blog</div>
        <div class="right">
            <div class="icon" @click="changeCollapse()">
                <span class="icon-bar"></span>
                <span class="icon-bar icon-bar-t"></span>
                <span class="icon-bar icon-bar-t"></span>
            </div>
            <div class="fr user">
                <el-popover
                        placement="bottom"
                        width="160">
                    <div style="text-align: right; margin: 0">
                        <el-button size="mini">修改密码</el-button>
                        <el-button size="mini">退出</el-button>
                    </div>
                    <div slot="reference" class="set">
                        <span>admin</span>
                        <i class="el-icon-caret-bottom"></i>
                    </div>
                </el-popover>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapGetters, mapMutations} from 'vuex'
    export default{
        methods: {
            changeCollapse() {
                this.setCollapse(!this.collapse)
            },
            ...mapMutations({
                setCollapse: 'SET_COLLAPSE'
            })
        },
        computed: {
            ...mapGetters([
                'collapse'
            ])
        }
    }
</script>

<style>
    .header {
        position: fixed;
        top: 0;
        width: 100%;
        height: 50px;
        background: #fff;
    }

    .left-logo {
        width: 200px;
        height: 50px;
        background: #262729;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .header .right {
        margin-left: 200px;
        height: 100%;
    }

    .header .right .icon {
        display: inline-block;
        padding: 9px 5px;
        margin: 9px 0 0 5px;
        cursor: pointer;
    }

    .header .right .user {
        height: 100%;
        cursor: pointer;
    }

    .header .user span {
        font-weight: bold;
    }
    .header .user>span, .header .user .set{
        height: 100%;
    }
    .header .user .set{
        display: flex;
        align-items: center;
    }
    .header .right .user:hover {
        color: #C0C4CC;
    }

    .header .icon:hover .icon-bar {
        background: #C0C4CC;
    }

    .icon-bar {
        display: block;
        width: 22px;
        height: 2px;
        border-radius: 4px;
        background: #333;
    }

    .icon-bar.icon-bar-t {
        margin-top: 4px;
    }
</style>
