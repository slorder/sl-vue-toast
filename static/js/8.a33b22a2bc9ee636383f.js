webpackJsonp([8],{EZao:function(s,i,t){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var e=t("hxP8"),n=t("kxUj"),a={name:"carrousel",data:function(){return{menuActive:"0",menuList:null}},computed:{},components:{homeHeader:e.a,submitBtn:n.a},methods:{getClassifyList:function(){var s=this;s.ajax({url:"/category/list",success:function(i){s.menuList=i}})},activeMenu:function(s,i){this.menuActive=s,0==i.children.length&&this.$router.push({name:"proList",query:{id:i.id}})}},created:function(){this.getClassifyList()}},c={render:function(){var s=this,i=s.$createElement,t=s._self._c||i;return t("div",{staticClass:"left",attrs:{id:"classify"}},[t("home-header",{attrs:{title:"商品分类"}}),s._v(" "),s.menuList?t("main",{staticClass:"classify-main"},s._l(s.menuList,function(i,e){return t("div",{key:e,staticClass:"classify-main-menu"},[t("div",{staticClass:"classify-menu",class:{active:s.menuActive==e},on:{click:function(t){s.activeMenu(e,i)}}},[t("div",{staticClass:"classify-menu-title ellipsis"},[s._v(s._s(i.name))]),s._v(" "),s.menuActive==e?t("div",{staticClass:"classify-menu-child"},[t("div",{staticClass:"classify-child-main clear"},s._l(i.children,function(i,e){return t("div",{key:e,staticClass:"classify-menu-childlist",on:{click:function(t){s.$router.push({name:"proList",query:{id:i.id}})}}},[t("div",{staticClass:"classify-child-image"},[t("img",{attrs:{src:s.imgHost+i.link,alt:""}})]),s._v(" "),t("div",{staticClass:"classify-child-name"},[s._v("\n                "+s._s(i.name)+"\n              ")])])}))]):s._e()])])})):s._e()],1)},staticRenderFns:[]};var l=t("VU/8")(a,c,!1,function(s){t("JNWS")},null,null);i.default=l.exports},JNWS:function(s,i){}});
//# sourceMappingURL=8.a33b22a2bc9ee636383f.js.map