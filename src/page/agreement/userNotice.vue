<template>
  <!--用户须知-->
  <div id="notice" class="left">
    <home-header :title="'用户须知'" :back="true"></home-header>
    <div class="service-content">
      <div>
        互联鑫彩信息技术有限公司（以下简称互联鑫彩）在此特别提醒用户认真阅读、充分理解本服务须知。
      </div>
      <div class="title">
        第一条 相关定义
      </div>
      <div>
        1、储值卡：本服务提供所称加油卡，是指由所属石油公司发行，可充值的加油储值卡。本储值卡全国通用，可充值、不可挂失、不可补办、不可退款、不可设置密码，可直接到所属加油站圈存、使用。
      </div>
      <div class="title">
        第二条 费用
      </div>
      <div>
        1、用户使用本服务需支付产品金额，需支付的金额以页面提示为准。
      </div>
      <div>
        2、本服务不提供充值发票。用户在使用本服务后，不支持到加油站开具发票。
      </div>
      <div>
        3、支付暂不支持招商银行。
      </div>
      <div class="title">
        第三条 权利义务
      </div>
      <div>
        1、用户在使用本服务时，应当认真确认交易信息，包括且不限于产品名称、数量、金额等。
      </div>
      <div>
        2、用户需遵守页面提示进行操作，用户通过非法或不正当手段使用本服务的，互联鑫彩有权依据其自身判断对涉嫌通过非法或不正当手段使用本服务的用户不提供服务，互联鑫彩对此不承担任何责任。
      </div>
      <div>
        3、用户应确保可合法、有效使用本服务并未侵犯任何第三方合法权益，用户需保证使用的本服务所要求提供的所有信息是真实的、合法的、正确的、完整的。否则因此造成互联鑫彩损失的，用户应负责赔偿并承担全部法律责任。
      </div>
      <div>
        4、用户在收取本储值卡时，请确认完好，确认后，请妥善保管，产生丢失、损坏等非正常使用的情况，互联鑫彩不承担任何责任。
      </div>
      <div class="title">
        第四条 其他
      </div>
      <div>
        1、如果您违反本须知的约定而被中止服务的，我们有权暂停或终止向您提供部分或全部服务，您将承担因此产生的一切责任。
      </div>
      <div>
        2、本条款最终解释权归互联鑫彩信息技术有限公司。
      </div>
    </div>
  </div>
</template>

<script>
  import homeHeader from '../../components/header/header.vue'

  export default {
    data() {
      return {}
    },
    computed: {},
    components: {
      homeHeader
    },
    methods: {},
    mounted() {

    }
  }
</script>

<style lang="scss" scoped>
  @import "../../style/minxin";

  .service-content {
    padding: $top 1rem $bottom;
    div {
      @include sh($min, 1.85rem);
      text-indent: 2em;
    }
    .title {
      @include sh($med, ($med * 2));
      text-indent: $min * 2;
      color: #000;
      font-weight: 600;
    }
  }
</style>
