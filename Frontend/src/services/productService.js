const { serviceCallAuth } = require('./serviceCall')

const addProduct = (data, callback, errorCallback) => {

  serviceCallAuth({url:'/products', method:'post', data}) .then((res) => {
    res.data && callback && callback(res.data);
  })
  .catch((err) => {
    errorCallback && errorCallback(err.response.data.message);
  });

}

const getAllProductCategories = (callback, errorCallback) => {
  serviceCallAuth({url:'/products/categories', method:'get'}).then((res) => {
    res.data && callback && callback(res.data.categories)
  })
}

const editProduct = (data, callback, errorCallback) => {
  serviceCallAuth({url:`/products/${data['_id']}`, method:'patch', data}) .then((res) => {
    res.data && callback && callback(res.data);
  })
  .catch((err) => {
    errorCallback && errorCallback(err.response.data.message);
  });


}

const deleteProduct = (productId, callback, errorCallback) => {
  serviceCallAuth({ url: `/products/${productId}`, method: 'delete' })
  .then((res) => {
    res.data && callback && callback(res.data);
  })
  .catch((err) => {
    errorCallback && errorCallback(err.response.data);
  });

}

const getAllProducts = (params, callback, errorCallback) => {
    serviceCallAuth({ url: '/products', method: 'get', params })
    .then((res) => {
      res.data && callback && callback(res.data.products);
    })
    .catch((err) => {
      errorCallback && errorCallback(err.response.data);
    });
}

const getSingleProduct = (data, callback, errorCallback) => {
  serviceCallAuth({url:`/products/${data.id}`, method:'get'})
  .then((res) => {
    res.data && callback && callback(res.data.product);
  })
  .catch((err) => {
    errorCallback && errorCallback(err.response.data);
  });

}

const uploadImage = (data, callback, errorCallback) => {
  serviceCallAuth({url:'/products/uploadImage', method:'post', data, headers: {
    'Content-Type': 'multipart/form-data'
  }}).then((res) => {
    res.data && callback && callback(res.data.image);
  })
  .catch((err) => {
    errorCallback && errorCallback(err.response.data);
  });



}

export {getAllProducts, getSingleProduct, uploadImage, getAllProductCategories, addProduct, deleteProduct, editProduct};