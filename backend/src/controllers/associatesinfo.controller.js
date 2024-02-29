const {hash} = require('../utils/password')
const {Sequelize} = require('sequelize');
const User = require('../models/user');
const {forgotPassMail} = require('./email.controller');

const { generate: generateToken, decode: decodeToken } = require('../utils/token');

// const { generate: generateToken, decode: decodeToken } = require('../utils/token');

exports.getAssociates = (req, res, next)=>{
    User.findAll({where:{
        manager_id:req.params.manager_id
    }}).then(users=>{
        console.log(users);
        res.status(200).send({
            status: "success",
            data: {
                users:users
            }
        });
    })
}
 
exports.getAssociate = (req,res,next)=>{
    User.findOne({where:{
        associate_id:req.params.associate_id
    }}).then(user=>{
        console.log(user);
        res.status(200).send({
            stats:"success",
            data:{
                user:user
            }
        });
    })
}

exports.setAssociatePass = (req,res,next)=>{
    const jwt_token = req.params.jwt_token;
    const decodedToken = decodeToken(jwt_token);
    console.log(decodedToken);
    // res.send({
    //     "status":"success",
    //     "data":{
    //         "decoded":decodedToken.id
    //     }
    // })
    console.log("Decoded id :"+decodedToken.id);
    User.findOne({where:{
        associate_id:decodedToken.id
    }}).then(user=>{
        console.log("Found user : "+JSON.stringify(user));
        user.password = hash(req.body.password);
        user.save();
    }).then(result=>{
        res.send({
           "status":"success",
           "result":result
        })
    }).catch(err=>console.log("Something went wrong while updating password"));
}


exports.forgotPass = (req,res,next)=>{
    const userMail = req.params.email;
    forgotPassMail(userMail);

}