<template>
  <div>
    <Header></Header>
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <!-- 在Home、Search可以显示，在登录或者注册时时隐藏的 -->
    <!-- <Footer v-show="$route.path=='/home' || $route.path== '/search' "/> -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
  //引入
  import Header from './components/Header'
  import Footer from './components/Footer'
  // Vue.config.productionTip=false
  export default {
    name: 'App',
    components: {
      Header,
      Footer,
    },
    mounted(){
      //派发一个actions||获取商品分类的三级分类列表的数据
      this.$store.dispatch("categoryList");
    },
};
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
