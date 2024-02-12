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

router.delete('/deleteuser',(req,res,next)=>{
    // console.log(req.body);
    var email=req.body.email;
    var deletequery=`DELETE FROM users WHERE email= '${email}' `;
    db.query(deletequery,(err,result)=>{
        if(err){
            res.status(200).json({
                error:err,
                message:"Error in deleting user(Backend)"
            })
        }
        else console.log(result)
    })
})

router.patch('/updateuser',(req,res,next)=>{
    var firstname=req.body.firstname;
    var lastname=req.body.lastname;
    var email=req.body.email;
    var updatequery=` UPDATE users set firstname='${firstname}',lastname='${lastname}',email='${email}' 
                        where email='${email}' `;
    db.query(updatequery,(err,result)=>{
        if(err){
            res.status(200).json({
                error:err,
                message:"Error in updating user(Backend)"
            })
        }
        else console.log(result)
    })
})

module.exports = router;