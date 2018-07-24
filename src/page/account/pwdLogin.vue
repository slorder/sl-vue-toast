<template>
  <!--帐号登录-->
  <div id="pwdLogin" class="left">
    <home-header :title="'帐号登录'" :back="true"></home-header>
    <main class="login-main">
      <div class="login-input login-tel">
        <input type="number" v-model="userPhone" class="login-tel-input" @input="checkName(userPhone)"
               @blur="isRegister(userPhone)" placeholder="请输入手机号"/>
      </div>
      <p class="warnShow" v-show="this.userShow">{{this.errorText}}</p>
      <div class="login-input tel-code">
        <input type="password" v-model="password" class="login-tel-input" @input="checkPassword(password)"
               placeholder="请输入6-20位包含数字和字母密码"/>
        <p class="codeWarn" v-show="this.passwordError">{{this.passwordText}}</p>
      </div>
      <div class="login-btn" @click="userLogin()">登录</div>
      <div class="login-forget">
        <div @click="bindPathName('login')">手机号验证码登录</div>
        <div><span @click="$router.push({path:'/forgetPwd'})">忘记密码？</span><span
          @click="bindPathName('register')">注册</span></div>
      </div>
    </main>
  </div>
</template>

<script>
  import homeHeader from '../../components/header/header.vue'

  export default {
    data() {
      return {
        userPhone: '',
        password: '',
        errorText: '请输入正确的手机号',
        passwordText: '请输入正确的密码',
        userShow: false,
        passwordError: false,
      }
    },
    computed: {},
    components: {
      homeHeader
    },
    methods: {
      //检查手机号
      checkName(val) {
        if (!/^1[3|4|5|6|7|8|9][0-9]{9}$/.test(val)) {
          this.userShow = true;
          this.errorText = '请输入正确的手机号'
        } else {
          this.userShow = false;
        }
        return !/^1[3|4|5|6|7|8|9][0-9]{9}$/.test(val)
      },
      //检查用户是否注册
      isRegister(val) {
        let that = this;
        if (/^1[3|4|5|6|7|8][0-9]{9}$/.test(val)) {
          that.ajax({
            url: '/member/register/check?username=' + that.userPhone.trim(),
            success: function (res) {
              if (res.status == 1000) {
                that.userShow = true;
                that.errorText = '用户未注册，请您先注册';
              } else {
                console.log('用户已经注册')
              }
            }
          })
        }
      },
      //检验密码
      checkPassword(val) {
        if (!this.userShow && this.userPhone) {
          if (val.length >= 6 && val.length <= 20) {
            this.passwordError = false;
            if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{5,19}$/.test(val)) {
              this.passCheck = true;
              this.passwordText = '密码必须是字母数字组合';
            } else {
              this.passCheck = false;
            }
            return this.passwordError;
          } else {
            this.passwordError = true;
            this.passwordText = '请输入正确的密码'
            return this.passwordError;
          }
        }
      },
      //账号密码登录
      userLogin() {
        let that = this;
        if (!that.passwordError && that.password) {
          that.ajax({
            url: '/member/login',
            method: 'post',
            data: {
              username: that.userPhone.trim(),
              password: that.password,
              memberId: that.localData('get', 'tempMemberId') ? that.localData('get', 'tempMemberId') : '',
            },
            success: function (res) {
              if (res.status == 1000) {
                that.localData('set', 'memberId', res.data.id);
                that.localData('set', 'username', res.data.phone);
                that.localData('remove', 'tempMemberId');
                if (that.$route.query.goto) {
                  that.$router.push({name: that.$route.query.goto});
                } else {
                  that.$router.push({name: 'home'});
                }
              } else {
                that.passwordError = true;
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

  #pwdLogin {
    background: $f;
    height: 100%;
  }

  .login-main {
    padding: 4rem 2rem $bottom;
    .warnShow {
      padding-left: 14%;
      color: red;
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
      margin-top: 3rem;
      @include wh(100%, 2.88rem);
      background: $blue;
      border-radius: 5px;
      color: $f;
      @include sh($med, 2.88rem);
      text-align: center;
    }
    .login-forget {
      padding: 1.2rem 0;
      @include fj;
      flex-direction: row;
      div {
        color: $blue;
      }

    }

  }

</style>
