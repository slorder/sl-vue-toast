<template>
  <!--首页-->
  <div id="home" class="left">
    <div class="home-header">
      <!--<div class="header-search" @click="$router.push({path:'/search'})">-->
      <!--请输入搜索内容-->
      <!--</div>-->
      <div class="header-search">
        <input type="text" placeholder="请输入搜索内容" v-model="searchVal">
        <i class="iconfont icon-sousuo1"></i>
        <i class="iconfont icon-guanbi"></i>
      </div>
    </div>
    <div class="home-main">
      <!--banner广告-->
      <div class="home-main-banner">
        <mt-swipe :auto="3000" v-if="bannerList">
          <mt-swipe-item v-for="(item,index) in bannerList" :key="index" v-if="index<6">
            <div class="home-swipe-image" @click="$router.push({name:'proDetail',query:{proId:item.productId}})">
              <img :src="imgHost+item.imgFileName" :title="item.title"/>
            </div>
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <!--BBS-->
      <div class="home-main-bbs" v-if="bbs">
        <i class="iconfont icon-laba"></i>
        <div class="bbs-content" ref="bbsContent">
          <span class="bbs-span" ref="bbsSpan">{{bbs}}</span>
        </div>
      </div>
      <!--人气爆款-->
      <div class="home-main-boutique" v-if="topList">
        <div class="home-boutique-title">
          <h2>{{topList[0].title}}</h2>
        </div>
        <div class="home-boutique-content" ref="bqParent">
          <div class="home-boutique-list" :style="moveSlider" @touchstart.capture="touchStart"
               @touchmove.capture="touchMove"
               @touchend.capture="touchEnd" ref="bqChild">
            <li class="home-boutique-inner" v-for="(item,index) in topList" :key="index"
                v-if="index < 8">
              <div class="home-boutique-li">
                <product-mini :item="item"></product-mini>
              </div>
            </li>
          </div>
        </div>
      </div>
      <!--推荐商品-->
      <div class="home-main-like" v-if="likeList">
        <div class="home-like-title">
          <h2>{{likeList[0].title}}</h2>
        </div>
        <div class="home-like-list clear">
          <div class="home-like-li" v-for="(item,index) in likeList" :key="index"
               v-if="index < 8">
            <product-block :item="item"></product-block>
          </div>
        </div>
      </div>
      <logo-footer></logo-footer>
    </div>
  </div>
</template>

<script>
  import productBlock from '../../components/product/productBlock.vue'
  import productMini from '../../components/product/productBlockMin.vue'
  import logoFooter from '../../components/footer/logoFooter.vue'
  import {animate} from '../../mixins'

  export default {
    mixins: [animate],
    data() {
      return {
        searchVal: '',
        bbs: '',
        bannerList: null,
        boutiqueList: null,
        likeList: null,
        topList: null,
        moveSlider: 'transform:translateX(0px)'
      }
    },
    components: {
      productBlock,
      productMini,
      logoFooter
    },
    created() {
      this.getBan();//定义获取图片方法
      this.getExtend();
      this.getBBS();
      this.getTopList();
    },
    methods: {
      touchStart(ev) {
        ev = ev || event;
        //tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
//        console.log(ev)
        if (ev.touches.length == 1) {
          // 记录开始位置
          this.startX = ev.touches[0].clientX;
        }
      },
      touchMove(ev) {
        ev = ev || event;
        let bqChildWidth = this.$refs.bqChild.offsetWidth;
        let bqChildLeft = this.$refs.bqChild.style.transform;
        let bqParentWidth = this.$refs.bqParent.offsetWidth;
        //获取删除按钮的宽度，此宽度为滑块左滑的最大距离
        if (ev.touches.length == 1) {
          // 滑动时距离浏览器左侧实时距离
          this.moveX = ev.touches[0].clientX
          //起始位置减去 实时的滑动的距离，得到手指实时偏移距离
          this.disX = this.startX - this.moveX;
          // 如果是向右滑动或者不滑动，不改变滑块的位置
          var abc = bqChildLeft.slice(11, -3);
          let a = Number(abc) - this.disX / 2;
          if (a < bqParentWidth - bqChildWidth) {
            this.moveSlider = "transform:translateX(" + (bqParentWidth - bqChildWidth) + "px)";
            return;
          } else if (a > 0) {
            this.moveSlider = "transform:translateX(0px)"
            return;
          } else {
//            if (this.disX > 0) {
            //具体滑动距离我取的是 手指偏移距离*5。
            if (a > bqParentWidth - bqChildWidth && a <= 0) {
              this.moveSlider = "transform:translateX(" + a + "px)";
//              console.log(abc + ':' + (bqParentWidth - bqChildWidth) + ':' + a);
            }
            // 最大也只能等于删除按钮宽度
//            if (this.disX * 5 >= wd) {
//              this.moveSlider = "transform:translateX(-" + wd + "px)";
//            }
          }
        }
      },
      touchEnd(ev) {

      },
      //获取公告
      getBBS() {
        this.$nextTick(function () {
          this.ajax({
            url: '/ad/activity',
            success: (res) => {
              this.bbs = res.data.activityNotice;
              setTimeout(() => {
                this.animateLevel({parentDom: this.$refs.bbsContent, childDom: this.$refs.bbsSpan, speed: 6});
              }, 10)
            }
          })
        })
      },
      //获取轮播
      getBan() {
        let that = this;
        that.ajax({
          url: '/ad/homepage',
          success: function (res) {
            that.bannerList = res.data;
          },
        })
      },
      //获取推荐
      getExtend() {
        let that = this;
        this.$nextTick(function () {
          that.ajax({
            url: '/product/recommendedList?cityName',
            success: function (res) {
              that.likeList = res.data;
            },
          })
        })
      },
      //获取人气爆款
      getTopList() {
        this.$nextTick(function () {
          this.ajax({
            url: '/product/hot/explosion',
            success: (res) => {
              this.topList = res.data;
            },
          })
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../style/minxin";

  $top: 3rem;
  $inputH: 1.87rem;

  #home {
    width: 100vw;
    /*解决ios上滑动不流畅*/
    -webkit-overflow-scrolling: touch;
  }

  .home-header {
    background: $f;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    height: $top;
    .header-search {
      @include center;
      border-radius: $inputH;
      width: 80%;
      text-align: left;
      padding-left: 29px;
      @include sh($med, $inputH);
      border: 1px solid $border;
      color: $gray;
    }
    .icon-sousuo1 {
      position: absolute;
      left: 6px;
    }
    .icon-guanbi {
      position: absolute;
      right: 6px;
    }
  }

  .home-main {
    padding: $top 0 $bottom;
    background: $f;
    /*解决ios上滑动不流畅*/
    -webkit-overflow-scrolling: touch;
    /*banner*/
    .home-main-banner {
      height: 13.4rem;
      .home-swipe-image {
        @include wh(100%, 100%);
        img {
          @include wh(100%, 100%);
        }
      }
    }

    /*公告*/
    .home-main-bbs {
      padding: 6px 14+37px 0;
      min-height: 23rem/15;
      position: relative;
      .iconfont {
        position: absolute;
        left: 15px;
        font-size: 1.533rem;
      }
      .bbs-content {
        overflow: hidden;
        .bbs-span {
          position: relative;
          color: $red;
          white-space: nowrap;
          left: 0;
          @include sh($med, 23rem/15);
        }
      }
    }

    /*人气爆款*/
    .home-main-boutique {
      .home-boutique-title {
        h2 {
          padding: 10px 0;
          text-align: center;
          @include sh($title, 23rem/15rem);
          color: $gray;
        }
      }
      .home-boutique-content {
        display: block;
        width: 100vw;
        position: relative;
        height: 14rem;
        .home-boutique-list {
          position: absolute;
          padding: 5px 0 0 15px;
          display: flex;
          flex-direction: row;
          transition: 0s;
          left: 0;
          .home-boutique-inner {
            padding: 0 15px 5px 0;
          }
          .home-boutique-li {
            width: 8rem;
            box-shadow: 0px 1px 5px 0px rgba(170, 170, 170, 1);
          }
        }
      }
    }
    /*推荐商品*/
    .home-main-like {
      .home-like-title {
        h2 {
          padding: 12px 0 7px;
          text-align: center;
          @include sh($title, 23rem/15rem);
          color: $gray;
        }
      }
      .home-like-list {
        width: 100%;
        padding: 0 8px;
      }
      .home-like-li {
        width: 50%;
        float: left;
        padding: 0 8px;
      }
    }
  }

</style>
