const {Sequelize} = require('sequelize');
const User = require('../models/user');
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
        req.status(200).send({
            stats:"success",
            data:{
                user:user
            }
        });
    })
}