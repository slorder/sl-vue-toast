import Vue from 'vue'
import Router from 'vue-router'
import routes from './map'

Vue.use(Router)

const router = new Router({
  // base: __dirname,
  base: '/ceshi/',
  mode: "history",
  routes
});

Router.prototype.go = function () {
  this.isBack = true;
  this.isBackChild = true;
  window.history.go(-1);
}


export default router
