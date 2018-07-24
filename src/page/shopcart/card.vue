<template>
  <!--购物车-->
  <div id="card" :class="{'classActive':manageStatus}">
    <home-header :title="'购物车'"></home-header>
    <div class="card-manage">
      <div class="card-manage-logo">
        <i></i><span>货嚯商城</span>
      </div>
      <div class="card-manage-btn" @click="manageActive">
        {{manageStatus ? '管理' : '完成'}}
      </div>
    </div>
    <div class="card-main delete" v-if="infoList && infoList.length != 0">
      <div class="card-main-list">
        <div class="card-main-li list-item" v-for="(item,index) in infoList" :key="index" data-type="0">
          <div class="list-box" @touchstart.capture="touchStart" @touchmove.capture="touchMove"
               @touchend.capture="touchEnd" :data-index="index">
            <div class="card-li-sel">
            <span class="sel-total" :class="item.productChecked == 1?'iconfonts':''"
                  @click="selRadio(index)"></span>
            </div>
            <div class="card-li-item">
              <div class="card-li-top">
                <div class="card-li-image" @click="$router.push({name:'proDetail',query:{proId:item.productId}})">
                  <img :src="item.stringArray | filterMainImg" alt="">
                </div>
                <div class="card-li-content">
                  <div class="card-li-title" @click="$router.push({name:'proDetail',query:{proId:item.productId}})">
                    {{item.productName}}
                  </div>
                  <div class="card-li-subtitle" @click="$router.push({name:'proDetail',query:{proId:item.productId}})">
                    <div class="card-subtitle-name">{{ item.productText | filterParse}}</div>
                  </div>
                  <div class="card-li-money">
                    <div class="card-li-sale">￥{{item.productPrice | filterFixed}}元</div>
                    <div class="card-li-count" v-show="manageStatus">x{{item.quantity}}</div>
                    <div class="card-li-count" v-show="!manageStatus">
                      <div class="sel-minus-add">
                        <div class="sel-minus" @click="minusCount(index)">
                          -
                        </div>
                        <div class="sel-count">
                          {{item.quantity}}
                        </div>
                        <div class="sel-add" @click="addCount(index)">
                          +
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="remove delete" ref='remove' @click="deleteItem" :data-index="index">
            删除
          </div>
        </div>
      </div>
      <div class="card-main-totel clear">
        <div class="sel-total-label" @click="selCheck()">
          <div class="sel-total" :class="{iconfonts:selTotalClass}"></div>
          全选
        </div>
        <p v-show="manageStatus">合计：<span>￥{{infoList[0].productTotalPrice | filterFixed}}元</span><br/><i>不含运费</i></p>
        <div class="card-main-settle" v-show="manageStatus">
          <submitBtn @click.native="settle()" :min="true" :title="'立即结算'"></submitBtn>
        </div>
        <div class="card-total-del" v-show="!manageStatus">
          删除
        </div>
      </div>
    </div>
    <div class="card-main card-main-else" v-else>
      <div class="submit-button">
        <submit-btn :min="true" :title="'去逛逛吧'" @click.native="hrefName('classify')"></submit-btn>
      </div>
      <div class="card-logo-footer">
        <logo-footer></logo-footer>
      </div>
    </div>
  </div>
</template>

<script>
  import homeHeader from '../../components/header/header.vue'
  import submitBtn from '../../components/button/submitBtn.vue'
  import logoFooter from '../../components/footer/logoFooter.vue'
  import {filterParse, filterMainImg} from '../../mixins/filter'
  import {Toast, MessageBox} from 'mint-ui'

  export default {
    data() {
      return {
        totalCount: '1',
        infoList: null,
        attribute: null,
        selTotalClass: true,
        ajaxLoading: true,
        sellteStop: false,
        startX: 0,
        endX: 0,
        manageStatus: true
      }
    },
    components: {
      homeHeader,
      submitBtn,
      logoFooter
    },
    filters: {
      filterParse,
      filterMainImg
    },
    methods: {
      //全选按钮
      manageActive() {
        this.manageStatus = !this.manageStatus;
        this.skip();
      },
      //重置
      skip() {
        if (this.checkSlide()) {
          this.restSlide();
        }
      },
      //滑动开始
      touchStart(e) {
        // 记录初始位置
        let parentElement = e.currentTarget.parentElement;
        let removeW = this.$refs.remove[0].offsetWidth;
        this.startX = e.touches[0].clientX;
        if (parentElement.dataset.type == 1) {
          this.startX = this.startX + removeW;
        } else {
          this.restSlide();
        }
      },
      touchMove(e) {
        // 当前滑动的父级元素
        let parentElement = e.currentTarget.parentElement;
//        // 记录结束位置
        let endX = e.changedTouches[0].clientX;
        let removeW = this.$refs.remove[0].offsetWidth;
        let moveX = this.startX - endX;
        let index = e.currentTarget.dataset.index;
        let listItems = document.querySelectorAll('.list-item');
//        console.log(this.$refs.remove)
        console.log(this.startX + ':' + endX + ':' + index + ':' + removeW);
        if (moveX <= 0) {
          listItems[index].style.transform = "translateX(0px)";
        } else if (moveX > 0) {
          if (moveX > removeW) {
            listItems[index].style.transform = "translateX(-" + removeW + "px)";
          } else {
            listItems[index].style.transform = "translateX(-" + moveX + "px)";
            console.log(111111)
          }
        }

//        // 左滑
//        if (parentElement.dataset.type == 0 && this.startX - this.endX > 30) {
//          this.restSlide();

//          parentElement.dataset.type = 1;
//        }
//        // 右滑
//        if (parentElement.dataset.type == 1 && this.startX - this.endX < -30) {
//          this.restSlide();
//          parentElement.dataset.type = 0;
//        }
//        this.startX = 0;
//        this.endX = 0;
      },
      //滑动结束
      touchEnd(e) {
        // 当前滑动的父级元素
        let parentElement = e.currentTarget.parentElement;
        let removeW = this.$refs.remove[0].offsetWidth;
        let index = e.currentTarget.dataset.index;
        // 记录结束位置
        this.endX = e.changedTouches[0].clientX;
        // 左滑
        console.log(this.startX - this.endX)
        if (this.startX - this.endX > removeW / 2) {
          console.log(1)
          this.restSlide(index);
//          parentElement.dataset.type = 1;
        }
        // 右滑
        if (this.startX - this.endX < removeW / 2) {
          console.log(2)
          this.restSlide();
//          parentElement.dataset.type = 0;
        }
        this.startX = 0;
        this.endX = 0;
      },
      //判断当前是否有滑块处于滑动状态
      checkSlide() {
        let listItems = document.querySelectorAll('.list-item');
        for (let i = 0; i < listItems.length; i++) {
          if (listItems[i].dataset.type == 1) {
            return true;
          }
        }
        return false;
      },
      //复位滑动状态
      restSlide(index) {
        let listItems = document.querySelectorAll('.list-item');
        // 复位
        for (let i = 0; i < listItems.length; i++) {
          let removeW = this.$refs.remove[0].offsetWidth;
          if (index == i) {
            listItems[i].dataset.type = 1;
            listItems[index].style.transform = "translateX(-" + removeW + "px)";
          } else {
            listItems[i].dataset.type = 0;
            document.getElementsByClassName('list-item')[i].style.transform = "translateX(0px)";
          }
        }
      },
      //删除
      deleteItem(e) {
        // 当前索引
        let index = e.currentTarget.dataset.index;
        // 复位
        this.restSlide();
        MessageBox.confirm('确定执行此操作?').then(action => {
          this.infoList.splice(index, 1);
          this.postDel(this.infoList[index].productId, this.infoList[index].productText);
        })
      },
      settle() {
        let that = this;
        that.showAllSel();
        if (that.sellteStop) {
          that.$router.push({name: 'orderCart'});
        } else {
          Toast('请选择物品');
        }
      },
      minusCount(index) {
        if (this.infoList[index].quantity > 1) {
          this.infoList[index].quantity--;
          this.postCount(this.infoList[index].productId, this.infoList[index].quantity, this.infoList[index].productText);
        }
      },
      addCount(index) {
        if (this.infoList[index].quantity < 100) {
          this.infoList[index].quantity++;
          this.postCount(this.infoList[index].productId, this.infoList[index].quantity, this.infoList[index].productText);
        }
      },
      postDel(productId, productText) {
        let that = this;
        that.ajax({
          url: '/cart/remove',
          method: 'post',
          data: {
            memberId: that.localData('get', 'memberId') ? that.localData('get', 'memberId') : that.localData('get', 'tempMemberId'),
            productId: productId,
            productText: productText
          },
          success: function (res) {
            if (res.status = 1000) {
              that.getList();
            }
          }
        })
      },
      postCount(proId, count, productText) {
        let that = this;
        let memberId = that.localData('get', 'memberId') ? that.localData('get', 'memberId') : that.localData('get', 'tempMemberId');
        setTimeout(function () {
          that.ajax({
            url: '/cart/add',
            method: 'post',
            data: {
              productId: proId,
              count: count,
              productText: productText,
              memberId: memberId
            },
            success: function (res) {
//              if (res.data.cartProductDtoList[0].userId) {
//              that.getList();
//              }
            }
          })
        }, 200)
      },
//获取购物车
      getList() {
        let that = this;
        let memberId = that.localData('get', 'memberId') ? that.localData('get', 'memberId') : that.localData('get', 'tempMemberId');
        if (memberId == null) {
          return;
        }
        this.$nextTick(function () {
          that.ajax({
            url: '/cart/list?memberId=' + memberId,
            success: function (res) {
              if (res.status == 1000) {
                that.infoList = res.data.cartProductDtoList;
                let attribute = '';
                for (var i = 0, l = that.infoList.length; i < l; i++) {
                  for (var key in that.infoList[i]) {
                    attribute += key + ':' + that.infoList[i][key] + '';
                  }
                }
                that.attribute = attribute;
                that.showAllSel()
              }
            }
          })
        })
      },
      //单选
      selRadio(index) {
        let that = this;
        if (this.ajaxLoading) {
          if (this.infoList[index].productChecked == 1) {
            this.infoList[index].productChecked = 0
          } else {
            this.infoList[index].productChecked = 1
          }
          that.ajax({
            url: '/cart/checked',
            method: 'post',
            data: {
              productId: that.infoList[index].productId,
              memberId: that.localData('get', 'memberId') ? that.localData('get', 'memberId') : that.localData('get', 'tempMemberId'),
              productText: that.infoList[index].productText,
              checked: that.infoList[index].productChecked
            },
            success: function (res) {

            }
          })
          that.showAllSel();
        }
      },
      showAllSel() {
        var listLength = 0;
        for (var i = 0, l = this.infoList.length; i < l; i++) {
          if (this.infoList[i].productChecked == 0) {
            this.selTotalClass = false;
            listLength++;
          }
        }
        this.sellteStop = true;
        this.selTotalClass = true;
        if (listLength == this.infoList.length) {
          this.sellteStop = false;
          this.selTotalClass = false;
        }
      },
      //全选
      selCheck() {
        let that = this;
        if (this.infoList[0].productChecked == 1) {
          for (var i = 0, l = this.infoList.length; i < l; i++) {
            this.infoList[i].productChecked = 0;
          }
          this.selTotalClass = false
        } else {
          for (var i = 0, l = this.infoList.length; i < l; i++) {
            this.infoList[i].productChecked = 1
          }
          this.selTotalClass = true
        }
        that.ajax({
          url: '/cart/checkedAll/orNot',
          method: 'post',
          data: {
            memberId: that.localData('get', 'memberId') ? that.localData('get', 'memberId') : that.localData('get', 'tempMemberId'),
            productId: '',
            checked: that.selTotalClass ? '1' : '0'
          },
          success: function (res) {

          }
        })
      }
    },
    created() {
      this.getList()
    },
    updated() {
      if (this.infoList) {
        var total = 0;
        var count = 0;
        for (var i = 0, l = this.infoList.length; i < l; i++) {
          if (this.infoList[i].productChecked == 1) {
            total += this.infoList[i].productPrice * this.infoList[i].quantity;
            count += this.infoList[i].quantity;
          }
        }
        try {
          this.infoList[0].productTotalPrice = total;
          this.totalCount = count;
        } catch (err) {

        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  /*侧滑*/
  .list-item {
    position: relative;
    height: 9rem;
    -webkit-transition: all 0.2s;
    transition: all 0.2s;
  }

  .list-item[data-type="0"] {
    transform: translate3d(0, 0, 0);
  }

  .list-item[data-type="1"] {
    transform: translate3d(-6rem, 0, 0);
  }

  .list-item:after {
    content: " ";
    position: absolute;
    left: 0.2rem;
    bottom: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid #ccc;
    color: #ccc;
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    z-index: 2;
  }

  .list-box {
    padding: 1rem;
    background: #fff;
    display: flex;
    align-items: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    justify-content: flex-start;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    font-size: 0;
  }

  .list-item .list-img {
    display: block;
    width: 9rem;
    height: 9rem;
  }

  .list-item .list-content {
    /*padding: 0.1rem 0 0.1rem 0.2rem;*/
    position: relative;
    flex: 1;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    overflow: hidden;
  }

  .list-item .title {
    display: block;
    color: #333;
    overflow: hidden;
    font-size: 15px;
    font-weight: bold;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .list-item .tips {
    display: block;
    overflow: hidden;
    font-size: 12px;
    color: #999;
    line-height: 20px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .list-item .time {
    display: block;
    font-size: 12px;
    position: absolute;
    right: 0;
    top: 0.1rem;
    color: #666;
  }

  .list-item .delete {
    width: 6rem;
    height: 9rem;
    background: #ff4949;
    font-size: 17px;
    color: #fff;
    text-align: center;
    line-height: 9rem;
    position: absolute;
    top: 0;
    right: -6rem;
  }

  @import "../../style/minxin";

  #card {
    box-sizing: border-box;
    width: 100%;
    min-height: 100%;
  }

  .card-manage {
    position: fixed;
    top: $top;
    left: 0;
    right: 0;
    z-index: 999;
    @include fj;
    flex-direction: row;
    padding: 0.933rem $med;
    background: $f;
    border-bottom: 1px solid $border;
    .card-manage-logo {
      @include fj;
      flex-direction: row;
      i {
        display: flex;
        @include wh(21rem/15, 21rem/15);
        border-radius: 100%;
        background: url("../../assets/img/logo.jpg") no-repeat;
        background-size: contain;
      }
      span {
        padding-left: 10px;
      }
    }
  }

  .card-main {
    padding: $top*2 0 $bottom*2;
    .iconfonts {
      background: $red;
    }
  }

  .card-main-totel {
    position: fixed;
    bottom: $bottom;
    background: $f;
    padding: 10px;
    width: 100vw;
    z-index: 9999;
    @include sh($med, 1em);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: $gray;
    border-top: 1px solid $border;
    p {
      @include sh($med, 18rem/15);
      flex: 1;
      padding-left: $med;
      span {
        color: $red;
      }
      i {
        color: $grey;
      }
    }
    .sel-total-label {
      position: relative;
      padding-left: 1.2rem;
      @include sh($med, 36rem/15);
      width: 3.2rem;
      .sel-total {
        @include wh(16px, 16px);
        border: 2px solid $border;
        border-radius: 100%;
        margin-right: 10px;
        @include mid;
        left: 0;
      }
    }
    .card-main-settle {
      @include wh(105rem/15, 32rem/15);
      letter-spacing: 1px;
    }
    .card-total-del {
      position: absolute;
      right: 10px;
      border: 1px solid $border;
      @include sh($med, 36rem/15);
      border-radius: 5px;
      padding: 0 10px;
    }
  }

  .card-main-li {
    @include fj;
    flex-direction: row;
    background: $f;
    border-bottom: 1px solid $border;
    padding: 8px 10px;
    .card-li-sel {
      width: 20px;
      position: relative;
      .sel-total {
        @include mid;
        @include wh(16px, 16px);
        border: 2px solid $border;
        border-radius: 100%;
      }
    }
    .card-li-item {
      flex-direction: column;
      flex: 1;
    }
    .card-li-top {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .card-li-image {
        @include wh(6rem, 6rem);
        img {
          @include wh(6rem, 6rem);
        }
      }
      .card-li-content {
        padding-left: 10px;
        @include fj;
        flex-direction: column;
        flex: 1;
        .card-li-title {
          @include el(2);
          @include sh($med, 23rem/15);
          height: 3.067rem;
        }
        .card-li-subtitle {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          @include sc(11rem/15, $grey);
          height: 1.533rem;
          line-height: 1.533rem;
        }
        .card-li-money {
          @include fj();
          flex-direction: row;
          @include sc(11rem/15, $gray);
          height: 1.533rem;
          line-height: 1.533rem;
          .card-li-sale {
            @include sc(11rem/15, $red);
          }
        }
      }
    }
    .card-li-count {
      @include fj;
      //加减器
      .sel-minus-add {
        display: flex;
        flex-direction: row;
        border: 1px solid $border;
        @include sh($med, 20rem/15);
        text-align: center;
        .sel-minus {
          width: 2.2rem;
        }
        .sel-count {
          border-right: 1px solid $border;
          border-left: 1px solid $border;
          min-width: 3.4rem;
        }
        .sel-add {
          width: 2.2rem;
        }
      }
    }
  }

  .card-main-else {
    position: absolute;
    width: 100vw;
    height: 90vh;
    .submit-button {
      @include center;
      @include wh(105rem/15, 32rem/15);
    }
    .card-logo-footer {
      @include cen;
      bottom: 10px;
    }
  }

  .classActive {

  }

</style>
