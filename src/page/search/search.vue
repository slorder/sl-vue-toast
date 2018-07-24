<template>
  <!--搜索-->
  <div id="search" class="left">
    <home-header :back="true">
      <div slot="search" class="header-search">
        <div class="header-search-input">
          <input type="text" v-model="searchVal" placeholder="请输入搜索关键字"/>
        </div>
        <div class="header-btn" @click="getSearch()">
          搜索
        </div>
      </div>
    </home-header>
    <main class="search-main">
      <div class="search-hot">
        <div class="search-hot-title">热门搜索</div>
        <div class="search-hot-list" v-for="(item,index) in hotList" :key="index" @click="$router.push({name:'proList'})">
            {{item.name}}
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  import homeHeader from '../../components/header/header.vue'
  import {filterTime} from '../../mixins/filter'

  export default {
    data() {
      return {
        searchVal:'',
        hotList:[
          {
            name:'羽绒服',
          },
          {
            name:'hong',
          },
          {
            name:'羽绒服',
          },
          {
            name:'hong',
          },
        ]
      }
    },
    filters: {
      filterTime: filterTime,
    },
    components: {
      homeHeader,
    },
    methods: {
      showPay() {
        this.popupVisible = true;
      },
      getSearch(){
        let that = this;
        console.log(that.searchVal)
        that.$router.push({name:'proList',query:{searchVal:that.searchVal}})
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../style/minxin";

  $bsearch: #ccc;
  $size: 1rem;

  #search{
    background: $f;
  }

  .search-main {
    padding: $top 0 0;
    min-height: 100%;
  }

  .search-hot{
    padding: 10px;
    .search-hot-title{
      @include sc($med,$grey);
      padding-bottom: 10px;
    }
    .search-hot-list{
      @include sc($med,$grey);
      line-height: 2em;
      @include wh(30%,2em);
      text-align: center;
      border-radius: 3px;
      border: 1px solid $border;
      float: left;
      margin: 5px;
    }
  }

</style>
