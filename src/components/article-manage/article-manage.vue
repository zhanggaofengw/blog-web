<template>
  <div class="article right-container" ref="rightContainer">
    文章管理
  </div>
</template>

<script type="text/ecmascript-6">
  import {marginMixin} from '../../common/js/mixin/setRightContainerMargin'
  export default {
    mixins: [marginMixin],
    created () {
//      this.captchaTime = (new Date()).valueOf()
//      this.$ajax.get(`/captcha?_t=${this.captchaTime}`).then((response) => {
//        console.log(response)
//      })
    },
    methods: {}
  }
</script>

<style>

</style>
