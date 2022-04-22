const express = require('express');
const { updateUserPassword, getAllUsers, getSingleUser, showCurrentUser, deleteUser } = require('../controllers/userController');
const { authorizePermissions } = require('../middleware/authentication');

const router = express.Router();

router.route('/').get(authorizePermissions('admin') , getAllUsers)
router.route('/updatePassword').patch(updateUserPassword)
router.route('/showMe').get(showCurrentUser);
router.route('/:id').get(getSingleUser).delete(deleteUser)
module.exports = router;