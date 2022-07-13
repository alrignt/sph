//当前这个模块，对所有的API进行统一管理
import requests from './request'  
import mockRequests from './mockRequest'
//三级联动接口
//  /api/product/getBaseCategoryList  get请求方式
//发请求
export const reqCategoryList = () => requests.get('/product/getBaseCategoryList');

//获取banner（Home首页轮播图的接口）
export const reqGetBannerList = () => mockRequests.get('/banner');

//获取floor数据
export const reqFloorList = () => mockRequests.get('/floor');

//获取搜索模块 地址：/api/list  请求方式：post  需要带参数

//当前这个函数的接口需不需要接收外部传递参数
//当前这个接口，给服务器传递参数params，至少是一个空对象
export const reqGetSearchInfo = (params) => requests({url:"/list",method:"post",data:params});

//获取商品详情信息的接口  URL: /api/item/{ skuId }  请求方式：get
export const reqGoodsInfo = (skuId) => requests({url:`/item/${skuId}`,method:'get'});

//添加购物车的接口  url: /api/cart/addToCart/{ skuId }/{ skuNum }  请求方式：post
export const reqAddOrUpdateShopCart = (skuId,skuNum) => requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'});

//获取购物车列表接口
//URL:/api/cart/cartList method:get
export const reqCartList = () => requests({url:'/cart/cartList',method:'get'});

//购物车删除接口  url：/api/cart/deleteCart/{skuId} method： delete
export const reqDeleteCartById = (skuId) => requests({url:`/cart/deleteCart/${skuId}`,method:'delete'});

//修改商品选中状态的接口  url：/api/cart/checkCart/{skuId}/{isChecked}  method：get
export const reqUpdateCheckedByid =(skuId,isChecked) => requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'});

//获取注册验证码接口  url: /api/user/passport/sendCode/{phone}  method：get
export const reqGetCode = (phone) => requests({url:`/user/passport/sendCode/${phone}`,method:'get'});

//用户注册接口 url：/api/user/passport/register  method：post
export const reqUserRegister = (data) => requests({url:'/user/passport/register',data,method:'post'});

//用户登录接口  url：/api/user/passport/login  method：post
export const reqUserLogin = (data) => requests({url:'/user/passport/login',data,method:'post'});

//获取用户信息  url:/user/passport/auth/getUserInfo  method：get
export const reqUserInfo = () => requests({url:'/user/passport/auth/getUserInfo',method:'get'});

//退出登录  url：/api/user/passport/logout  method：get
export const reqLogout = () => requests({url:'/user/passport/logout',method:'get'});

//获取用户地址  url：/api/user/userAddress/auth/findUserAddressList  method：get
export const reqAddressInfo = () => requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'});

//获取商品列表 url：/api/order/auth/trade method：get
export const reqOrderInfo = () => requests({url:'/order/auth/trade',method:'get'});

//提交订单的接口  url：/api/order/auth/submitOrder?tradeNo={tradeNo} method：post
export const reqSubmitOrder = (tradeNo,data) => requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'});

//获取订单支付信息  url：/api/payment/weixin/createNative/{orderId}  method：get
export const reqPayInfo = (orderId) => requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'});

//获取订单状态 url：/api/payment/weixin/queryPayStatus/{orderId} method：get
export const reqPayStatus = (orderId) => requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'});

//我的订单接口  url：/api/order/auth/{page}/{limit}  method：get
export const reqMyOrderList = (page,limit) => requests({url:`/order/auth/${page}/${limit}`,method:'get'});