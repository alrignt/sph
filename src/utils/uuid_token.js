import { v4 as uuidv4 } from 'uuid';
//生成随机的字符串，且每次执行不能发送变化，游客身份持久化存储
export const getUUId = () => {
   //先从本地存储获取uuid (看一本地存储里面是否有)
   let uuid_token = localStorage.getItem('UUIDTOKEN');
   //如果没有生成
   if(!uuid_token){
    //生成游客临时身份
    uuid_token = uuidv4();
    //本地存储一次
    localStorage.setItem('UUIDTOKEN',uuid_token);
   }
   return uuid_token;
}