<template>
  <!--管理收货地址-->
  <div id="manager" class="left">
    <!--<home-header :title="'管理收货地址'" :back="true"></home-header>-->
    <div class="head-title">
      <span class="iconfont icon-fanhui goback" @click="goback"></span>
      收货地址
    </div>
    <div class="content" v-if="inShow">
      <div class="img"></div>
      <p>您还没有收货地址，快去添加吧！</p>
      <div class="newAddress" @click="$router.push({path:'/addressInfo'})">添加收货地址</div>
    </div>
    <div class="addList" v-if="listShow">
      <ul class="addressList">
        <li class="list-item" v-for="(item,index) in list" data-type="0">
          <!--<div class="address-left" @click="selectDefault(index)">
            <div class="selectCheck">
              <span :class="item.checked==1?'theDefault':''"></span>
            </div>
            <div class="userInfo" @click="selectAddress(index)">
              <p>
                <label>{{item.receiverName}}</label>
                <span>{{item.receiverMobile}}</span>
              </p>
              <p class="detailTxt">
                {{item.receiverProvince}}省{{item.receiverCity}}市{{item.receiverDistrict}}{{item.receiverAddress}}</p>
            </div>
          </div>
          <span class="edit" @click="editAddress(index)"><i class="iconfont icon-bianji1"></i></span>-->
          <div class="listContent" @touchstart.capture="touchStart" @touchend.capture="touchEnd">
            <div class="address-left" @click="selectDefault(index)">
              <div class="selectCheck">
                <span :class="item.checked==1?'theDefault':''"></span>
              </div>
              <div class="userInfo" @click="selectAddress(index)">
                <p>
                  <label>{{item.receiverName}}</label>
                  <span>{{item.receiverMobile}}</span>
                </p>
                <p class="detailTxt">
                  {{item.receiverProvince}}省{{item.receiverCity}}市{{item.receiverDistrict}}{{item.receiverAddress}}
                </p>
              </div>
            </div>
            <span class="edit" @click="editAddress(index)"><i class="iconfont icon-bianji1"></i></span>
          </div>
          <div class="lateralDelete" @click="deletAddress(index)">删除</div>
        </li>
      </ul>
      <div class="addNew" @click="addNewAddress()"><span>+</span><a>新建收货地址</a></div>
    </div>
  </div>
</template>

<script>
  import homeHeader from '../../components/header/header.vue'
  import submitBtn from '../../components/button/submitBtn.vue'
  import {Toast} from 'mint-ui'

  export default {
    data() {
      return {
        inShow: false,
        listShow: true,
        addressInfo: {},
        list: []
      }
    },
    components: {
      homeHeader
    },
    created() {
      //初始化获取收获地址列表
      this.inIt();
    },
    methods: {
      goback:function(){
        this.$router.go(-1);
      },
      inIt() {
        //初始状态清除localStorage，避免点击添加收获地址时，添加地址页面会受到编辑地址时的影响保留之前的编辑时的记录
        let that = this;
        var memberId = that.localData('get',"memberId");
        that.localData('remove','name');
        that.localData('remove','phone');
        that.localData('remove','province');
        that.localData('remove','city');
        that.localData('remove','district');
        that.localData('remove','detialDress');
        that.localData('remove','shippingId');
        that.ajax({
          url: '/shipping/getList?memberId=' + memberId,
          success: function (res) {
            that.list = res.data;
          }
        })
      },
      //切换默认收货地址
      selectDefault:function (val) {
        let that=this;
        var memberId = that.localData('get',"memberId");
        that.ajax({
          url: '/shipping/checked',
          method: 'post',
          data: {
            shippingId: that.list[val].id
          },
          success: function (res) {
            var status = res.status;
            if (status == 1000) {
              that.ajax({
                url: '/shipping/getList?memberId=' + memberId,
                success: function (res) {
                  that.list = res.data;
                }
              })
            }
          }
        })
      },
      //订单确认页以及待付款页更换收货地址
      selectAddress(val) {
        let that = this;
        let goto = that.$route.query.goto;
        if (goto == 1) {
          that.addressInfo = {
            address: {
              name: that.list[val].receiverName,
              phone: that.list[val].receiverMobile,
              content: that.list[val].receiverProvince + '省' + that.list[val].receiverCity + '市' + that.list[val].receiverDistrict + that.list[val].receiverAddress
            }
          };
          that.ajax({
            url: '/shipping/checked',
            method: 'post',
            data: {
              shippingId: that.list[val].id
            },
            success: function (res) {
              var status = res.status;
              if (status == 1000) {
                Toast(res.msg)
                var proId = that.localData('get',"proId");
                var count = that.localData('get',"count");
                var typeSel = that.localData('get',"typeSel")
                that.$router.push({path: '/createOrder', query: {proId: proId, count: count, typeSel: typeSel}})
              }
            }
          })
        } else if (goto == 2) {
          that.addressInfo = {
            address: {
              name: that.list[val].receiverName,
              phone: that.list[val].receiverMobile,
              content: that.list[val].receiverProvince + '省' + that.list[val].receiverCity + '市' + that.list[val].receiverDistrict + that.list[val].receiverAddress
            }
          };
          that.ajax({
            url: '/shipping/checked',
            method: 'post',
            data: {
              shippingId: that.list[val].id
            },
            success: function (res) {
              var status = res.status;
              if (status == 1000) {
                that.$router.push({path: '/orderCart'})
              }
            }
          })
        } else if (goto == 3) {
          that.addressInfo = {
            address: {
              name: that.list[val].receiverName,
              phone: that.list[val].receiverMobile,
              content: that.list[val].receiverProvince + '省' + that.list[val].receiverCity + '市' + that.list[val].receiverDistrict + that.list[val].receiverAddress
            }
          };
          that.ajax({
            url: '/shipping/checked',
            method: 'post',
            data: {
              shippingId: that.list[val].id
            },
            success: function (res) {
              var status = res.status;
              if (status == 1000) {
                that.$router.push({path: '/waitPay'})
              }
            }
          })
        } else {
          console.log("点击无效")
        }
      },
      //编辑收货地址
      editAddress(val) {
        let that=this;
        that.localData('set','name', this.list[val].receiverName)
        that.localData('set','phone', this.list[val].receiverMobile)
        that.localData('set','province', this.list[val].receiverProvince)
        that.localData('set','city', this.list[val].receiverCity)
        that.localData('set','district', this.list[val].receiverDistrict)
        that.localData('set','detailDress', this.list[val].receiverAddress);
        that.localData('set','index', val);
        that.localData('set','shippingId', this.list[val].id)
        that.$router.push({path: './addressInfo', query: {title: '修改收获地址'}})
      },
      //删除收获地址
      deletAddress(val) {
        let that = this;
        that.ajax({
          url: '/shipping/delete',
          method: 'POST',
          data: {
            shippingId: that.list[val].id,
            checked: that.list[val].checked
          },
          success: function (res) {
            console.log(res)
            var status = res.status;
            if (status == 1000) {
              console.log(12)
              that.list.splice(val, 1);
              if(that.list[val].checked==1){
                Toast('系统已自动选取默认收货地址')
              }
            }
          }
        })
      },
      //新增收货地址
      addNewAddress() {
        if (!this.list || this.list.length <= 2) {
          this.$router.push({path: '/addressInfo', query: {title: '新建收货地址'}});
        } else {
          Toast("一个用户最多添加3个收货地址")
        }
      },
      //滑动开始
      touchStart(e){
        // 记录初始位置
        this.startX = e.touches[0].clientX;
      },
      //滑动结束
      touchEnd(e){
        // 当前滑动的父级元素
        let parentElement = e.currentTarget.parentElement;
        // 记录结束位置
        this.endX = e.changedTouches[0].clientX;
        // 左滑
        if( parentElement.dataset.type == 0 && this.startX - this.endX > 30 ){
          this.restSlide();
          parentElement.dataset.type = 1;
        }
        // 右滑
        if( parentElement.dataset.type == 1 && this.startX - this.endX < -30 ){
          this.restSlide();
          parentElement.dataset.type = 0;
        }
        this.startX = 0;
        this.endX = 0;
      },
      //判断当前是否有滑块处于滑动状态
      checkSlide(){
        let listItems = document.querySelectorAll('.list-item');
        for( let i = 0 ; i < listItems.length ; i++){
          if( listItems[i].dataset.type == 1 ) {
            return true;
          }
        }
        return false;
      },
      //复位滑动状态
      restSlide(){
        let listItems = document.querySelectorAll('.list-item');
        // 复位
        for( let i = 0 ; i < listItems.length ; i++){
          listItems[i].dataset.type = 0;
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../style/minxin";
  .head-title{
    position: relative;
    text-align: center;
    color:#fff;
    font-size:20px;
    line-height:30px;
    padding:5px 0;
    background: url("../../assets/img/titlebg.png") no-repeat left 0 top 0;
    .goback{
      position: absolute;
      top:0;
      font-size:28px;
      line-height:42px;
      left:5px;
      color:#101010;
    }

  }
  .content {
    width: 100%;
    box-sizing: border-box;
    padding-top: 2.14rem;
    background: #ccc;
    .img {
      width: 8rem;
      height: 4rem;
      background: #9f9;
      margin: 5rem auto 3rem;
    }
    p {
      text-align: center;
      margin-bottom: 5rem;
    }
    .newAddress {
      width: 40%;
      border-radius: 0.3rem;
      margin: 0 auto;
      background: red;
      color: #fff;
      text-align: center;
      font: 0.6rem/2.4rem "Microsoft YaHei";
    }
  }

  .addList {
    width: 100%;
  }

  .addressList {
    width: 100%;
    height: auto;
    margin-bottom: 4rem;
    /*li {
      background: #f2f2f2;
      padding:0 2rem 0 1rem;
      display: flex;
      justify-content: space-between;
      margin-bottom:0.2rem;
      .address-left{
        display: flex;
        justify-content: space-between;
        .selectCheck{
          width:20px;
          display: flex;
          align-items: center;
          span{
            display: block;
            width:1rem;
            height:1rem;
            border:1px solid #f80000;
            border-radius:0.5rem;
          }
          .theDefault{
            background:#FB773A;
          }
        }
        .userInfo {
          padding: 1.2rem 1.6rem;
          p {
            color: #101010;
            font-size: 1rem;
            label {
            }
            span {
              color: #101010 !important;
            }
          }
          p.detailTxt {
            font-weight:normal;
            color:#797979;
            margin-top: 0.4rem;
          }
        }
      }
      .edit {
        display: flex;
        align-items: center;
        i {
          font-weight: 600;
          color: #101010;
          font-size: 1.2rem;
        }

      }
    }*/
    .list-item{
      margin-bottom: 0.5rem;
      position: relative;
      height:5rem;
      -webkit-transition: all 0.2s;
    }
    .list-item[data-type='0']{
      transform: translate3d(0,0,0);
    }
    .list-item[data-type="1"]{
      transform: translate3d(-3rem,0,0);
    }
    .list-item:after{
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
    .listContent{
      padding:0 2rem 0 1rem;
      background: #f2f2f2;
      display: flex;
      justify-content: space-between;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      font-size: 0;
    }
    .address-left{
      flex:1;
      display: flex;
      justify-content:flex-start;
    }
    .selectCheck {
      width: 20px;
      height:100%;
      display: flex;
      align-items: center;
      span {
        display: block;
        width: 1rem;
        height: 1rem;
        border: 1px solid #f80000;
        border-radius: 0.5rem;
      }
      .theDefault{
        background:#f80000;
      }
    }
    .userInfo{
      width:70%;
      display: block;
      padding: 1.2rem 1.6rem;
      position: relative;
      flex-direction: column;
      align-items: flex-start;
      overflow: hidden;
      p {
        color: #101010;
        font-size: 1rem;
        label {
        }
        span {
          color: #101010 !important;
        }
      }
      p.detailTxt {
        display: block;
        font-weight:normal;
        color:#797979;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .edit {
      position: absolute;
      right:2rem;
      top:1.6rem;
      display: flex;
      align-items: center;
      i {
        font-weight: 600;
        color: #101010;
        font-size: 1.2rem;
      }
    }
    .list-item .lateralDelete{
      width: 3rem;
      height: 5rem;
      background: #ff4949;
      font-size: 17px;
      color: #fff;
      text-align: center;
      line-height: 5rem;
      position: absolute;
      top:0;
      right: -3rem;
    }
  }
  .addNew {
    width:9.2rem;
    margin:0 auto;
    height:1.2rem;
    span{
      float:left;
      width:1.2rem;
      height:1.2rem;
      font-size:1rem;
      line-height: 1.2rem;
      color:#fff;
      background:#f80000;
      text-align: center;
      border-radius: 0.6rem;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right:0.8rem;
    }
    a{
      float:left;
      font-size:1.2rem;
      line-height: 1.2rem;
      color:#101010;
    }
  }
</style>
