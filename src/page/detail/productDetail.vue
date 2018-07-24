<template>
  <!--商品详情-->
  <div id="orderDetail" class="left">
    <home-header :title="info?info.productName:'商品详情'" :back="true"></home-header>
    <main class="detail-main" v-if="info">
      <div class="detail-main-image">
        <mt-swipe :auto="0" :continuous="false">
          <mt-swipe-item v-for="(item,index) in info.stringArray" :key="index" v-if="item">
            <img :src="imgHost+item">
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="detail-main-title">
        <div class="detail-title">
          {{info.productName}}
        </div>
        <div class="detail-collect" v-if="false">
          <i class="iconfont" :class="{active:iconfontActive}">

          </i>
          收藏
        </div>
      </div>
      <div class="detail-main-mon">
        <span>原价：￥{{info.salesPrice | filterFixed}}元</span>
      </div>
      <div class="detail-main-money">
        活动价：￥{{info.discountPrice | filterFixed}}元
      </div>
      <div class="detail-main-sales">
        <span>销量：{{info.salesVolume}}</span>
        <!--<span>库存：{{info.stock}}</span>-->
      </div>
      <div class="announcements">
        <span>本店活动</span>满500元减20  满300元减10
      </div>
      <!--<div class="detail-main-sel" @click="showPopup">-->
        <!--<div class="detail-sel-left">{{typeSel | filterParse}}<span-->
          <!--v-if="typeSel != '请选择'">数量：{{orderInfo.count}}</span></div>-->
      <!--</div>-->
      <div class="preferential" @click="goPreferential">
        <i class="iconfont icon-youhuiquan"></i>
        <div class="receive">
          领取<span class="iconfont icon-arrow-right-copy"></span>
        </div>
      </div>
      <div class="detail-main-postage" v-if="true">
        <div class="detail-sel-title">配送至</div>
        <div class="detail-sel-title">
          <span class="option-title">省:</span>
          <span class="sel-option" @click="selAddress">{{newPlotData.provinceValue}}</span>
        </div>
        <div class="detail-sel-title">
          <span class="option-title">市:</span>
          <span class="sel-option" @click="selAddress">{{newPlotData.citiesValue}}</span>
        </div>
        <div class="detail-sel-title detail-sel-postage">
          <span class="option-title">运费:</span>
          <span>{{postageMoney}}元</span>
        </div>
      </div>
      <div class="mineStore">
        <div class="logo">
          <img src="../../assets/img/logo.jpg" alt="">
          <span>货嚯商城</span>
        </div>
        <div class="storeBtn" @click="gohome"><span>进店逛逛</span></div>
      </div>
      <div class="detail-main-tag clear">
        <li class="detail-tag-list" v-for="(item,index) in tagList" :key="index">
          <div class="detail-tag-li">
            <i class="iconfont" :class="item.iconfont"></i>{{item.name}}
          </div>
        </li>
      </div>
      <!--<div class="detail-main-sel" v-if="false">-->
        <!--<div class="detail-sel-left">用户评价</div>-->
        <!--<div class="detail-sel-evaluate">好评率 <span> 100%</span></div>-->
      <!--</div>-->
      <div class="detail-main-intro">
        <mt-navbar v-model="selected">
          <mt-tab-item id="1">商品描述</mt-tab-item>
          <mt-tab-item id="2" v-if="false">运费</mt-tab-item>
        </mt-navbar>
        <!-- tab-container -->
        <mt-tab-container v-model="selected">
          <!--商品详情-->
          <mt-tab-container-item id="1">
            <!--<div class="html-detail" v-html="info.remark">-->

            <!--</div>-->
            <div class="html-detail-inner">
              <div class="html-detail-img" v-for="(item,index) in info.proDetailArray" :key="index" v-if="item!=null && item != ''">
                <img :src="imgHost + item" alt="">
              </div>
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="2" v-if="false">
            <div class="html-detail-postage">
              <div class="tableTitle">
                <div class="com" style="border-right:none;">地区</div>
                <div class="com">首重</div>
                <div class="com" style="border-left:none;">续费(每{{info.chargeUnit}})</div>
              </div>
              <ul v-for="item in postageList">
                <li>
                  <span style="border-right:none;border-top:none;">{{item.area}}</span>
                  <span style="border-top:none;"></span>
                  <span style="border-left:none;border-top:none;">￥{{item.fee | filterFixed}}元</span>
                </li>
              </ul>
            </div>
          </mt-tab-container-item>
        </mt-tab-container>
        <div class="storeRecommended" v-if="info.stringArray">
          <h4>货嚯推荐</h4>
          <div class="recommendedShop clear">
            <div class="recommendedShop-list">
              <div class="recommendedShop-inner" v-for="(item,index) in info.stringArray" :key="index"
                   v-if="index < 5">
                <div class="recommendedShop-li">
                  <product-mini :item="item"></product-mini>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <mt-popup v-model="popupVisible" position="bottom">
      <div class="sel-info" v-if="info">
        <div class="sel-info-title">
          <div class="sel-info-image">
            <img :src="info.stringArray | filterMainImg" alt="">
          </div>
          <div class="sel-info-item">
            <div class="sel-info-name">
              {{info.productName}}<i class="iconfont icon-guanbi" @click="popupVisible = false"></i>
            </div>
            <div class="sel-info-money">
              ￥{{info.discountPrice | filterFixed}}元
            </div>
            <div class="sel-info-inventory">
              库存：{{info.stock}}
            </div>
          </div>
        </div>
        <div class="sel-info-sel">
          <!--保留-->
          <!--<div class="sel-info-select" v-for="(item,index) in selList" :key="index">-->
          <!--<div class="sel-title">-->
          <!--{{item.name}}：-->
          <!--</div>-->
          <!--<div class="sel-list clear">-->
          <!--<div class="sel-li" v-for="(item,index2) in item.selLi" :key="index2"-->
          <!--@click="active.splice(index,1,index2)"-->
          <!--:class="index2== active[index]?'activeClass':''">{{item}}-->
          <!--</div>-->
          <!--</div>-->
          <!--</div>-->
          <div class="sel-info-select" v-if="info.color">
            <div class="sel-title">
              颜色：
            </div>
            <div class="sel-list clear">
              <div class="sel-li" v-for="(item,index2) in colorList(info.color)" :key="index2"
                   @click="active.splice(0,1,index2)"
                   :class="index2== active[0]?'activeClass':''">{{item}}
              </div>
            </div>
          </div>
          <div class="sel-info-select" v-if="info.size">
            <div class="sel-title">
              尺寸：
            </div>
            <div class="sel-list clear">
              <div class="sel-li" v-for="(item,index2) in colorList(info.size)" :key="index2"
                   @click="active.splice(1,1,index2)"
                   :class="index2== active[1]?'activeClass':''">{{item}}
              </div>
            </div>
          </div>
          <div class="sel-info-count">
            <div class="sel-count-title">
              数量：
            </div>
            <div class="sel-minus-add">
              <div class="sel-minus" @click="minusCount">
                -
              </div>
              <div class="sel-count">
                {{orderInfo.count}}
              </div>
              <div class="sel-add" @click="addCount">
                +
              </div>
            </div>
          </div>
        </div>
        <div class="sel-info-button">
          <div class="sel-info-btn sel-info-addShop" @click="addShop">加入购物车</div>
          <div class="sel-info-btn sel-info-buy" @click="buyShop">立即购买</div>
        </div>
      </div>
    </mt-popup>
    <div class="orderDetail-button">
      <div class="orderDetail-home" @click="hrefName('home')">
        <i class="iconfont icon-shouye"></i>
      </div>
      <div class="orderDetail-kefu">
        <i class="iconfont icon-xiaoxi"></i>
      </div>
      <div class="orderDetail-shopcart" @click="hrefName('shopcart')">
        <i class="iconfont icon-gouwuche2"></i>
        购物车
        <span class="superscript">{{shopCount}}</span>
      </div>
      <div class="orderDetail-btn sel-info-addShop" @click="showPopup">加入购物车</div>
      <div class="orderDetail-btn sel-info-buy" @click="showPopup">立即购买</div>

    </div>
    <mt-popup v-model="postagePopup" popup-transition="popup-fade" position="bottom">
      <div class="popup-title">
        <div class="popup-title-cancel" @click="postagePopup = false">取消</div>
        <div class="popup-title-confirm" @click="confirmAddress">确定</div>
      </div>
      <mt-picker :slots="slots" @change="onValuesChange" ref="picker"></mt-picker>
    </mt-popup>
  </div>
</template>

<script>
  import homeHeader from '../../components/header/header.vue'
  import {filterParse, filterMainImg} from '../../mixins/filter'
  import {Toast} from 'mint-ui'
  import city from '../../mixins/city.js'

  export default {
    data() {
      return {
        plotData: {
          provinceValue: '',
          citiesValue: '',
        },
        areaPicker: null,
        newPlotData: {
          provinceValue: '请选择',
          citiesValue: '请选择',
        },
        postageMoney: 0,
        popupVisible: false,
        postagePopup: false,
        selected: '1',
        postageList: null,
        info: null,
        shopCount: 0,
        typeSel: '请选择',
        proId: null,
        orderInfo: {
          count: 1,
          stringArray: [],
        },
        slots: [
          {
            flex: 1,
            defaultIndex: 1,
            values: [],
            className: 'slot1',
            textAlign: 'center'
          }, {
            divider: true,
            content: '-',
            className: 'slot2'
          }, {
            flex: 1,
            values: [],
            className: 'slot3',
            textAlign: 'center'
          },
        ],
//        保留
//        selList: [
//          {
//            name: '尺寸',
//            selLi: ['S', 'M'],
//          },
//          {
//            name: '颜色',
//            selLi: ['红色', '黄色'],
//          }
//        ],
        selList: ['color', 'size'],
        selList2: ['颜色', '尺寸'],
        tagList: [
          {
            name: '原装进口',
            iconfont: 'icon-yewutubiaoquanqiu',
          },
          {
            name: '极速递',
            iconfont: 'icon-jisutuikuan',
          },{
            name: '商品细则',
            iconfont: 'icon-zhuyi',
          }],
        active: [0, 0, 0, 0],
        iconfontActive: false,
      }
    },
    components: {
      homeHeader,
    },
    filters: {
      filterParse,
      filterMainImg
    },
    methods: {
      gohome:function () {
        this.$router.push({path:'/home'})
      },
      goPreferential:function(){
        this.$router.push({path:'/myCoupons'})
      },
      showPopup() {
        let that = this;
        that.popupVisible = true;
        that.typeJson();
      },
      colorList(val) {
        return val.split('|');
      },
//新增购物车
      addShop() {
        let that = this;
        let memberId = that.localData('get', 'memberId') ? that.localData('get', 'memberId') : that.localData('get', 'tempMemberId') ? that.localData('get', 'tempMemberId') : '';
        that.typeJson();
        that.localProId();
        that.ajax({
          url: '/cart/add',
          method: 'post',
          data: {
            productId: that.proId,
            count: that.orderInfo.count,
            productText: that.typeSel,
            memberId: memberId
          },
          success: function (res) {
            Toast("添加购物车成功");
            if (res.data.cartProductDtoList[0].userId) {
//              Toast(res.data.cartProductDtoList[0].userId);
              let tempMemberId = res.data.cartProductDtoList[0].userId;
              that.localData('set', 'tempMemberId', tempMemberId);
              that.getShopCount();
              that.popupVisible = false;
            } else {
              Toast("添加购物车失败")
            }
          }
        })
      },
      //获取
      getPostage() {
        let that = this;
        let proId = that.$route.query.proId;
        that.ajax({
          url: '/ppf/list?productId=' + that.proId,
          success: function (res) {
            if (res.status == 1000) {
              that.postageList = res.data;
            }
          }
        })
      },
      typeJson() {
//        let that = this;
//        let typeSel = '[';
//        for (var i = 0, l = that.selList.length; i < l; i++) {
//          typeSel += '{"' + that.selList[i].name + '":';
//          typeSel += '"' + that.selList[i].selLi[that.active[i]] + '"}';
//          if (i < l - 1) {
//            typeSel += ',';
//          }
//        }
//        typeSel += ']';
        let that = this;
        let typeSel = '[';
        for (var i = 0, l = that.selList.length; i < l; i++) {
          let arr = that.info[that.selList[i]].split('|');
          typeSel += '{"' + that.selList2[i] + '":';
          typeSel += '"' + arr[that.active[i]] + '"}';
          if (i < l - 1) {
            typeSel += ',';
          }
        }
        typeSel += ']';
        that.typeSel = typeSel;
      },
      buyShop() {
        let that = this;
        that.localProId();
        that.typeJson();
        that.localData('set', 'count', that.orderInfo.count)
        that.localData('set', 'typeSel', that.typeSel)
        that.localData('set', 'proId', that.proId)
        that.$router.push({
          name: 'createOrder',
          query: {proId: that.proId, count: that.orderInfo.count, typeSel: that.typeSel}
        })
      },
      minusCount() {
        if (this.orderInfo.count > 1) {
          this.orderInfo.count--;
        }
      },
      addCount() {
        if (this.orderInfo.count < 100) {
          this.orderInfo.count++;
        }
      },
      localProId() {
        let that = this;
        let proId = that.$route.query.proId;
        if (proId) {
          that.localData('set', 'proId', proId);
        } else {
          proId = that.localData('get', 'proId');
        }
        that.proId = proId;
      },
      //获取详情
      getInfo() {
        let that = this;
        let proId = that.$route.query.proId;
        that.localProId();
        that.ajax({
          url: '/product/detail2?id=' + that.proId,
          success: function (res) {
            that.info = res.data;
          }
        })
      },
//      获取购物车数量
      getShopCount() {
        let that = this;
        var memberId = '';
        var tempMemberId = that.localData('get', 'tempMemberId');
        var tempMemberId2 = that.localData('get', 'memberId');
        if (tempMemberId) {
          memberId = tempMemberId;
        } else if (tempMemberId2) {
          memberId = tempMemberId2;
        } else {
          return;
        }
        that.ajax({
          url: '/cart/product/count?memberId=' + memberId,
          success: function (res) {
            if (res.data != null) {
              that.shopCount = res.data;
            }
          }
        })
      },
//      获取地址
      selAddress() {
        this.postagePopup = true;
        for (var i in city) { //加载时获取城市三级联动的省份列表
          this.slots[0].values.push(i);
        }
        var cityArr = city['北京'];
        if (this.newPlotData.provinceValue != '请选择') {
          cityArr = city[this.newPlotData.provinceValue]
        }
        var cityArrList = [];
        for (var i in cityArr) {
          cityArrList.push(i);
        }
        this.areaPicker.setSlotValues(1, cityArrList);
        this.areaPicker.setSlotValue(0, this.newPlotData.provinceValue);
        this.areaPicker.setSlotValue(1, this.newPlotData.citiesValue);
      },
      confirmAddress() {
        let that = this;
        that.postagePopup = false;
        that.newPlotData.provinceValue = that.plotData.provinceValue;
        that.newPlotData.citiesValue = that.plotData.citiesValue;
        that.ajax({
          url: '/ppf/getpostfee2',
          method: 'post',
          data: {
            productId: that.proId,
            quantity: that.orderInfo.count,
            province: that.newPlotData.provinceValue,
            city: that.newPlotData.citiesValue
          },
          success(res) {
            if (res.status = 1000) {
              that.postageMoney = res.data;
            }
          }
        })
      },
      onValuesChange(picker, values) {
        this.areaPicker = picker;
        if (this.postagePopup) {
          let cityArr = city[picker.getSlotValue(0)];
          var cityArrList = [];
          for (var i in cityArr) {
            cityArrList.push(i);
          }
          picker.setSlotValues(1, cityArrList);
          this.plotData.provinceValue = picker.getSlotValue(0);
          this.plotData.citiesValue = picker.getSlotValue(1);
        }
      },
    },
    created() {
      this.getInfo();
      this.getShopCount();
      this.getPostage();
      document.documentElement.scrollTop = 0;
    },
    mounted() {
      this.$nextTick(() => {
        this.slots[0].defaultIndex = 0
      });
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../style/minxin";

  .detail-main {
    padding: $top 0 $bottom;
  }

  .detail-main-image {
    width: 100%;
    height: 25rem;
    img {
      width: 100%;
      height:25rem;
    }
  }

  .detail-main-title {
    @include fj;
    flex-direction: row;
    padding:10px 15px 0 15px;
    background: $f;
    .detail-title {
      @include sh($med, 1.5rem);
      @include el(2);
      font-size: 0.8rem;
      font-weight: 600;
      flex: 1;
    }
    .detail-collect {
      border-left: 1px solid $border;
      @include sc($min, $gray);
      padding-left: 10px;
      text-align: center;
      .iconfont {
        display: block;
        @include wh(2rem, 2rem);
        background: url('../../assets/img/heart_03.png') no-repeat left -32px;
        background-size: cover;
      }
      .active {
        background-position: left 0px;
      }
    }
  }

  .detail-main-money {
    padding: 0 15px;
    @include sc($med, #f80000);
    font-size: 0.6rem;
    font-weight: 600;
    background: $f;
  }

  .detail-main-mon {
    padding: 5px 5px;
    background: $f;
    @include sc($med, $grey);
    span {
      text-decoration: line-through;
      margin-left: 10px;
      font-size: 0.6rem;
      font-weight: 600;
    }
  }

  .detail-main-sales {
    background: $f;
    padding: 2px 15px 10px;
    @include fj;
    @include sc($min, $grey);
    span{
      font-size: 0.6rem;
      font-weight: 600;
    }
  }
  .announcements{
    padding: 0 15px 7px;
    @include sc($min, $grey);
    color:#f80000;
    font-size: 0.6rem;
    line-height: 0.8rem;
    span{
      float:left;
      background:red;
      color:#fff;
      padding:0 0.3rem;
      border-radius: 0.6rem;
      margin-right: 0.8rem;
      line-height: 1rem;
      font-size: 0.6rem;
      line-height: 0.8rem;
    }
  }
  .detail-main-intro {
    margin-bottom: 10px;
    background: $f;
    .html-detail-inner {
      img {
        width: 100%;
      }
    }
    .html-detail-postage {
      padding: 10px;
      .tableTitle {
        display: flex;
        justify-content: center;
        .com {
          flex: 1;
          -webkit-flex: 1;
          text-align: center;
          border: 2px solid #000;
          font: 600 1.2rem/2rem '';
        }
      }
      ul {
        li {
          display: flex;
          justify-content: center;
          span {
            display: block;
            flex: 1;
            -webkit-flex: 1;
            text-align: center;
            border: 1px solid #000;
          }
        }
      }
    }
  }

  .detail-main-tag {
    padding:15px 0 0 20px;
    .detail-tag-list {
      .detail-tag-li{
        float: left;
        margin-right: $med;
        font-size: 0.6rem;
        line-height:1.2rem;
        color:#999;
        .iconfont {
          float: left;
          font-size: 1.7rem;
          margin-right: 4px;
          color:#101010;
        }
      }
    }

  }

  /*!*请选择*!
  .detail-main-sel {
    background: $f;
    margin-bottom: 10px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    position: relative;
    &:after {
      @include mid;
      right: 15px;
      display: block;
      content: '';
      @include wh(0.6rem, 0.6rem);
      transform-origin: 0.5rem -0.5rem;
      transform: rotateZ(45deg);
      border-right: 1px solid $grey;
      border-top: 1px solid $grey;
    }
    .detail-sel-left {
      padding: 15px;
    }
    .detail-sel-evaluate {
      padding: 15px;
      padding-left: 0;
      span {
        color: $red;
      }
    }
  }*/

  //优惠券
  .preferential{
    display: flex;
    justify-content: space-between;
    padding:0 1rem;
    i{
      font-size: 2rem;
      line-height: 2rem;
    }
    .receive{
      font-size: 0.8rem;
      line-height: 2rem;
      span{
        font-size: 0.82rem;
      }
    }
  }

  //选择运费
  .detail-main-postage {
    background: $f;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    padding: 15px;
    .detail-sel-title {
      display: flex;
      flex-direction: row;
      margin-right: 10px;
      font:600 0.8rem/1.2rem '';
      color:#101010;
      .option-title{
        font:600 0.8rem/1.2rem '';
        color:#101010;
      }
      &:last-child {
        margin-right: 0;
      }
    }
    .sel-option {
      text-align: center;
      border: 1px solid $border;
      margin-left: 10px;
      width: 4rem;
      overflow: hidden;
      border-radius: 5px;
      font:600 0.8rem/1.2rem '';
      color:#101010;
    }
    .detail-sel-postage {
      white-space: nowrap;
    }
  }
  .mineStore{
    display: flex;
    justify-content: space-between;
    padding:0 15px;
    .logo{
      display: flex;
      justify-content: flex-start;
      img{
        width:2.45rem;
        height:2.45rem;
        border-radius: 50%;
        margin-right:0.5rem;
      }
      span{
        font-size: 0.8rem;
        line-height: 2.45rem;
        font-weight: 600;
      }
    }
    .storeBtn{
      padding-top:0.2rem;
      span{
        line-height: 2.4rem;
        padding:0.1rem 0.5rem;
        color:#fff;
        border-radius: 0.5rem;
        font-size: 0.65rem;
        background:#f80000;
      }
    }
  }

  //货嚯推荐
  .storeRecommended{
    h4{
      text-align: center;
      font-size:0.8rem;
      line-height: 1.5rem;
      padding:2rem 0;
    }
    .recommendedShop {
      display: block;
      overflow-x: scroll;
      overflow-y: hidden;
      overflow-scrolling: touch;
      .recommendedShop-list {
        overflow-x: scroll;
        overflow-y: hidden;
        overflow-scrolling: touch;
        padding: 5px 0 0 15px;
        display: flex;
        flex-direction: row;
        .recommendedShop-inner {
          padding: 0 15px 5px 0;
        }
        .recommendedShop-li {
          width: 8rem;
          box-shadow: 0px 1px 5px 0px rgba(170, 170, 170, 1);
        }
      }
    }
  }

  //选择弹窗
  .sel-info {
    @include wh(100vw, 60vh);
    background: $f;
    .sel-info-title {
      padding: 15px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      border-bottom: 1px solid $border;
      position: relative;
      z-index: 999;
      .sel-info-image {
        @include wh(6rem, 6rem);
        img {
          @include wh(6rem, 6rem);
        }
      }
      .sel-info-item {
        padding-left: 10px;
        flex: 1;
        position: relative;
        @include sh($med, 1.5rem);
        .sel-info-name {
          @include sh($med, 1.5rem);
          @include el(2);
          height: 3rem;
          padding-right: 22px;
          .iconfont {
            position: absolute;
            top: 0;
            right: 0;
            @include sh(1.6rem, 1em);
          }
        }
      }
    }
    .sel-info-sel {
      padding: 15px 15px 0;
      overflow-y: scroll;
      position: absolute;
      top: 8rem;
      bottom: $med * 4;
      .sel-title {

      }
      .sel-list {
        padding: 10px 0;
        .sel-li {
          float: left;
          border: 1px solid $border;
          border-radius: 5px;
          padding: 5px 10px;
          min-width: 2rem;
          min-height: 2rem;
          margin-right: 10px;
          margin-bottom: 10px;
        }
        .activeClass {
          border: 1px solid $red;
          color: $red;
        }
      }
    }
    .sel-info-button {
      @include fj;
      padding: 10px;
      background: $border;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      .sel-info-btn {
        flex: 1;
        text-align: center;
        border-radius: 5px;
        @include sh($med, 2.6em);
        color: $f;

      }

    }
    .sel-count-title {
      padding-bottom: 10px;
    }
    .sel-minus-add {
      display: flex;
      flex-direction: row;
      @include sh($med, 2em);
      text-align: center;
      .sel-minus {
        width: 2.2rem;
        border: 1px solid $border;
      }
      .sel-count {
        border-top: 1px solid $border;
        border-bottom: 1px solid $border;
        min-width: 3.4rem;
      }
      .sel-add {
        border: 1px solid $border;
        width: 2.2rem;
      }
    }
  }

  /*公共样式*/
  .sel-info-addShop {
    background: rgb(244, 162, 19);
    margin-right: 10px;
  }

  .sel-info-buy {
    background: $red;
  }

  .orderDetail-button {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 10px;
    @include fj;
    flex-direction: row;
    border-top: 1px solid $border;
    background: $border;
    .orderDetail-home {
      margin-right: 14px;
      display: flex;
      align-items: center;
      @include sh(0.6rem, 1em);
      position: relative;
      .iconfont {
        @include sh($min *2, 1em);
        text-align: center;
      }
    }
    .orderDetail-shopcart {
      margin-right: 14px;
      display: flex;
      flex-direction: column;
      @include sh(0.6rem, 1em);
      position: relative;
      .iconfont {
        @include sh($min *2, 1em);
        text-align: center;
      }
      .superscript {
        position: absolute;
        display: block;
        @include wh(1rem, 1rem);
        top: 0;
        right: 0;
        background: red;
        color: $f;
        text-align: center;
        border-radius: 100%;
        line-height: 1rem;
      }
    }
    .orderDetail-kefu {
      margin-right: 14px;
      display: flex;
      align-items: center;
      @include sh(0.6rem, 1em);
      position: relative;
      .iconfont {
        @include sh($min *2, 1em);
        text-align: center;
      }
    }
    .orderDetail-btn {
      flex: 1;
      text-align: center;
      border-radius: 5px;
      @include sh($med, 2.6em);
      color: $f;
    }

  }
</style>
