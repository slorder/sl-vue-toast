<template>
  <!--常见问题-->
  <div id="service2" class="left" v-once>
    <home-header :title="'常见问题'" :back="true"></home-header>
    <div class="service-content">
      <div class="title">
        一、货嚯网的产品都是正品吗？
      </div>
      <div>
        当然，货嚯网酒水批发网站上的产品都是正品，如出现假货，我们承诺假一赔十。货嚯网酒水批发网站所有产品均来自于国外进口，所有产品资料都非常齐全（产品质检报告、公司营业执照、食品经营许可证、品牌授权书及经销证明等）。
      </div>
      <div class="title">
        二、打了款不发货怎么办？
      </div>
      <div>
        商业社会发展到今天，我们看重的是经销商网络的价值，而这一价值实现的前提就是经销商对于货嚯网站的信任与体验。因此，货嚯网视信誉如生命，您担心的这一情况绝对不会发生。
      </div>
      <div class="title">
        三、如何配送？运输安全吗？
      </div>
      <div>
        酒类产品物流问题是整个供应链中核心的问题，为此，货嚯网高度重视，选用快递行业中最好的，最符合货嚯网业务的公司进行合作。
        酒类产品属特殊商品，国家规定只能陆运，不能空运。由于采用整件配送，减少了商品在运输途中因挤压、碰撞等因素造成破损的几率；如出现破损，请您与快递人员当面核实，并对破损进行拍照取证，并及时与客服进行沟通。
      </div>
      <div class="title">
        四、货嚯网的价格为什么这么便宜？
      </div>
      <div>
        货嚯网的酒水产品全部由国外厂家直接供货，省去了省代、市代、县代等大量中间环节和运输、人力、运营成本，因此货嚯网的酒水价格具有不可比拟的竞争优势。
      </div>
      <div class="title">
        免责声明
      </div>
      <div>

      </div>
      <div class="title">
        正品保证
      </div>
      <div>
        货嚯网承诺，本商城所售商品都是通过与国外酒商直营订货、运输，均为正品，假一罚十。
        如果您认为购买的商品是假货，请提供国家级质检机构的证明文件，经确认后，货嚯网将通过电话联系与您商定赔付事宜，请务必保持电话畅通。
      </div>
      <div class="title">
        保证无临期商品
      </div>
      <div>
        厂家会因为各种原因，不时更改包装等，不同批次，外包装也许会有细小的差别，但是产品的本质是不会改变的，请不能接受的买家慎拍！
      </div>
      <div class="title">
        破损处理
      </div>
      <div>
        当您收到货时，请记得当面验货签收核对，如您在验货签收时发现酒水有破损，请与快递人员当面核实，并对破损拍照取证后及时与货嚯网沟通，我们会第一时间为您处理，如果签收后再反馈产品问题差异，本商城概不负责，请知悉。
      </div>
      <div class="title">
        发货时间
      </div>
      <div>
        本商城承诺买家付款后48小时内发货，若遇到双11、双12等大型商城活动，发货量增加，发货时间则相应推迟5-7天，而快递方也会因发货量大而出现爆仓情况，具体收货时间就以到货时间为准，还希望各位买家能够体谅并知悉。
      </div>
      <div>在线客服时间：周一至周日9:00-22:00。</div>
    </div>
  </div>
</template>

<script>
  import homeHeader from '../../components/header/header.vue'

  export default {
    components: {
      homeHeader
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../style/minxin";

  .service-content {
    padding: $top+1 1rem $bottom;
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
