//加载页
const index = (resolve) => {
  import('../page/index.vue').then((module) => {
    resolve(module)
  })
}
//空白页调用微信授权接口
const kong =(resolve) =>{
  import('../page/account/kong.vue').then((module) => {
    resolve(module)
  })
}
//绑定手机号页面
const bundPage =(resolve) =>{
  import('../page/account/bundPage.vue').then((module) => {
    resolve(module)
  })
}
//登录页面
const login = (resolve) => {
  import('../page/account/login.vue').then((module) => {
    resolve(module)
  })
}

//密码登录
const pwdlogin = (resolve) => {
  import('../page/account/pwdLogin.vue').then((module) => {
    resolve(module)
  })
}

// 修改密码
const forgetPwd = (resolve) => {
  import('../page/account/forgetPwd.vue').then((module) => {
    resolve(module)
  })
}

//注册
const register = (resolve) => {
  import('../page/account/register.vue').then((module) => {
    resolve(module)
  })
}

//搜索
const search = (resolve) => {
  import('../page/search/search.vue').then((module) => {
    resolve(module)
  })
}

//首页
const home = (resolve) => {
  import('../page/home/home.vue').then((module) => {
    resolve(module)
  })
}

// 分类
const classify = (resolve) => {
  import('../page/classify/classify.vue').then((module) => {
    resolve(module)
  })
}

// 分类
const proList = (resolve) => {
  import('../page/classify/productList.vue').then((module) => {
    resolve(module)
  })
}

// 购物车
const shopcart = (resolve) => {
  import('../page/shopcart/card.vue').then((module) => {
    resolve(module)
  })
}

// 我的
const me = (resolve) => {
  import('../page/me/me.vue').then((module) => {
    resolve(module)
  })
}

// 我的订单列表
const myOrder = (resolve) => {
  import('../page/me/myOrder.vue').then((module) => {
    resolve(module)
  })
}

//订单详情
const createOrder = (resolve) => {
  import('../page/pay/createOrder.vue').then((module) => {
    resolve(module)
  })
}

//我的优惠券
const myCoupons = (resolve) => {
  import('../page/preferential/myCoupons.vue').then((module) => {
    resolve(module)
  })
}

//优惠券列表
const couponsList = (resolve) => {
  import('../page/preferential/couponsList.vue').then((module) => {
    resolve(module)
  })
}

//购物车订单详情
const orderCart = (resolve) => {
  import('../page/pay/orderCart.vue').then((module) => {
    resolve(module)
  })
}

//待支付
const waitPay = (resolve) => {
  import('../page/pay/waitPay.vue').then((module) => {
    resolve(module)
  })
}

//支付结果
const result = (resolve) => {
  import('../page/pay/result.vue').then((module) => {
    resolve(module)
  })
}

//待发货配送退货
const ship = (resolve) => {
  import('../page/ship/ship.vue').then((module) => {
    resolve(module)
  })
}

// 收货人列表
const addressList = (resolve) => {
  import('../page/address/addressList.vue').then((module) => {
    resolve(module)
  })
}

// 收货人地址
const addressInfo = (resolve) => {
  import('../page/address/addressInfo.vue').then((module) => {
    resolve(module)
  })
}

// 产品详情
const proDetail = (resolve) => {
  import('../page/detail/productDetail.vue').then((module) => {
    resolve(module)
  })
}

// 登录后修改密码
const resetPwd = (resolve) => {
  import('../page/account/resetPwd.vue').then((module) => {
    resolve(module)
  })
}

// 服务协议
const service = (resolve) => {
  import('../page/agreement/serviceAgreement.vue').then((module) => {
    resolve(module)
  })
}

// 注册协议
const registerAgreement = (resolve) => {
  import('../page/agreement/registerAgreement.vue').then((module) => {
    resolve(module)
  })
}

// 用户须知
const userNotice = (resolve) => {
  import('../page/agreement/userNotice.vue').then((module) => {
    resolve(module)
  })
}

// 常见问题
const problem = (resolve) => {
  import('../page/help/problem.vue').then((module) => {
    resolve(module)
  })
}

export default [
  {path: '/', redirect: 'home'},
  {path: '/login', name: 'login', component: login},
  {path: '/kong', name: 'kong', component: kong},
  {path: '/bundPage', name: 'bundPage', component: bundPage},
  {path: '/pwdlogin', name: 'pwdlogin', component: pwdlogin},
  {path: '/forgetPwd', name: 'forgetPwd', component: forgetPwd},
  {path: '/register', name: 'register', component: register},
  {path: '/home', name: 'home', component: home, meta: {show: true,keepAlive:true}},
  {path: '/classify', name: 'classify', component: classify, meta: {show: true}},
  {path: '/proList', name: 'proList', component: proList},
  {path: '/shopcart', name: 'shopcart', component: shopcart, meta: {show: true}},
  {path: '/search', name: 'search', component: search},
  {path: '/proDetail', name: 'proDetail', component: proDetail},
  {path: '/myCoupons', name: 'myCoupons', component: myCoupons},
  {path: '/couponsList', name: 'couponsList', component: couponsList},
  {path: '/me', name: 'me', component: me, meta: {show: true}},
  {path: '/resetPwd', name: 'resetPwd', component: resetPwd},
  {path: '/service', name: 'service', component: service},
  {path: '/registerAgreement', name: 'registerAgreement', component: registerAgreement},
  {path: '/userNotice', name: 'userNotice', component: userNotice},
  {path: '/problem', name: 'problem', component: problem},
  // {path: '*', redirect: 'home'},
  {
    path: '/index', name: 'index', component: index, children: [
    {path: '/addressInfo', name: 'addressInfo', component: addressInfo},
    {path: '/addressList', name: 'addressList', component: addressList},
    {path: '/createOrder', name: 'createOrder', component: createOrder, meta: {show: true}},
    {path: '/orderCart', name: 'orderCart', component: orderCart, meta: {show: true}},
    {path: '/waitPay', name: 'waitPay', component: waitPay},
    {path: '/result', name: 'result', component: result},
    {path: '/ship', name: 'ship', component: ship},
    {path: '/myOrder', name: 'myOrder', component: myOrder,meta: {show: true}},
  ]
  }

]
