<template>
  <!--添加收货地址-->
  <div id="addresscon" class="left">
    <home-header :title="$route.query.title" :back="true"></home-header>
    <!--<img src="../../assets/img/head-background.png" style="margin-top:-2rem;" alt="">-->
    <ul class="addInfo">
      <li>
        <span style="margin-right:1rem;">收件人</span>
        <input class="username" v-model="name" type="text" placeholder="收货人姓名"/>
      </li>
      <li>
        <span>联系方式</span>
        <input class="userPhone" type="text" v-model="phoneNumber" @input="checkName(phoneNumber)" placeholder="手机 / 电话号码"/>
      </li>
      <p class="errorTxt" v-show="this.phoneValide">请输入正确的手机号</p>
      <li @click="selAddress"><span>收货地区</span><input type="text" placeholder="收货地区" v-model="receivingArea"></li>
      <!--<li>-->
        <!--<span>省/直辖市:</span>-->
        <!--<span class="sel-option" @click="selAddress">{{newPlotData.provinceValue}}</span>-->
      <!--</li>-->
      <!--<li>-->
        <!--<span>城市:</span>-->
        <!--<span class="sel-option" @click="selAddress">{{newPlotData.citiesValue}}</span>-->
      <!--</li>-->
      <!--<li>-->
        <!--<span>区/县:</span>-->
        <!--<span class="sel-option" @click="selAddress">{{newPlotData.districtValue}}</span>-->
      <!--</li>-->
      <!--<li>-->
        <!--<span>详细地址</span>-->
      <!--</li>-->
      <!--<textarea class="detailAddress" type="text" v-model="detailAdress" name="" placeholder="如街道,楼层，门牌号等"></textarea>-->
      <li><span>详细地址</span><input type="text" placeholder="如街道,楼层，门牌号等" v-model="detailAdress"></li>
    </ul>
    <div class="saveAddress" @click="save()">确认</div>
    <mt-popup v-model="popupVisible" popup-transition="popup-fade" position="bottom">
      <div class="popup-title">
        <div class="popup-title-cancel" @click="popupVisible = false">取消</div>
        <div class="popup-title-confirm" @click="confirmAddress">确定</div>
      </div>
      <mt-picker :slots="slots" @change="onValuesChange" ref="picker"></mt-picker>
    </mt-popup>
  </div>
</template>

<script>
  import homeHeader from '../../components/header/header.vue'
  import {Switch} from 'mint-ui'
  import {Toast} from 'mint-ui'
  import city from '../../mixins/city.js'


  export default {
    data() {
      return {
        slots: [
          {
            flex: 1,
            defaultIndex: 1,
            values: [],
            className: 'slot1',
            textAlign: 'right'
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
          {
            divider: true,
            content: '-',
            className: 'slot4'
          }, {
            flex: 1,
            values: [],
            className: 'slot5',
            textAlign: 'left'
          }
        ],
        popupVisible: false,
        name: '',
        shippingId: '',
        /*popUp:false,*/
        saveEdict: false,   //判断是否为编辑状态
        detailAdress: '',
        phoneNumber: '',
        receivingArea:'',
        phoneValide: false,
        plotData: {
          provinceValue: '',
          citiesValue: '',
          districtValue: '',
        },
        areaPicker: null,
        //默认地址为请选择
        newPlotData: {
          provinceValue: '请选择',
          citiesValue: '请选择',
          districtValue: '请选择',
        },
      }
    },
    components: {
      homeHeader
    },
    created() {
      this.isEdict();
    },
    methods: {
      confirmAddress() {
        this.popupVisible = false;
        this.newPlotData.provinceValue = this.plotData.provinceValue;
        this.newPlotData.citiesValue = this.plotData.citiesValue;
        this.newPlotData.districtValue = this.plotData.districtValue;
        this.receivingArea=this.newPlotData.provinceValue+this.newPlotData.citiesValue+this.newPlotData.districtValue;
      },
      selAddress() {
        this.popupVisible = true;
        for (var i in city) { //加载时获取城市三级联动的省份列表
          this.slots[0].values.push(i);
        }
        if (this.newPlotData.provinceValue != '请选择') {
          let cityArr = city[this.newPlotData.provinceValue]
          var cityArrList = [];
          for (var i in cityArr) {
            cityArrList.push(i);
          }
          this.areaPicker.setSlotValues(1, cityArrList);
          this.areaPicker.setSlotValues(2, city[this.newPlotData.provinceValue][this.newPlotData.citiesValue]);
          this.areaPicker.setSlotValue(0, this.newPlotData.provinceValue);
          this.areaPicker.setSlotValue(1, this.newPlotData.citiesValue);
          this.areaPicker.setSlotValue(2, this.newPlotData.districtValue);
        }

      },
      onValuesChange(picker, values) {
        this.areaPicker = picker;
        if (this.popupVisible) {
          let cityArr = city[picker.getSlotValue(0)];
          var cityArrList = [];
          for (var i in cityArr) {
            cityArrList.push(i);
          }
          picker.setSlotValues(1, cityArrList);
          picker.setSlotValues(2, city[picker.getSlotValue(0)][picker.getSlotValue(1)]);
          this.plotData.provinceValue = picker.getSlotValue(0);
          this.plotData.citiesValue = picker.getSlotValue(1);
          this.plotData.districtValue = picker.getSlotValue(2);
        }
      },
      isEdict() {
        let that=this;
        var edictName = that.localData('get', 'name');
        var edictPhone = that.localData('get', 'phone');
        var edictProvince = that.localData('get', 'province');
        var edictCity = that.localData('get', 'city');
        var edictDistrict = that.localData('get', 'district');
        var edictDetail = that.localData('get', 'detailDress');
        var shippingId = that.localData('get', 'shippingId');
        if (edictName) {
          that.saveEdict = true;
          that.name = edictName;
          that.phoneNumber = edictPhone;
          that.shippingId = shippingId;
          that.newPlotData.districtValue = edictDistrict;
          that.newPlotData.citiesValue = edictCity;
          that.newPlotData.provinceValue = edictProvince;
          that.detailAdress = edictDetail;
          this.receivingArea=this.newPlotData.provinceValue+this.newPlotData.citiesValue+this.newPlotData.districtValue;
        }
      },
      checkName(val) {
        if (!/^1[3|4|5|6|7|8|9][0-9]{9}$/.test(val)) {
          this.phoneValide = true;
        } else {
          this.phoneValide = false;
        }
      },
      save() {
        let that = this;
        if (that.saveEdict) { //这是编辑收货地址时的保存
          that.localData('remove', 'name');
          that.localData('remove', 'phone');
          that.localData('remove', 'province');
          that.localData('remove', 'city');
          that.localData('remove', 'district');
          that.localData('remove', 'detialDress');
          that.localData('remove', 'shippingId');
          if (!that.name) {
            Toast('收获人姓名不能为空')
          } else if (!that.phoneNumber) {
            Toast('收货人联系方式不能为空')
          } else if (that.newPlotData.provinceValue == '请选择') {
            Toast('收获地址不能为空')
          } else if (!that.detailAdress) {
            Toast('详细地址不能为空')
          }
          if (!that.phoneValide && that.name && that.phoneNumber && that.newPlotData.provinceValue && that.newPlotData.citiesValue && that.newPlotData.districtValue && that.detailAdress) {
            that.ajax({
              url: '/shipping/modify',
              method: 'POST',
              data: {
                shippingId: that.shippingId,
                receiver_name: that.name,
                receiver_phone: '',
                receiver_mobile: that.phoneNumber,
                receiver_province: that.newPlotData.provinceValue,
                receiver_city: that.newPlotData.citiesValue,
                receiver_district: that.newPlotData.districtValue,
                receiver_address: that.detailAdress,
                receiver_zip: ''
              },
              success: function (res) {
                if (res.status == 1000) {
                  that.$router.go(-1);
                }
              }
            })
          }
          //console.log(that.popUp)//设置默认收获地址状态;
          /*that.$router.push({path:'/addressList'})*/
        } else {  //这是添加收获地址时的保存；
          that.saveEdict = false;
          if (!that.name) {
            Toast('收获人姓名不能为空')
          } else if (!that.phoneNumber) {
            Toast('收货人联系方式不能为空')
          } else if (that.newPlotData.provinceValue == '请选择') {
            Toast('收获地址省份不能为空')
          } else if (!that.detailAdress) {
            Toast('详细地址不能为空')
          }
          if (!that.phoneValide && that.name && that.phoneNumber && that.newPlotData.provinceValue && that.newPlotData.citiesValue && that.newPlotData.districtValue && that.detailAdress) {
            that.ajax({
              url: '/shipping/add',
              method: 'post',
              data: {
                receiver_name: that.name,
                receiver_phone: '',
                receiver_mobile: that.phoneNumber,
                receiver_province: that.newPlotData.provinceValue,
                receiver_city: that.newPlotData.citiesValue,
                receiver_district: that.newPlotData.districtValue,
                receiver_address: that.detailAdress,
                receiver_zip: ''
              },
              success: function (res) {
                var status = res.status;
                if (status == 1000) {
                  that.$router.go(-1);
                }
              }
            })
          }
        }
      }
    },
    mounted() {
      this.$nextTick(() => { //vue里面全部加载好了再执行的函数  （类似于setTimeout）
        this.slots[0].defaultIndex = 0
        // 这里的值需要和 data里面 defaultIndex 的值不一样才能够初始化
        //因为我没有看过源码（我猜测是因为数据没有改变，不会触发更新）
      });
    }
  }
</script>

<style lang="scss">
  @import "../../style/minxin";

  #addresscon {
    padding-bottom: 2rem;
    .addInfo {
      background:#fff;
      padding: 3.14rem 0rem 0;
      margin-bottom: 2rem;
      li {
        padding: 0.6rem 1rem 0;
        border-bottom: 1px solid #f4f4f4;
        font: 1.2rem/3rem "Microsoft YaHei";
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        .sel-option {
          min-width: 8rem;
          text-align: right;
        }
        input {
          text-align:left;
          flex: 1;
          padding-left: 2rem;
          background: none;
          font: 1.2rem/3rem "Microsoft YaHei";
        }
      }
      .errorTxt {
        text-align: right;
        color: red;
      }
    }

    .setoff {
      padding: 0 1rem;
      display: flex;
      font-size: 1.2rem;
      height: 1.2rem;
      justify-content: space-between;
      margin-bottom: 2rem;
      span {
        font: 1.2rem/1.2rem "Microsoft YaHei";
      }
    }

    .detailAddress {
      padding-top: 0.5rem;
      width: 100%;
      height: 8rem;
      @include sh($med, 1.5em);
    }

    .saveAddress {
      width: 60%;
      border-radius: 0.3rem;
      margin: 0 auto;
      background: red;
      color: #fff;
      text-align: center;
      @include sh($med, 2.2em);
    }
  }
</style>
