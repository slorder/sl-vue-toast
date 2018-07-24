<template>
  <!--分类-->
  <div id="classify" class="left">
    <home-header :title="'商品分类'"></home-header>
    <div class="classify-main" v-if="menuList">
      <div class="classify-main-menu" v-for="(item,index) in menuList" :key="index">
        <div class="classify-menu" :class="{active:menuActive==index}" @click="activeMenu(index,item)">
          <div class="classify-menu-title ellipsis">{{item.name}}</div>
          <div class="classify-menu-child" v-if="menuActive==index">
            <div class="classify-child-main clear">
              <div class="classify-menu-childlist" v-for="(item,index2) in item.children" :key="index2"
                   @click="$router.push({name:'proList',query:{id:item.id}})">
                <div class="classify-child-image">
                  <img :src="imgHost+item.imageName" alt="">
                </div>
                <div class="classify-child-name">
                  {{item.name}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import homeHeader from '../../components/header/header.vue'
  import submitBtn from '../../components/button/submitBtn.vue'

  export default {
    data() {
      return {
        menuActive: '0',
        menuList: null,
      }
    },
    components: {
      homeHeader,
      submitBtn
    },
    methods: {
      getClassifyList() {
        let that = this;
        that.ajax({
          url: '/category/list',
          success: function (res) {
            that.menuList = res;
          }
        })
      },
      activeMenu(index, item) {
        let that = this;
        that.menuActive = index;
        if (item.children.length == 0) {
          that.$router.push({name: 'proList', query: {id: item.id}})
        }
      }

    },
    created() {
      this.getClassifyList()
    }
  }
</script>

<style lang="scss">
  @import "../../style/minxin";

  $imgW: 65rem/15;

  .classify-main {
    padding: $top 0 $bottom;
    background: rgba(242, 242, 242, 0.4);
    box-sizing: border-box;
    height: 100vh;
    .classify-main-menu {
      @include wh(6rem, 3rem);
    }
    .classify-menu {
      @include sh($med, 3em);
      height: 3em;
      border-left: 9px solid transparent;
      display: flex;
      flex-direction: row;
      position: relative;
      .classify-menu-title {
        width: 6rem;
        text-align: center;
      }
      .classify-menu-child {
        position: fixed;
        background: $f;
        top: $top;
        bottom: $bottom;
        right: 0;
        left: 6rem;
        overflow-y: scroll;
        transform: translate3d(0, 0, 0);
        .classify-child-main {
          padding-top: $med;
        }
        .classify-menu-childlist {
          float: left;
          @include wh(65rem/15, 8rem);
          text-align: center;
          margin-left: $med;
          .classify-child-image {
            width: $imgW;
            height:  $imgW;
            img {
              width:  $imgW;
              height:  $imgW;
            }
          }
          .classify-child-name {
            margin: 0 0 9px;
            height: 23rem/15;
            @include sh($min, 23rem/15);
            text-align: center;
            overflow: hidden;
          }
        }
      }
    }
    .active {
      border-left: 9px solid $red;
      background: $f;
    }
  }


</style>
