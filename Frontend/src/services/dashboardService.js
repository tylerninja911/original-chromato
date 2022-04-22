import { serviceCallAuth } from './serviceCall'

function getDashBoardData(callback, errorCallback){
    serviceCallAuth({url:'/dashboard', method:'get'}).then((res) => {
        res.data && callback && callback(res.data);
        console.log(res.data);
        

      })
      .catch((err) => {
        errorCallback && errorCallback(err.response.data);
      });
    


}

export {
    getDashBoardData
}