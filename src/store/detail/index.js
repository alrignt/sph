import { reqGoodsInfo, reqAddOrUpdateShopCart } from "@/api";
import {getUUId} from '@/utils/uuid_token';
const state = {
  goodInfo:{},
  //游客临时身份
  uuid_token:getUUId()
};
const mutations = {
  GETGOODINFO(state,goodInfo){
    state.goodInfo = goodInfo; 
  }
};
const actions = {
  //获取产品信息
  async getGoodInfo({commit},skuId){
    let result = await reqGoodsInfo(skuId)
    if(result.code == 200){
      commit('GETGOODINFO',result.data)
    }
  },
  //将产品添加到购物车中
  async addOrUpdateShopCart({commit},{skuId,skuNum}){
    //加入购物车返回的结构
    //加入购物车以后(发请求),前台将参数带给服务器
    let result = await reqAddOrUpdateShopCart(skuId,skuNum);
    //当前函数的执行结果返回的是Promise，要么成功，要么失败
    if(result.code == 200){
      return 'ok';
    }else{
      return Promise.reject(new Error('faile'));
    }
  }
};
//简化数据  从仓库中把数据捞出来放到getters中
const getters = {
  categoryView(state){
    return state.goodInfo.categoryView || {}; 
  },
  //简化产品信息
  skuInfo(state){
    return state.goodInfo.skuInfo || {};
  },
  //产品售卖属性的简化
  spuSaleAttrList(state){
    return state.goodInfo.spuSaleAttrList|| {};
  }
};

export default{
  state,
  mutations,
  actions,
  getters,
}