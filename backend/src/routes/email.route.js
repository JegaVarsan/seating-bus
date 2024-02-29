const express=require('express')
const router=express.Router();
 
const emailController = require('../controllers/email.controller');
router.route('/send-mail/:uid').post(emailController.sendMail);
router.route('/booking-success').post(emailController.bookingSucessMail);
router.route('/manager/booking-success').post(emailController.bookingSucessMailManager);
router.route('/booking-cancelled').post(emailController.bookingCancelMail);
 
module.exports = router;