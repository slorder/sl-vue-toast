<template>
  <!--商品主图展示组件-->
  <div @click="$router.push({name:'proDetail',query:{proId:item.id}})" class="product-block">
    <div class="home-like-image">
      <img :src="item.stringArray | filterMainImg" alt="">
    </div>
    <div class="home-like-name">
      {{item.productName}}
    </div>
    <div class="home-like-money">
      <span class="money-line nowarp">￥{{item.salesPrice | filterFixed}}元</span><span
      class="money-sale nowarp">￥{{item.discountPrice | filterFixed}}元</span>
    </div>
  </div>
</template>

<script>
  import {filterMainImg} from '../../mixins/filter'

  export default {
    props: ['item'],
    filters: {
      filterMainImg
    }
  }
</script>

<style lang="scss">
  @import "../../style/minxin";

  $b: #f0f0f0;
  $imgW: 165rem/15;

  .product-block {
    width: $imgW;
    //列表
    .home-like-image {
      width: $imgW;
      background: $f;
      img {
        width: $imgW;
        height: $imgW;
      }
    }

    .home-like-name,.home-like-money{
      padding: 5px;
    }

    .home-like-name {
      display: block;
      @include sh($min, 20rem/12rem);
      height: $med*3;
      overflow: hidden;
      text-align: left;
      background: $f;
      @include el(2);
    }

    .home-like-money {
      background: $f;
      @include fj(flex-start);
      flex-direction: row;
      line-height: 23rem/15;
      .money-line {
        @include sc($min, $grey);
        text-decoration: line-through;
        padding-right: 12px;
      }
      .money-sale {
        @include sc($min, $red);
      }
    }
  }


</style>
