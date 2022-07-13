//处理token模块
//本地存储token
export const setToken = (token) => {
  localStorage.setItem('TOKEN',token);
}

//获取token
export const getToken = () => {
  localStorage.getItem('TOKEN');
}

//清楚本地存储的token
export const removeToken = () => {
  localStorage.removeItem("TOKEN")
}