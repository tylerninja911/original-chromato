const express = require('express')
const { addProduct, updateProduct, getAllProducts, deleteProduct, getSingleProduct, deleteMultipleProducts, createMultipleProducts, getProductCategories } = require('../controllers/productController')
const uploadImage = require('../controllers/uploadController')
const { authorizePermissions, authenticateUser } = require('../middleware/authentication')
const router = express.Router()


router.route('/').get(getAllProducts).post([authenticateUser, authorizePermissions('admin')], addProduct).delete([authenticateUser, authorizePermissions('admin')], deleteMultipleProducts)
// .get(getAllProducts)

router.route('/uploadImage').post([authenticateUser, authorizePermissions('admin')], uploadImage)
router.route('/createMany').post([authenticateUser, authorizePermissions('admin'), createMultipleProducts])
router.route('/categories').get(getProductCategories)
router.route('/:id' ).get(getSingleProduct).patch([authenticateUser, authorizePermissions('admin')], updateProduct).delete([authenticateUser, authorizePermissions('admin')], deleteProduct)

// router.route('/deleteall').purge([authenticateUser, authorizePermissions('admin')], deleteMultipleProducts)
// router.route('/upload').post(uploadImage)

module.exports = router