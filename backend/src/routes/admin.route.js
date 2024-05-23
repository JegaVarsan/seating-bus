const router = require('express').Router();
const adminController = require('../controllers/admin.controller');
const { asyncHandler } = require('../middlewares/asyncHandler');
const checkEmail = require('../middlewares/checkEmail');

const authUser = require('../middlewares/is-auth');

const { signup: signupValidator, signin: signinValidator } = require('../validators/auth');
router.route('/add-user').post(adminController.addUser);
router.route('/get-users').get(authUser,adminController.getUsers);
router.route('/get-user/:id').get(authUser,adminController.getUser);
router.route('/edit-user/:id').patch(authUser,adminController.editUser);
router.route('/delete-user/:id').delete(authUser,adminController.deleteUser);
module.exports = router;