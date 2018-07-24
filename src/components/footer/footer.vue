<template>
  <!--底部-->
  <div id="footer">
    <div class="footer-nav" @click="hrefName('home')" :class="{selActive:active=='home'}">
      <div class="footer-img">
        <i class="iconfont icon-shouye"></i>
      </div>
      <span>首页</span>
    </div>
    <div class="footer-nav" @click="hrefName('classify')" :class="{selActive:active=='classify'}">
      <div class="footer-img">
        <i class="iconfont icon-fenlei"></i>
      </div>
      <span>分类</span>
    </div>
    <div class="footer-nav" @click="hrefName('shopcart')" :class="{selActive:active=='shopcart'}">
      <div class="footer-img">
        <i class="iconfont icon-gouwuche"></i>
      </div>
      <span>购物车</span>
    </div>
    <div class="footer-nav" @click="hrefName('me')" :class="{selActive:active=='me'}">
      <div class="footer-img">
        <i class="iconfont icon-wode"></i>
      </div>
      <span>我的</span>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    computed: {
      ...mapGetters(['active'])
    },
    methods: {
      hrefName(name) {
        this.$store.commit('setActive', name)
        this.$router.push({name: name});
      }
    },
    mounted() {
      this.$store.commit('setActive', this.$route.name)
    }
  }
</script>

<style lang="scss">
  @import "../../style/minxin";

  #footer {
    z-index:9999;
    background: $f;
    @include wh(100%, $bottom);
    display: flex;
    flex-direction: row;
    border-top: 1px solid $border;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    transform: translate3d(0, 0, 0);
    .footer-nav {
      display: flex;
      flex-direction: column;
      flex: 1;
      justify-content: center;
      align-items: center;
      color: $grey;
      .footer-img {
        i {
          @include sh(1.8rem, 1.8rem);
          color:#101010;
        }
      }
      span {
        @include sh($min, $min);
        color:#101010;
      }
    }
    //选中颜色
    .selActive {
      .iconfont {
        color: $red !important;
      }
      span {
        color:$red;
      }
    }
  }
</style>
