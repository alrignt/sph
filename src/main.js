import Vue from 'vue'
import App from './App.vue'
//全局组件
import typeNav from '@/components/typeNav';
import Carousel from '@/components/Carousel';
import Pagination from '@/components/Pagination';
import {Button,MessageBox} from 'element-ui';
//第一个参数：全局组件的名字  第二个参数：哪一个组件
Vue.component(typeNav.name,typeNav);
Vue.component(Carousel.name,Carousel);
Vue.component(Pagination.name,Pagination);
//注册全局组件
Vue.component(Button.name,Button);
//挂载原型写法
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

//引入路由
import router from '@/router'
//引入仓库
import store from './store'
Vue.config.productionTip = false

//引入MockServe.js
import "@/mock/mockServe.js";
//引入Swiper样式
import 'swiper/css/swiper.css';

//统一引入接口api里面全部的请求函数
import * as API from '@/api';
import dog from '@/assets/images/dog.gif'

//引入图片懒加载插件
import VueLazyload from 'vue-lazyload';

//注册插件
Vue.use(VueLazyload,{
  //懒加载默认的图片
  loading:dog
});

//引入自定义插件
import myPlugin from './plugins/myPlugins';
Vue.use(myPlugin,{
  name:'upper',
});

//引入表单校验插件
import "@/plugins/validate";

new Vue({
  render: h => h(App),
  beforeCreate(){
    //全局事件总线$bus
    Vue.prototype.$bus = this;
    //将api请求一次性引入
    Vue.prototype.$API = API;
  },
  //注册路由：底下写法要KV一致，省略V，router是小写的哦
  router,
  //注册仓库：组件实例的身上会多一个属性$store
  store,
}).$mount('#app')
