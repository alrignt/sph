//登录与注册模块
import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from "@/api";
import {setToken,getToken,removeToken} from '@/utils/token'
const state = {
  code:"",
  token:getToken(),
  userInfo:{},
};
const mutations = {
  GETCODE(state,code){
    state.code = code;
  },
  USERLOGIN(state,token){
    state.token = token;
  },
  GETUSERINFO(state,userInfo){
    state.userInfo = userInfo;
  },
  CLEAR(state){
    state.token = '';
    state.userInfo = {};
    removeToken();
  }
};
const actions = {
  //获取验证码
  async getCode({commit},phone){
    let result = await reqGetCode(phone);
    if(result.code == 200){
      commit('GETCODE',result.data);
      return 'ok'
    }else{
      return Promise.reject(new Error('faile'));
    }
  },
  //用户注册
  async userRegister({commit},user){
    let result = await reqUserRegister(user);
    console.log(result);
    // if(result.code == 200){}
  },
  //用户登录【token】
  async userLogin({commit},data){
    let result = await reqUserLogin(data);
    //服务器下发token，用户唯一标识
    //将来经常通过带来token找服务器要用户信息进行展示
    if(result.code == 200){
      //这回用户登录成功并获取到token
      commit('USERLOGIN',result.data.token);
      //持久化存储token
      // localStorage.setItem = ("TOKEN",result.data.token);
      setToken(result.data.token);
      return 'ok';
    }else{
      return Promise.reject(new Error('faile'));
    }
  },
  //在首页获取用户信息
  async getUserInfo({commit},data){
    let result = await reqUserInfo();
    if(result.code == 200){
      commit('GETUSERINFO',result.data);
      return 'ok';
    }else{
      return Promise.reject(new Error('faile'));
    }
  },
  //退出登录
  async userLogout({commit}){
    //向服务器发请求，通知服务器清楚数据
    let result = await reqLogout();
    if(result.code == 200){
      commit('CLEAR');
      return 'ok';
    }else{
      return Promise.reject(new Error('faile'));
    }
  }
};
const getters = {};
export default{
  state,
  mutations,
  actions,
  getters
}