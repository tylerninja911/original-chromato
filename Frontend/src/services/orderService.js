import { serviceCallAuth } from './serviceCall';

const placeOrder = (data, callback, errorCallback) => {
    serviceCallAuth({ url: '/orders', method:'post' , data })
    .then((res) => {
      res.data && callback && callback(res.data.products);
    })
    .catch((err) => {
      errorCallback && errorCallback(err.response.data);
    });

}

const getCurrentUserOrders = (params, callback, errorCallback) => {
  serviceCallAuth({url:'/orders/showAllMyOrders', method:'get', params}).then((res) => {
    res.data && callback && callback(res.data.orders)
  })

}


export {placeOrder, getCurrentUserOrders}