import {serviceCallAuth} from './serviceCall'

const getAllUsers = (callback, errorCallback) => {

    serviceCallAuth({url:'/users', method:'get'}).then(res => {
        res.data && callback && callback(res.data.users)
    })
}

const deleteUser = (userId, callback, errorCallback) => {

    serviceCallAuth({url:`/users/${userId}`, method:'delete'}).then(res => {
        res.data && callback && callback(res.data.message)

    })

}
export {getAllUsers, deleteUser}