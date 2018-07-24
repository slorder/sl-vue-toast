<template>
  <!--登录后修改密码-->
  <div id="resetPwd" class="left">
    <home-header :title="'修改密码'" :back="true"></home-header>
    <main class="login-main">
      <div class="login-input tel-code">
        <input type="password" class="login-tel-input" v-model="password" @input="checkPass(password)"
               placeholder="请输入原密码"/>
      </div>
      <p class="warnShow" v-show="this.passShow">{{this.errorText}}</p>
      <div class="login-input tel-code">
        <input type="password" class="login-tel-input" v-model="passwordNew" @input="checkPassnew(passwordNew)"
               placeholder="请输入6-20位包含数字和字母密码"/>
        <div class="login-input-show iconfont icon-yanjing"></div>
      </div>
      <p class="codeConfirm" v-show="this.passwordError">{{this.passwordText}}</p>
      <div class="login-input tel-code" style="marginBottom:20px">
        <input type="password" class="login-tel-input" v-model="confirmPassword" @input="checkNewpass(confirmPassword)"
               placeholder="请再次输入密码"/>
        <p class="codeWarn" v-show="this.confirmPass">{{this.confirmText}}</p>
      </div>
      <submit-btn :min="true" @click.native="resetPass()" :title="'确定'"></submit-btn>
    </main>
  </div>
</template>

<script>
  import homeHeader from '../../components/header/header.vue'
  import submitBtn from '../../components/button/submitBtn.vue'

  export default {
    data() {
      return {
        password: '',
        passwordNew: '',
        confirmPassword: '',
        passShow: false,
        passwordError: false,
        confirmPass: false,
        errorText: '请输入正确的原密码',
        passwordText: '请输入正确的新密码',
        confirmText: '两次密码输入不一致'
      }
    },
    components: {
      homeHeader,
      submitBtn
    },
    methods: {
      //检查原密码
      checkPass(val) {
        if (val.length >= 6 && val.length <= 20) {
          this.passShow = false;
          this.passwordError = false;
          if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{5,19}$/.test(val)) {
            this.passShow = true;
          } else {
            this.passShow = false;
          }
        } else {
          this.passShow = true;
        }
      },
      checkPassnew(val) {
        if (!this.passShow && this.password) {
          if (val.length >= 6 && val.length <= 20) {
            this.passwordError = false;
            if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{5,19}$/.test(val)) {
              this.passwordError = true;
              this.passwordText = '密码必须是字母数字组合';
            }
          } else {
            this.passwordError = true;
          }
        } else {
          this.passwordError = false;
        }
      },
      checkNewpass(val) {
        if (!this.passwordError && this.passwordNew != this.confirmPassword) {
          this.confirmPass = true;
        } else {
          this.confirmPass = false;
        }
      },
      resetPass() {
        let that = this;
        var userPhone = that.localData('get', 'username')
        that.ajax({
          url: '/member/modify/password',
          method: 'post',
          data: {
            username: userPhone,
            password: that.password,
            passwordNew: that.passwordNew,
          },
          success: function (res) {
            if (res.status == 1000) {
              that.$router.push({path: '/me'});
            }
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../style/minxin";

  #resetPwd {
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
    .codeConfirm {
      padding-left: 14%;
      color: red;
    }
    .login-input {
      position: relative;
      border-bottom: 2px solid $border;
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
  }
</style>

