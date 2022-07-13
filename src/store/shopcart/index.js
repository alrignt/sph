import { reqCartList, reqDeleteCartById, reqUpdateCheckedByid } from "@/api";
const state = {
  cartList: [],
};
const mutations = {
  GETCARTLIST(state, cartList) {
    state.cartList = cartList;
  },
};
const actions = {
  //获取购物车列表的数据
  async getCartList({ commit }) {
    let result = await reqCartList();
    if (result.code == 200) {
      commit("GETCARTLIST", result.data);
    }
  },
  //删除购物车某一个产品
  async deleteCartListBySkuId({ commit }, skuId) {
    let result = await reqDeleteCartById(skuId);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  //修改购物车商品状态
  async updateCheckedById({ commit }, { skuId, isChecked }) {
    let result = await reqUpdateCheckedByid(skuId, isChecked);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  //删除全部选中的产品
  deleteAllCheckedCart({ dispatch, getters }) {
    // context：小仓库、commit：提交mutation修改state、getter是：计算属性、dispatch：派发action、state：当前仓库

    //获取购物车中全部的产品(一个数组)
    //定义一个初识数组
    let PromiseAll = [];
    getters.cartList.cartInfoList.forEach((item) => {
      let promise =
        item.isChecked == 1 ? dispatch("deleteCartListBySkuId", item.skuId) : ""; //判断只删除已选中的
      //将每一次返回的Promise添加到数组当中
      PromiseAll.push(promise);
    });
    //这里的Promise是与关系，只要有一个Promise失败就失败，全部成功才成功
    return Promise.all(PromiseAll);
  },
  //修改选中产品的状态
  updateAllCartIsChecked({dispatch,state},isChecked){
    //定义初始数组
    let promiseAll = [];
    state.cartList[0].cartInfoList.forEach(item => {
    let promise = dispatch('updateCheckedById',{skuId:item.skuId,isChecked});
    promiseAll.push(promise);
    });
    //最终返回的结果
    return Promise.all(promiseAll);
  }
};
const getters = {
  cartList(state) {
    return state.cartList[0] || {};
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
