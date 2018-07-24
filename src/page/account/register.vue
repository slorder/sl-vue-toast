<template>
  <!--注册-->
  <div id="register" class="left">
    <home-header :title="'注册'" :back="true" :noto="true"></home-header>
    <main class="login-main">
      <div class="login-input login-tel">
        <input type="number" class="login-tel-input" max-length="11" v-model="userPhone" @input="checkName(userPhone)"
               placeholder="请输入手机号"/>
      </div>
      <p class="warnShow" v-show="this.userShow">{{this.errorText}}</p>
      <div class="login-input tel-code">
        <input type="number" class="login-tel-input" v-model="valideCode" @input="checkValide(valideCode)" placeholder="请输入短信验证"/>
        <div class="login-get-code" @click="getCode">
          <submit-btn :min="true" :title="codeText" :grey="getCodeShow"></submit-btn>
        </div>
      </div>
      <p class="codeWarn" v-show="valideError">{{this.valideText}}</p>
      <div class="login-input login-pwd">
        <input type="password" v-model="password" @input="checkPassword(password)" class="login-tel-input"
               placeholder="请设置6-20位包含数字和字母密码"/>
        <div class="login-input-show iconfont icon-yanjing"></div>
        <p class="codeWarn" v-show="this.passCheck">{{this.passwordText}}</p>
      </div>
      <submit-btn :min="true" @click.native="asRegister()" :title="'确定'"></submit-btn>
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
        password: '',
        errorText: '请输入正确的手机号',
        valideText: '请输入正确的验证码',
        passwordText: '密码不能少于6位',
        userShow: false,
        bStop: true,
        valideError: false,
        passCheck: false,
        getCodeShow: false,
        codeText: '获取验证码',
        timer:null,
        second:60,
      }
    },
    components: {
      homeHeader,
      submitBtn
    },
    methods: {
      //检查手机号
      checkName(val) {
        let that = this;
        if (!/^1[3|4|5|6|7|8|9][0-9]{9}$/.test(val)) {
          that.userShow = true;
          that.getCodeShow = true;
          that.valideError = false;
          that.errorText = '请输入正确的手机号';
          that.valideCode = "";
          clearInterval(that.timer);
          that.second=60;
          that.codeText = '获取验证码';
        } else {
          //检查用户是否存在
          that.ajax({
            url: '/member/exist/check?username=' + that.userPhone.trim(),
            success: function (res) {
              if (res.status == 1000) {
                console.log("用户可以注册")
                that.getCodeShow = false;
                that.userShow = false;
                that.errorText = '请输入正确的手机号';
                that.bStop = true;
              } else {
                that.userShow = true;
                that.getCodeShow = true;
                that.valideError = false;
                that.errorText = result;
                that.bStop = false;
              }
            }
          })
        }
      },
      //获取手机验证码
      getCode() {
        let that = this;
        if (!that.getCodeShow && that.userPhone && that.bStop) {
          that.bStop = false;
          that.getCodeShow = true;
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
            data: {username: that.userPhone},
            success: function (res) {
              if (res.status == 1000) {
                console.log('验证码已发送，半小时内可重复使用');
              }
            }
          })
        }
      },
      //检验验证码
      checkValide(val) {
        if (!this.userShow && this.userPhone) {
          if (val.length == 6) {
            this.valideError = false;
            return this.valideError;
          } else {
            this.valideError = true;
            this.valideText = '请输入正确的验证码';
            return this.valideError;
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
                that.valideError = false;
              } else {
                that.valideError = true;
                that.valideText = result;
              }
            }
          })
        }
      },
      //检验密码
      checkPassword(val) {
        if (!this.valideError) {
          if (val.length >= 6 && val.length <= 20) {
            this.passCheck = false;
            if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{5,19}$/.test(val)) {
              this.passCheck = true;
              this.passwordText = '密码必须是字母数字组合';
            }else{
              this.passCheck = false;
            }
          } else {
            this.passCheck = true;
            this.passwordText = '密码不能少于6位';
          }
        }
      },
      //注册
      asRegister() {
        let that = this;
        if (!this.passCheck && this.password) {
          that.ajax({
            url: '/member/register',
            method: 'post',
            data: {
              username: that.userPhone,
              password: that.password
            },
            success: function (res) {
              if (res.status == 1000) {
                if (that.$route.query.goto) {
                  that.$router.push({name: that.$route.query.goto});
                } else {
                  that.$router.push({name: 'me'});
                }
              } else {
                that.passCheck = true;
                that.passwordText = res.msg;
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

  #register {
    background: $f;
    height: 100%;
  }

  .login-main {
    padding: 4rem 2rem $bottom;
    .login-input {
      position: relative;
      border-bottom: 2px solid $border;
      .login-get-img {
        @include mid;
        right: 0;
        img {
          @include wh(7.34rem, 2.8rem);
        }
      }
      .login-get-code {
        @include mid;
        right: 0;
        @include wh(30%, 2.6rem);
      }
      .login-input-show {
        @include mid;
        @include sh($max, 4rem);
        right: 0;
        color: $blue;
      }
      input {
        padding-left: 3rem;
        @include sh($med, 4rem);
        @include wh(100%, 4rem);
        &::placeholder {
          color: #bbb;
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
    .warnShow {
      padding-left: 14%;
      color: red;
    }
    .codeWarn {
      padding-left: 14%;
      color: red;
    }
    .tel-code:after {
      background-image: url("../../assets/img/new_password.png");
    }
    .login-pwd {
      margin-bottom: 3rem;
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
    .pwd-login {
      @include sh($med, $med*2);
      color: $blue;
    }

  }

</style>
