import { reqGetSearchInfo } from "@/api";

//search模块的小仓库
const state = {
  //仓库的初识状态
  searchList:{},
};
const mutations = {
  GETSEARCHLIST(state,searchList){
    state.searchList = searchList;
  },
};
const actions = {
  //获取search数据
  async getSearchList({ commit }, params = {}) {
    //当前这个reqGetSearchInfo这个函数在调用服务器数据的时候，至少传递一个参数
    //params形参：是当前用户派发action的时候，第二个参数传过来的，至少得是一个空对象
    let result = await reqGetSearchInfo(params);
    if(result.code == 200){
      commit("GETSEARCHLIST",result.data);
    }
  }
};
//计算属性
//项目当中getters主要作用是：简化仓库中的数据
const getters = {
  goodsList(state){
    return state.searchList.goodsList || [];
  },
  trademarkList(state){
    return state.searchList.trademarkList;
  },
  attrsList(state){
    return state.searchList.attrsList;
  }
};

export default {
  state,
  mutations,
  actions,
  getters,
}