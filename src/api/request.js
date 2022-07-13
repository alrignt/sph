//对于axios进行二次封装
import store from '@/store';
import axios from 'axios'
//引入进度条
import nprogress from 'nprogress';
//start 进度条开始  done进度条结束
// 引入进度条样式
import "nprogress/nprogress.css"

//1、利用axios对象的方法create, 去创建一个axios实例
//2、request其实就是axios，只不过是稍微配置一下
let requests = axios.create({
  //配置对象
  //基础路径
  baseURL:"/api",
  //请求超时的时间
  timeout:100000   //老是请求失败，这个时间可以设置久一点
});

//请求拦截器:在发送请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情。
requests.interceptors.request.use((config)=>{
  //config：配置对象，对象里面有一个属性 header请求头
  if(store.state.detail.uuid_toke){
    //请求头添加一个字段
    config.headers.userTempId = store.state.detail.uuid_toke;
  }
  //登录那会需要携带token给服务器，要不然不知道你是哪个用户，就默认游客处理了
  if(store.state.user.token){
    config.headers.token = store.state.user.token; //将用户的token给服务器
  }
  //进度条开始动
  nprogress.start();
  return config;
});

//响应拦截器
requests.interceptors.response.use((res)=>{
  //响应成功的回调函数：服务器响应数据以后，响应拦截器可以检测到。
  //进度条结束
  nprogress.done();
  return res.data;
},(error)=>{
  alert(error.message)
  //响应失败的回调函数
  return Promise.reject(new Error('faile'));
});


//对外暴露
export default requests;