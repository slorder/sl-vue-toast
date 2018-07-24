<template>
  <div id="app">
    <transition :name="transitionName" mode="out-in">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition :name="transitionName" mode="out-in">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
    <home-footer v-if="$route.meta.show"></home-footer>
  </div>
</template>

<script>
  import homeFooter from './components/footer/footer.vue'

  export default {
    name: 'App',
    watch: {
      $route(to, from) {
        document.getElementById('app').scrollTop = 0;
        this.routerMove();
      }
    },
    components: {
      homeFooter
    },
    updated() {
      setTimeout(function () {
        try {
          let wechatTitle = document.getElementById('header').getElementsByClassName('title-text')[0].innerText;
          document.title = wechatTitle
        } catch (err) {
          document.title = '货嚯商城'
        }
      }, 500)
    },
    methods: {
      routerMove() {
        // 如果isBack为true时，证明是用户点击了回退，执行slide-right动画
//        console.log(isBack)
        let isBack = this.$router.isBack;
        if (isBack) {
          this.transitionName = 'slide-right'
        } else {
          this.transitionName = 'slide-left'
        }
        // 做完回退动画后，要设置成前进动画，否则下次打开页面动画将还是回退
        this.$router.isBack = false;
      }
    }
  }
</script>

<style lang="scss">
  @import './style/common';

  html, body, #app {
    width: 100vw;
    height: 100%;
    background:#fff;
    overflow-x: hidden;
    display: block;
    position: relative;
    /*解决ios上滑动不流畅*/
    -webkit-overflow-scrolling: touch;
  }

  .slide-right-enter-active, .slide-right-leave-active, .slide-left-enter-active, .slide-left-leave-active {
    transform: translateX(0);
    transition: all 0.2s;
    opacity: 1;
    width: 100vw !important;
  }

  .slide-left-enter, .slide-right-leave-to {
    transform: translateX(100vw);
    opacity: 0;
    width: 100vw !important;
  }

  .slide-left-leave-to, .slide-right-enter {
    transform: translateX(-100vw);
    opacity: 0;
    width: 100vw !important;
  }


</style>
