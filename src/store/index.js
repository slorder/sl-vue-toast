import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  //储存
  state: {
    active:'home',
  },
  //mapGetters
  //获得state
  getters: {
    active: state => state.active,
  },
  //处理state
  //mutations变换 commit
  mutations: {
    setActive: (state, flag) => {
      state.active = flag
    },
  },
  //提交mutations
  //action动作 dispatch
  actions: {

  }
})

// 挂载
export default store;
