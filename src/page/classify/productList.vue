<template>
  <!--商品列表-->
  <div id="proList" class="left">
    <home-header :title="'商品列表'" :back="true" :hideHead="true"></home-header>
    <div class="proList-main-nav">
      <div class="proList-main-li">返回</div>
      <div class="proList-main-li">全部</div>
      <div class="proList-main-li" v-for="(item,index) in navList" :key="index" @click="activeSel(index,item.title)"
           :class="{active:activeNav==index}">
        <p :class="{activeClass:activeArrows}">{{item.name}}<i class="iconfont icon-sanjiao"></i></p>
      </div>
      <div class="proList-main-li" @click="filterPopupShow=true">筛选</div>
    </div>
    <div class="home-header">
      <div class="header-search">
        <input type="text" placeholder="请输入搜索内容" v-model="searchVal">
        <i class="iconfont icon-sousuo1"></i>
        <i class="iconfont icon-guanbi"></i>
      </div>
    </div>
    <main class="proList-main" id="proList-main">
      <div class="proList-list" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
        <mt-loadmore v-if="list && list.length !=0" :top-method="loadTop" @translate-change="translateChange"
                     @top-status-change="handleTopChange"
                     :bottom-method="loadBottom" @bottom-status-change="handleBottomChange"
                     :bottom-all-loaded="allLoaded" ref="loadmore">
          <ul class="page-loadmore-list">
            <li class="page-loadmore-listitem clear">
              <div class="home-like-li" v-for="(item,index) in list" :key="index">
                <product-block :item="item"></product-block>
              </div>
            </li>
          </ul>
          <div slot="top" class="mint-loadmore-top">
            <span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">↓</span>
            <span v-show="topStatus === 'loading'">
            <mt-spinner type="snake"></mt-spinner>
          </span>
          </div>
          <div slot="bottom" class="mint-loadmore-bottom">
            <span v-show="bottomStatus !== 'loading'"
                  :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
            <span v-show="bottomStatus === 'loading'">
              <mt-spinner type="snake"></mt-spinner>
            </span>
          </div>
        </mt-loadmore>
      </div>
    </main>
    <mt-popup v-model="filterPopupShow" position="top" class="filter-mt-popup">
      <div class="filter-content">
        <div class="filter-name">
          价格(元)
        </div>
        <div class="filter-item">
          <input class="filter-item-input" type="number" v-model="priceMin" placeholder="最低价"><span>&nbsp;-&nbsp;</span>
          <input
            class="filter-item-input" type="number" v-model="priceMax" placeholder="最高价">
        </div>
        <div class="filter-name">
          品牌
        </div>
        <div class="filter-item">
          <div class="filter-item-content">
            <div class="filter-item-li" v-for="(item,index) in brandList" @click="brandIn(item.name)"
                 :class="item.name | filterAtive(brand)">
              {{item.name}}
            </div>
          </div>
        </div>
      </div>
      <div class="filter-button">
        <div class="filter-reset" @click="resetBrand">重置</div>
        <div class="filter-submit" @click="submitBrand">确定</div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
  import homeHeader from '../../components/header/header.vue'
  import submitBtn from '../../components/button/submitBtn.vue'
  import productBlock from '../../components/product/productBlock.vue'
  import {filterMainImg} from '../../mixins/filter'

  export default {
    data() {
      return {
        searchVal: null,
        priceMin: null,
        priceMax: null,
        filterPopupShow: true,
        bottomHint: '↑',
        listBottomShow: false,
        activeNav: '',
        activeArrows: false,
        brand: ['1111'],
        brandList: [
          {
            name: '1111',
          },
          {
            name: '1112',
          },
          {
            name: '1113',
          },
          {
            name: '1114',
          },
          {
            name: '1115',
          },
          {
            name: '1116',
          },
          {
            name: '1117',
          }
        ],
        navList: [
          {
            name: '按销量',
            title: 'sales_volume'
          },
          {
            name: '按价格',
            title: 'sales_price'
          }
        ],
        selected: '1',
        topStatus: '',
        allLoaded: false,
        list: null,
        bottomStatus: '',
        wrapperHeight: 0,
        translate: 0,
        moveTranslate: 0,
        orderByClause: 'product_name',
        sort: 'DESC'
      }
    },
    filters: {
      filterMainImg,
      filterAtive: function (val, brand) {
        if (brand.indexOf(val) != -1) {
          return 'brandClass';
        }
      }
    },
    components: {
      homeHeader,
      submitBtn,
      productBlock
    },
    methods: {
      brandIn(val) {
        if (this.brand.indexOf(val) == -1) {
          this.brand.push(val);
        } else {
          this.brand.splice(this.brand.indexOf(val), 1);
          console.log(this.brand)
        }
      },
      handleBottomChange(status) {
        this.bottomStatus = status;
        this.listBottomShow = false;
//        后期需要修改
        if (!this.listBottomShow) {
          this.bottomHint = '我是有底线的';
          let that = this;
          setTimeout(function () {
            that.allLoaded = true;
          }, 1000)
        }
      },
      loadBottom() {
        let that = this;
        if (!that.listBottomShow) {
          try {
            if (that.$refs.loadmore) {
              that.$refs.loadmore.onBottomLoaded();
            }
          } catch (err) {

          }
          return;
        }
      },
      handleTopChange(status) {
        this.moveTranslate = 1;
        this.topStatus = status;
      },
      translateChange(translate) {
        const translateNum = +translate;
        this.translate = translateNum.toFixed(2);
        this.moveTranslate = (1 + translateNum / 70).toFixed(2);
      },
      loadTop() {
        let that = this;
        that.getLists();
        setTimeout(function () {
          try {
            if (that.$refs.loadmore) {
              that.$refs.loadmore.onTopLoaded();
            }
          } catch (err) {

          }
        }, 300)
        document.documentElement.scrollTop = 0;
      },
      submitBtn() {
        let that = this;
        if (that.agreementActive) {
          that.$router.push({path: '/order'})
        }
      },
      activeSel(index, title) {
        let that = this;
        if (that.activeNav == index) {
          that.activeArrows = !that.activeArrows;
        } else {
          that.activeArrows = false;
        }
        that.activeNav = index;
        that.orderByClause = title;
        that.sort = that.activeArrows ? 'ASC' : 'DESC';
        that.getLists();
      },
      getLists() {
        let that = this;
        let cateGoryId = that.$route.query.id ? that.$route.query.id : '';
        this.$nextTick(function () {
          that.ajax({
            url: '/product/orderByClause?orderByClause=' + that.orderByClause + ' ' + that.sort + '&cateGoryId=' + cateGoryId,
            success: function (res) {
              if (res.status == 1000) {
                document.getElementById('proList-main').scrollTop = 0;
                that.list = res.data;
                try {
                  if (that.$refs.loadmore) {
//                    that.$refs.loadmore.onBottomLoaded();
                    that.$refs.loadmore.onTopLoaded();
                  }
                } catch (err) {

                }
              }
            }
          })
        })
      },
      //重置筛选数据
      resetBrand() {
        this.brand = [];
      },
      //确定筛选
      submitBrand() {

      }
    },
    created() {
      this.getLists();
    },
    updated() {
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    }
  }
</script>

<style lang="scss">
  @import "../../style/minxin";

  $b: #f0f0f0;
  $inputH: 1.87rem;

  #proList {
    /*搜索框*/
    .home-header {
      background: $f;
      position: fixed;
      top: $top - 0.1;
      left: 0;
      right: 0;
      z-index: 999;
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

    .loading-background, .mint-loadmore-top {
      background: $b;
    }
    .loading-background, .mint-loadmore-top span {
      -webkit-transition: .2s linear;
      transition: .2s linear
    }

    .mint-loadmore-top span {
      display: inline-block;
      vertical-align: middle
    }

    .mint-loadmore-top span.is-rotate {
      -webkit-transform: rotate(180deg);
      transform: rotate(180deg)
    }

    .page-loadmore .mint-spinner {
      display: inline-block;
      vertical-align: middle
    }

    .page-loadmore-desc {
      text-align: center;
      color: #666;
      padding-bottom: 5px
    }

    .page-loadmore-desc:last-of-type, .page-loadmore-listitem {
      background: #f0f0f0;
      padding: 0 5px;
    }

    .page-loadmore-listitem {
      min-height: 50px;
      /*line-height: 50px;*/
      text-align: center
    }

    .page-loadmore-listitem:first-child {
      border-top: 1px solid #eee
    }

    .page-loadmore-wrapper {
      overflow: scroll
    }

    .mint-loadmore-bottom span {
      display: inline-block;
      width: 100%;
      -webkit-transition: .2s linear;
      transition: .2s linear;
      vertical-align: middle
    }

    .mint-loadmore-bottom span.is-rotate {
      -webkit-transform: rotate(180deg);
      transform: rotate(180deg)
    }

    .mint-spinner-snake {
      margin: 0 auto;
    }
  }

  .proList-main {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    float: left;
    padding: ($top*2) 0 0;
    width: 100%;
    overflow: auto;
  }

  .proList-main-nav {
    background: url("../../assets/img/head-background.png") no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: row;
    position: fixed;
    top: $top - $top;
    left: 0;
    right: 0;
    transform: translate3d(0, 0, 0);
    z-index: 999;
    .proList-main-li {
      flex: 1;
      text-align: center;
      @include sh($med, $top);
      color: $f;
      .iconfont {
        @include sh($med, $top);
      }
    }
    .active {
      .activeClass {
        .iconfont:before {
          display: inline-block;
          transform: rotateX(180deg);
        }
      }
    }
  }

  .proList-child {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 3px;
    .proList-child-li {
      flex: 1;
      text-align: center;
      @include sh($med, 2em);
      border-bottom: 3px solid $f;
      background: $f;
    }
    .activeClass {
      border-bottom: 3px solid $red;
      color: $red;
    }
  }

  //列表
  .proList-list {
    background: $f;
    .home-like-li {
      box-sizing: border-box;
      width: 50%;
      float: left;
      padding: 10px 8px;
    }
  }

  /*弹窗*/
  .v-modal {
    opacity: 0;
  }

  .filter-mt-popup {
    top: $top;
    right: 0;
    left: 50%;
    width: 290rem/15;
    background: $f;
    transform: translate3d(0, 0, 0);
    @include sc($min, rgba(16, 16, 16, 1));
    box-shadow: 0px 2px 6px 0px rgba(170, 170, 170, 1);
    .filter-content {
      background: $f;
      width: 290rem/15;
      padding: 10px 7px 0;
      .filter-item {
        @include fj(flex-start);
        @include sh($min, 18rem/15);
        .filter-item-name {
          background: $f;
          padding-right: 10px;
        }
        .filter-item-input {
          width: 5rem;
          line-height: 1.6rem;
          background: rgba(242, 242, 242, 1);
          text-align: center;
        }
        span{
          line-height: 1.6rem;
        }
        .filter-item-li {
          background: rgba(242, 242, 242, 1);
          padding: 8px;
          @include sh($min, $min);
          margin-right: 10px;
          margin-bottom: 10px;
        }
        .brandClass {
          background: $pink;
          color: $red;
        }
      }
      .filter-item-content {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        flex-wrap: wrap;
        padding-bottom: $med;
      }
      /*品牌标题*/
      .filter-name {
        padding: 10px 0;
        @include sc($med, $gray);
      }
    }
    .filter-button {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .filter-reset, .filter-submit {
        flex: 1;
        text-align: center;
        @include sh($mini, 28rem/15);
      }
      .filter-reset {
        background: rgba(255, 224, 224, 1);
        color: rgba(248, 0, 0, 1);
      }
      .filter-submit {
        background: rgba(248, 0, 0, 1);
        color: $f;
      }
    }
  }

</style>
