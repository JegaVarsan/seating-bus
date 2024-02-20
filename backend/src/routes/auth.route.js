const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const db = require('../config/db.config');
const checkEmail = require('../middlewares/checkEmail');
const { signup: signupValidator, signin: signinValidator } = require('../validators/auth');
const authController = require('../controllers/auth.controller');
const { logger } = require('../utils/logger');

router.route('/signup')
    // .post(signupValidator, asyncHandler(checkEmail), asyncHandler(authController.signup));
    .post(signupValidator,asyncHandler(checkEmail), asyncHandler(authController.signup))

router.route('/signin')
    .post(signinValidator, asyncHandler(authController.signin));

router.route('/get-user/:id')
.get(authController.getUser);

router.route('/bookseat').post(authController.bookseat);

router.route('/cancelseat').post(authController.cancelseat);


module.exports = router;