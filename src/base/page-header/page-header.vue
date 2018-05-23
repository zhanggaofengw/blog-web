<template>
  <div class="page-header">
    <div class="page-title">
      {{pageTitle}}
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    props: {
      pageTitle: String
    }
  }
</script>

<style>
  .page-header {
    padding: 10px 0;
  }

  .page-title {
    font-weight: bold;
  }
</style>
