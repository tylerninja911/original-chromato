import axios from 'axios';

let url = 'http://localhost:5000/api/v1'
if (process.env.NODE_ENV === 'production') {
    url = '/api/v1'
}

const serviceCall = (requestData) => {
    return new Promise ((resolve, reject) => {
        const request = {
            url:url + requestData.url,
            method:requestData.method || 'get',
            data:requestData.data,
            

        }
        axios(request).then((res) => resolve(res)).catch(err => reject(err)) 
    })
}

const serviceCallAuth = (requestData) => {
    return new Promise((resolve, reject) => {
        const request = {
            url:url + requestData.url,
            method:requestData.method || 'get',
            data:requestData.data,
            params:requestData.params,
            headers:{
                Authorization:'Bearer ' + localStorage.getItem('token')

            }

        }
        axios(request).then((res) => resolve(res)).catch(err => reject(err)) 
    })
}


export {serviceCall, serviceCallAuth }