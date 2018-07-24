<template>
  <!--加载页-->
  <div id="index">
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>

  export default {
    watch: {
      $route(to, from) {
        this.routerMove();
      }
    },
    beforeRouteEnter(to, from, next) {
//      方法只在路由进来的第一次生效
      next(vm => vm.setPath(from.name, to.name))
    },
    methods: {
      setPath(goback, goto) {
        let that = this;
        if (goto == 'index') {
          goto = goback;
        }
        var memberId = that.localData('get','memberId');
        if (!memberId) {
          this.$router.push({path: '/login', query: {goback: goback, goto: goto}})
        }
        this.$router.isBackChild = false;
      },
      routerMove() {
        // 如果isBack为true时，证明是用户点击了回退，执行slide-right动画
//        console.log(this.$router.isBackChild);
        let isBackChild = this.$router.isBackChild;
        if (isBackChild) {
          this.transitionName = 'slide-right'
        } else {
          this.transitionName = 'slide-left'
        }
        // 做完回退动画后，要设置成前进动画，否则下次打开页面动画将还是回退
        this.$router.isBackChild = false;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../style/minxin";

  #index {
    width: 100%;
    float: left;
    position: absolute;
    top: 0;
    left: 0;
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
