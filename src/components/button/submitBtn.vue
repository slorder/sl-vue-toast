<template>
  <!--提交按钮-->
  <div class="button"
       :style="med?'width:75%;height:2.8rem;line-height:2.8rem;':min?'width:100%;height:2.6rem;line-height:2.6rem;font-size:1rem':''"
       :class="{active:grey}">
    {{title}}
  </div>
</template>

<script>
  export default {
    props: ['title', 'min', 'med', 'grey']
  }
</script>

<style lang="scss" scoped>
  @import "../../style/minxin";

  .button {
    @include wh(80%, 3rem);
    background: url("../../assets/img/btn-backg.png") no-repeat;
    background-size: 100% 100%;
    margin: 0 auto;
    border-radius: 5px;
    @include sh(1.4rem, 3rem);
    text-align: center;
    color: $f;
  }

  .active {
    background: #bbb;
  }
</style>
