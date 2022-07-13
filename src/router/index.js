//配置路由的地方
import Vue from "vue";
import VueRouter from "vue-router";

//使用插件
Vue.use(VueRouter);
//引入store
import store from '@/store';

import routes from './routes'

//先把VueRouter原型对象的push，先保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

//重写push|replace
//第一个参数：告诉原来的push方法，往哪里跳(即传递那些参数)
//第二个参数：成功的回调
//第三个参数：失败的回调
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    //call || apply区别
    //相同点，都可以调用函数一次，都可以篡改函数一次
    //不同点，call和apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

let router = new VueRouter({
  //配置路由
  routes,
  //滚动行为
  scrollBehavior (to, from, savedPosition) {
    return {y:0}; //y:0 表示滚到到最顶部
  }
});

//全局守卫：前置守卫(在路由之间进行判断)
router.beforeEach(async(to,from,next) => {
  //to:可以获取到需要跳转到哪个路由的信息
  //from：可以获取到从哪个路由而来的信息
  //next：放行函数
  next();
  //用户登录了才有token
  let token = store.state.user.token;
  let name = store.state.user.userInfo.name;
  if(token){
    //用户已登录就不能再登录了哦(登录状态点击login)
    if(to.path == '/login'){
      //这里设置为已经登录再次点击登录还是待在home
      next('/home');
    }else{
      //登录了，但是跳转的不是login
      //如果用户名已有
      if(name){
        next();
      }else{
        //没有用户信息，派发action让仓库存储用户信息再跳转
        try {
          //获取用户信息成功
          await store.dispatch('getUserInfo');
          //放行
          next();
        } catch (error) {
          //token失效了
          //清除token
          await store.dispatch('userLogout');
          next('/login');
        }
      }
      next();
    }
  }else{
    //未登录,不可以跳转支付相关
    let toPath = to.path;
    if(toPath.indexOf('/trade')!= -1 || toPath.indexOf('/pay') !=-1 || toPath.indexOf('/center') != -1){
      next('/login?redirect='+toPath);
    }else{
      next();
    }
  }
});

export default router;
