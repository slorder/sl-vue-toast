<template>
  <!--头部-->
  <div id="header" v-show="!hideHead">
    <div class="header-back" v-if="back" @click="goback">
      <div class="iconfont icon-fanhui"></div>
    </div>
    <div class="header-title" v-if="title">
      <span class="title-text">
        {{title}}
      </span>
    </div>
    <slot name="search"></slot>
    <slot name="message"></slot>
  </div>
</template>

<script>

  export default {
    props: ['title', 'back', 'noto', 'hideHead'],
    computed: {},
    methods: {
      goback() {
        let name = this.$route.query.goback;
        if (this.noto) {
          this.$router.go(-1);
        } else {
          if (name) {
            this.$router.isBack = true;
            this.$router.push({name: name});
          } else {
            this.$router.go(-1);
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../style/minxin";

  #header {
    position: fixed;
    z-index: 999;
    left: 0;
    right: 0;
    @include wh(100%, $top);
    background: url("../../assets/img/head-background.png") no-repeat;
    background-size: 100% 100%;
    .header-back {
      display: block;
      padding: 0 0.8rem;
      @include sh($max, $top);
      color:#101010;
      float: left;
      /*margin-top:0.5rem;*/
      .iconfont {
        @include sc($max, $f);
      }
    }
    .header-message {
      display: block;
      float: right;
      .iconfont {
        @include sc($max, $grey);
      }
    }
    .header-title {
      position: absolute;
      @include cen;
      @include wh(75%, $top);
      text-align: center;
      overflow: hidden;
      .title-text {
        @include sh($med, $top);
        color: $f;
      }
    }
    .header-search {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .header-search-input {
        display: flex;
        justify-content: center;
        height: $top;
        padding: 5px;
        flex: 1;
        input {
          padding-left: 5px;
          width: 100%;
          border-radius: 3px;
        }
      }
      .header-btn {
        @include sh($max, $top);
        color: $f;
        padding: 0 10px;
      }
    }
  }
</style>
