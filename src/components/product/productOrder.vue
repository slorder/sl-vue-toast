<template>
  <!--订单列表组件-->
  <div class="create-product-list">
    <div class="create-product-image">
      <img v-if="item.stringArray" :src="item.stringArray | filterMainImg" alt="">
      <img v-else :src="imgHost + item.productImage" alt="">
      <div class="create-product-name">
        {{item.productName}}
      </div>
    </div>
    <div class="create-product-content">
      <div class="create-product-money">
        <span class="total-money" v-if="item.productPrice2">￥{{item.productPrice2 | filterFixed}}元</span>
        <span class="total-money"
              v-if="item.productPrice && !item.productPrice2">￥{{item.productPrice | filterFixed}}元</span>
        <span class="total-money" v-if="item.discountPrice">￥{{item.discountPrice | filterFixed}}元</span>
      </div>
      <div class="create-product-count">
        <span v-if="item.quantity">×{{item.quantity}}</span>
        <span v-if="item.count">×{{item.count}}</span>
        <span v-if="item.productAmount">×{{item.productAmount}}</span>
        <!--<span class="total-count" v-if="item.productText">&nbsp;{{item.productText | filterParse}}</span>-->
        <span v-else>&nbsp;{{item.typeSel | filterParse}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {filterParse, filterMainImg} from '../../mixins/filter'

  export default {
    props: ['item'],
    filters: {
      filterParse,
      filterMainImg
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../style/minxin";

  .create-product-list {
    display: flex;
    flex-direction: row;
    justify-content:space-between;
    padding: 4px 0 4px 0.8rem;
    .create-product-image {
      display: flex;
      justify-content: space-between;
      @include wh(14rem, 5rem);
      img {
        @include wh(5rem, 5rem);
      }
      .create-product-name {
        width:8.5rem;
        @include sh(0.8em, 1.3em);
        height: 2.6em;
        @include el(2);
        font-weight: 600;
        color:#101010;
      }
    }
    .create-product-content {
      display: flex;
      padding-right:1rem;
      flex-direction: column;
      justify-content: space-between;
      .create-product-count, .create-product-money {
        @include sc($min, $grey);
        padding-top: 5px;
        text-align: right;
        .total-count {
          color: #797979;
          font-weight: 600;
        }
        .total-money {
          color: #797979;
          font-weight: 600;
        }
      }
    }
  }

</style>
