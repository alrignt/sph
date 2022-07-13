import {reqCategoryList, reqGetBannerList, reqFloorList } from '@/api'
//home模块的小仓库
const state = {
  categoryList:[],  //设置仓库初始值
  bannerList:[],    //轮播图数据
  floorList:[],     //floor组件的数据
};
const mutations = {
  CATEGORYLIST(state,categoryList){
    state.categoryList = categoryList;
  },
  GETBANNERLIST(state,bannerList){
    state.bannerList = bannerList;
  },
  GETFLOORLIST(state,floorList){
    state.floorList = floorList;
  }
};
const actions = {
  //通过api里面的接口，向服务器发请求，获取服务器的数据
  async categoryList({commit}) {
    let result = await reqCategoryList();
      if(result.code == 200){
        commit("CATEGORYLIST",result.data);
        // commit("CATEGORYLIST",result.data.slice(0,16));  这里可以通过data.slice(0,16)对数据进行处理
      }
  },
  //获取首页轮播图数据
  async getBannerList({commit}){
    let result = await reqGetBannerList();
      if(result.code == 200){
        commit('GETBANNERLIST',result.data);
    }
  },
  //获取Floor数据
  async getFloorList({commit}){
    let result = await reqFloorList();
      if(result.code == 200){
        commit('GETFLOORLIST',result.data);
      }
  },
};
const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
}