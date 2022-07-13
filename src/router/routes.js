//引入一级路由组件
// import Home from "@/pages/Home";
// import Search from "@/pages/Search";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Detail from "@/pages/Detail";
import AddCartSuccess from '@/pages/AddCartSuccess';
import ShopCart from '@/pages/ShopCart';
import Trade from '@/pages/Trade';
import Pay from '@/pages/Pay';
import PaySuccess from '@/pages/PaySuccess';
import Center from '@/pages/Center';

//引入二级路由组件
import MyOrder from '@/pages/Center/myOrder';
import GroupOrder from '@/pages/Center/groupOrder';

/*
  当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。
  如果我们能把不同路由对应的组件分割成不同的代码块，
  然后当路由被访问的时候才加载对应组件，这样就会更加高效。
 */

//路由的配置信息
export default [
  //个人中心路由
  {
    path: "/center",
    component: Center,
    meta: { show: true },
    //二级路由组件
    children:[
      {
        path:'myorder',
        component:MyOrder,
      },
      {
        path:'grouporder',
        component:GroupOrder,
      }
    ]
  },
  //支付成功路由
  {
    path: "/paysuccess",
    component: PaySuccess,
    meta: { show: true },
  },
  //支付路由
  {       
    path: "/pay",
    component: Pay,
    meta: { show: true },
    beforeEnter: (to, from, next) => {
      if(from.params == '/trade'){
        next();
      }else{
        next(false);
      }
    }
  },
  //订单信息路由
  {
    path: "/trade",
    component: Trade,
    meta: { show: true },
    //路由独享守卫
    beforeEnter: (to, from, next) => {
      if(from.path == "/shopcart"){
        next();
      }else{
        //其他区的路由组件而来，停留在当前
        next(false);
      }
    }
  },
  //购物车路由
  {
    path: "/shopcart",
    // name: 'shopcart',
    component: ShopCart,
    meta: { show: true },
  },
  //添加购物车成功路由
  {
    path: "/addcartsuccess",
    name: 'addcartsuccess',
    component: AddCartSuccess,
    meta: { show: true },
  },
  // 详情页路由
  {
    path: "/detail/:skuid",
    component: Detail,
    meta: { show: true },
  },
  //主页路由
  {
    path: "/home",
    component:()=>import('@/pages/Home'),  //路由懒加载引入
    meta: { show: true },
  },
  //搜索页路由
  {
    path: "/search/:keyword", // params参数进行传参  :keyword占位
    component:()=>import('@/pages/Search'),
    meta: { show: true },
    name: "search", //给搜索路由起名
    props: ($route) => {
      return { keyword: $route.params.keyword };
    },
  },
  //登录页路由
  {
    path: "/login",
    component: Login,
    meta: { show: false },
  },
  //注册页路由
  {
    path: "/register",
    component: Register,
    meta: { show: false },
  },
  //重定向，在项目跑起来的时候，访问/,立马定位到首页
  {
    path: "*",
    redirect: "/home",
  },
];