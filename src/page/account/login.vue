<template>
  <!--登录-->
  <div id="login" class="left">
    <home-header :title="'手机验证码登录'" :back="true"></home-header>
    <main class="login-main">
      <div class="login-input login-tel">
        <input type="number" class="login-tel-input" v-model="userPhone" @input="checkName(userPhone)"
               placeholder="请输入手机号"/>
      </div>
      <p class="warnShow" v-show="this.userShow">{{this.errorText}}</p>
      <div class="login-input tel-code">
        <input type="number" class="login-tel-input" v-model="valideCode" @input="checkValide(valideCode)"
               @blur="checkVade(valideCode)" placeholder="请输入短信验证"/>
        <div class="login-get-code" @click="getCode">
          <submit-btn :min="true" :title="codeText" :grey="getCodeShow"></submit-btn>
        </div>
      </div>
      <p class="codeWarn" v-show="valideError">{{this.valideText}}</p>
      <submit-btn :min="true" class="loginBtn" @click.native="login()" :title="'登录'"></submit-btn>
      <div class="btnType">
        <div class="pwd-login" @click="bindPathName('pwdlogin')">密码登录</div>
        <div class="pwd-login"><span @click="$router.push({path:'/forgetPwd'})">忘记密码？</span><span
          @click="bindPathName('register')">注册</span></div>
      </div>
    </main>
  </div>
</template>

<script>
  import homeHeader from '../../components/header/header.vue'
  import submitBtn from '../../components/button/submitBtn.vue'
  import {Toast} from 'mint-ui'

  export default {
    data() {
      return {
        userPhone: '',
        valideCode: '',
        errorText: '请输入正确的手机号',
        valideText: '请输入正确的验证码',
        userShow: false,
        valideError: false,
        getCodeShow: false,
        bStop: true,
        codeText: '获取验证码',
        timer:null,
        second:60,
      }
    },
    components: {
      homeHeader,
      submitBtn,
    },
    methods: {
      //检查手机号
      checkName(val) {
        let that = this;
        if (!/^1[3|4|5|6|7|8|9][0-9]{9}$/.test(val)) {
          that.getCodeShow = true;
          that.userShow = true;
          that.valideError = false;
          that.errorText = '请输入正确的手机号'
          that.valideCode = "";
          clearInterval(that.timer);
          that.second=60;
          that.codeText = '获取验证码';
        } else {
          //检查用户是否注册;
          that.ajax({
            url: '/member/register/check?username=' + that.userPhone.trim(),
            success: function (res) {
              if (res.status == 1000) {
                that.userShow = true;
                that.bStop = false;
                that.getCodeShow = true;
                that.errorText = '用户未注册';
              } else {
                that.userShow = false;
                that.bStop = true;
                that.getCodeShow = false;
//                console.log('用户已经注册')
              }
            }
          })
        }
      },
      //获取手机验证码
      getCode() {
        let that = this;
        if (!that.getCodeShow && that.userPhone && that.bStop) {
          that.timer = setInterval(function () {
            that.second--;
            that.codeText = that.second + '后重新发送';
            if ((that.second) <= 0) {
              clearInterval(that.timer);
              that.codeText = '获取验证码';
              that.getCodeShow = false;
              that.bStop = true;
              that.second=60;
            }
          }, 1000)
          that.ajax({
            url: '/member/sms',
            method: 'post',
            data: {
              username: that.userPhone,
            },
            success: function (res) {
              if (res.status == 1000) {
//                console.log("获取手机验证码成功");
              } else {
//                console.log('用户已经注册');
              }
            }
          })
          that.bStop = false;
          that.getCodeShow = true;
        } else {
          if (!that.getCodeShow && that.bStop) {
            that.getCodeShow = false;
          } else {
            that.getCodeShow = true;
          }
        }
      },
      //检验验证码
      checkValide(val) {
        if (!this.userShow && this.userPhone) {
          if (val.length == 6) {
            this.valideError = false;
          } else {
            this.valideError = true;
            this.valideText = '请输入正确的验证码'
          }
        }
      },
      checkVade(val) {
        let that = this;
        if (val.length == 6) {
          that.ajax({
            url: '/member/check/code',
            method: 'post',
            data: {
              username: that.userPhone,
              code: that.valideCode
            },
            success: function (res) {
              if (res.status == 1000) {
//                console.log('验证码一致')
              } else {
                that.valideError = true;
                that.valideText = res.msg;
              }
            }
          })
        }
      },
      //登录
      login() {
        let that = this;
        if (!this.valideError && this.valideCode) {
          that.ajax({
            url: '/member/login/code',
            method: 'post',
            data: {
              username: that.userPhone,
              code: that.valideCode,
              memberId: that.localData('get','tempMemberId') ? that.localData('get','tempMemberId') : null,
            },
            success: function (res) {
              if (res.status == 1000) {
                that.localData('set',"memberId", res.data.id)
                that.localData('set','username', that.userPhone)
                that.localData('remove','tempMemberId');
                if (that.$route.query.goto) {
                  that.$router.push({name: that.$route.query.goto});
                } else {
                  that.$router.push({name: 'home'});
                }

              } else {
                that.valideError = true;
                that.valideText = res.status;
              }
            }
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../style/minxin";

  #login {
    height: 100%;
    background: $f;
  }

  .login-main {
    padding: 4rem 2rem $bottom;
    .warnShow {
      padding-left: 14%;
      color: red;
      height: 2rem;
      line-height: 2rem;
    }
    .loginBtn {
      margin-top: 3rem;
    }
    .codeWarn {
      padding-left: 14%;
      color: red;
    }
    .login-input {
      position: relative;
      border-bottom: 2px solid $border;
      input {
        padding-left: 3rem;
        @include sh($med, 4rem);
        @include wh(100%, 4rem);
        &::placeholder {
          color: #bbb;
        }
      }
      .login-get-code {
        z-index: 2;
        @include mid;
        right: 8%;
        top: 50%;
        position: absolute;
        @include wh(30%, 2.6rem);
      }
      .login-get-img {
        @include mid;
        right: 0;
        img {
          @include wh(7.34rem, 2.8rem);
        }
      }
      &:after {
        @include mid;
        display: block;
        content: '';
        @include wh(1.2rem, 4rem);
        background: url("../../assets/img/new_phone.png") no-repeat center center;
        background-size: contain;
      }
    }
    .tel-code:after {
      background-image: url("../../assets/img/new_password.png");
    }
    .login-btn {
      @include wh(100%, 2.88rem);
      background: $blue;
      border-radius: 5px;
      color: $f;
      @include sh($med, 2.88rem);
      text-align: center;
      margin-bottom: 1rem;
    }
    .btnType {
      display: flex;
      padding: 1.2rem 0;
      display: -webkit-flex;
      justify-content: space-between;
    }
    .pwd-login {
      @include sh($med, $med*2);
      color: $blue;
    }

  }

  .waring {
    padding-left: 3rem;
  }

</style>
