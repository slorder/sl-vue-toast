<template>
  <!--支付确定-->
  <div class="pay-popup">
    <mt-popup v-model="payPopupShow" position="bottom" class="pay-mt-popup">
      <div class="pay-popup">
        <div class="pay-title">
          <div class="pay-title-cancel" @click="clickShow">
            取消
          </div>
          确认付款
        </div>
        <div class="pay-content">
          <div class="pay-money">
            <div class="pay-money-title">加油卡购买</div>
            <div class="pay-money-val">￥{{}}</div>
            <div class="pay-money-refer">￥{{}}</div>
          </div>
          <div class="pay-price">
            <div class="pay-price-title">优惠金额</div>
            <div class="pay-price-count">￥{{}}</div>
          </div>
          <div class="pay-type">
            <div class="pay-type-title">付款方式</div>
            <div class="pay-type-content" @click="addActive=true">
              <div class="pay-type-img">
                <img src="../../assets/img/ABC.png" alt="">
              </div>
              <div class="pay-type-right">
                <div class="type-right-title">
                  {{}}
                </div>
                <div class="type-right-num">
                  {{}}
                </div>
              </div>
            </div>
          </div>
          <div class="pay-type-button">
            <div class="pay-type-btn">确认支付</div>
          </div>
          <div class="pay-type-notice">
            支持银行卡支付
          </div>
        </div>
      </div>
      <!--添加银行卡-->

      <div class="pay-popup popup-add-pay" :class="addActive?'moveLeft':'moveRight'">
        <div class="pay-title">
          <div class="pay-title-cancel" @click="addActive=false">
            返回
          </div>
          选择付款方式
        </div>
        <div class="pay-content">
          <div class="pay-type">
            <div class="pay-type-content">
              <div class="pay-type-img">
                <img src="../../assets/img/ABC.png" alt="">
              </div>
              <div class="pay-type-right">
                <div class="type-right-title">
                  {{}}
                </div>
                <div class="type-right-num">
                  {{}}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="pay-add-code">
          使用新卡支付
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        addActive: false,
      }
    },
    computed: {

    },
    components: {},
    methods: {
      clickShow(){

      }
    },
    mounted() {

    }
  }
</script>

<style lang="scss" scoped>
  @import "../../style/minxin";

  $border: #ccc;
  $size: 1rem;

  /*支付弹窗*/
  .mint-popup {
    height: 75%;
    font-family: "Microsoft Yahei";
    font-weight: 100;
    .pay-popup {
      height: 100%;
      background: #F8F8F8;
      width: 100vw;
      .pay-title {
        border-bottom: 0.5px solid $border;
        text-align: center;
        @include sh($max, 3.6rem);
        position: relative;
        .pay-title-cancel {
          position: absolute;
          left: 0;
          top: 0;
        }
      }
      .pay-content {
        padding: 0 0.5rem;
        .pay-money {
          text-align: center;
          border-bottom: 1px solid $border;
          .pay-money-title {
            @include sh(1.2rem, 2.2em);
          }
          .pay-money-val {
            @include sh(1.4rem, 2.8rem);
          }
          .pay-money-refer {
            @include sh(0.9rem, 2.6rem);
            color: #bbb;
            text-decoration: line-through;
          }
        }
        .pay-price {
          @include fj;
          flex-direction: row;
          border-bottom: 0.5px solid $border;
          @include sh($size, $min*3);
          .pay-price-count {
            color: red;
          }
        }
        .pay-type {
          .pay-type-title {
            @include sh(0.98rem, 0.98rem);
            padding-top: 1rem;
          }
          .pay-type-content {
            display: flex;
            flex-direction: row;
            padding: 1rem 0 0.6rem;
            border-bottom: 1px solid $border;
            .pay-type-img {
              padding-left: 1rem;
              @include wh(3.8rem, 2.8rem);
              img {
                @include wh(2.6rem, 2.6rem);
              }
            }
            .pay-type-right {
              display: flex;
              flex-direction: column;
              padding-left: 1.6rem;
              flex: 1;
              justify-content: space-between;
              .type-right-title, .type-right-num {
                font-size: $size;
              }
            }
          }
        }
        .pay-type-button {
          padding: 1.2rem 0.5rem 0.2rem;
          .pay-type-btn {
            @include wh(100%, 3rem);
            @include sh(1.1rem, 3rem);
            border: 0.5px solid #00a0e9;
            color: #00a0e9;
            border-radius: 5px;
            text-align: center;
            font-weight: 100;
          }
        }
        .pay-type-notice {
          text-align: center;
          @include sc($min, $gray);
        }
      }
      /*选择付款方式*/
      .pay-content {
        min-height: 30vh;
      }
      .pay-add-code {
        @include sh(1.24rem, 4rem);
        background: $f;
        text-align: center;
        font-weight: 100;
      }

    }
  }

  .pay-mt-popup {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .popup-add-pay {
      height: 100%;
      position: absolute;
      left: 100vw;
      top: 0;
    }
    .moveLeft {
      transform: translateX(-100%);
      transition: transform 0.3s;
    }
    .moveRight{
      transform: translateX(0);
      transition: transform 0.3s;
    }
  }
</style>
