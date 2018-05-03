<template>
    <div class="article right-container" ref="rightContainer">
        文章管理
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapGetters} from 'vuex'
    import {marginMixin} from '../../common/js/mixin/setRightContainerMargin'
    export default {
        mixins: [marginMixin]
    }
</script>

<style>
    .right-container {
        margin-top: 50px;
        transition: all .3s linear;
    }

</style>
