<template>
  <!--首页底部logo-->
  <div class="home-main-footer">
    <i class="iconfont"></i><span>货嚯商城</span>
  </div>
</template>

<script>

</script>

<style lang="scss" scoped>
  @import "../../style/minxin";

  .home-main-footer {
    margin: 20px auto;
    width: 80px;
    padding-left: 22px;
    position: relative;
    @include sc($min, $gre);
    line-height: 16px;
    .iconfont {
      display: block;
      position: absolute;
      left: 0;
      @include wh(16px, 16px);
      background: url("../../assets/img/logo.jpg") no-repeat;
      background-size: contain;
      border-radius: 100%;
    }
  }
</style>
