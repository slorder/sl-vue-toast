<template>
  <!--调用微信授权相关接口-->
  <div id="kong">
    <!--code：{{code}}<br/>-->
    <!--openId:{{openId}}<br/>-->
  </div>
</template>

<script>
  import homeHeader from '../../components/header/header.vue'
  import submitBtn from '../../components/button/submitBtn.vue'
  import {Toast} from 'mint-ui'

  export default {
    data() {
      return {
        code: '',
        openId: '',
      }
    },
    methods: {
      getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = location.search.substr(1).match(reg);
        if (r != null) {
          return r[2];
        }
      },
      getCode() {
        let that = this;
        that.code = that.getQueryString("code")
        that.ajax({
          url: '/wx/getAuthority',
          method: 'post',
          data: {
            code: that.code
          },
          success: function (res) {
            that.openId = JSON.stringify(res);
            if (res.status == 1000) {
              var msg = res.msg;
              if (msg == 'PleaseBindPhone') {
//                Toast('openId不存在');
                that.localData('set', 'memberId', res.data.id)
                that.localData('set', 'openid', res.data.openId)
                that.localData('set', 'nickname', res.data.nickName)
                that.localData('set', 'headimgurl', res.data.headImgUrl)
              }
              if (msg == 'GrantLoginSuccess') {
//                Toast('跳转到首页')
                that.localData('set', 'memberId', res.data.id)
                that.localData('set', 'openid', res.data.openId)
                that.localData('set', 'nickname', res.data.nickName)
                that.localData('set', 'headimgurl', res.data.headImgUrl)
                location.href = 'http://t.2858.com/ceshi/home';
                return;
              }
            }
            if (res.status == 1005 || res.status == 1007) {
//              Toast('用户名或密码不能为空');
              that.localData('set', 'memberId', res.data.id)
              that.localData('set', 'openid', res.data.openId)
              that.localData('set', 'nickname', res.data.nickName)
              that.localData('set', 'headimgurl', res.data.headImgUrl)
            }
            location.href = 'http://t.2858.com/ceshi/bundPage';
          }
        })
      }
    },
    created() {
      this.getCode();
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../style/minxin";

  #kong {
    background: $f;
    height: 100%;
    word-break: break-all;
  }
</style>
