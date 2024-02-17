const {Sequelize} = require('sequelize')
const User = require('../models/user');
const { hash: hashPassword, compare: comparePassword } = require('../utils/password');

exports.addUser = async(req, res, next)=>{

    var hashpass = hashPassword(req.body.password);

    const associate_name = req.body.associate_name;
    const associate_id = req.body.associate_id;
    const localsystemid = req.body.localsystemid;
    const email = req.body.email;
    const mobile_no=req.body.mobile_no;
    const manager_id = req.body.manager_id;
    const manager_email = req.body.manager_email;
    const manager_name = req.body.manager_name;
    const ismanager = req.body.ismanager;
    const isAdmin = req.body.isAdmin;
    const direct_reports = req.body.direct_reports;
    const company = req.body.company;
    const OpCo = req.body.OpCo;
    const password = hashpass;

    User.create({
        associate_name:associate_name,
        associate_id:associate_id,
        password:password,
        localsystemid:localsystemid,
        email:email,
        mobile_no:mobile_no,
        manager_id:manager_id,
        manager_email:manager_email,
        manager_name:manager_name,
        ismanager:ismanager,
        isAdmin:isAdmin,
        direct_reports:direct_reports,
        company:company,
        OpCo:OpCo
    }).then(data=>{
        res.status(200).json({
            status:"success",
            message:"User added",
            data:data
        })
    })
    .catch(err=>{
        return res.status(400).json({
            status:"failure",
            error:err
        })
    })
}

exports.getUsers = (req, res, next)=>{
    User.findAll().then(users=>{
        console.log(users)
        res.status(200).send({
            status: "success",
            data: {
                users:users
            }
        });
    })
}

exports.getUser = async(req, res, next)=>{
    try {
        var getid=req.params.id;
        const data =await User.findOne({
            where:{
                associate_id:getid
            }
        })
        if(data){
            return res.status(200).json({
            status:"success",
            data:data
            })
        }
        else{
            return res.status(200).json({
                status:"success",
                data:`There is no Employee with id ${getid}`
                })
        }
    } catch (err) {
        return res.status(400).json({
            status:"failure",
            error:err
        })
    }
    
}

exports.editUser = (req, res, next)=>{

    const associate_id = req.params.id;
    
    const associate_name = req.body.associate_name;
    const localsystemid = req.body.localsystemid;
    const email = req.body.email;
    const mobile_no=req.body.mobile_no;
    const manager_id = req.body.manager_id;
    const manager_email = req.body.manager_email;
    const manager_name = req.body.manager_name;
    const ismanager = req.body.ismanager;
    const isAdmin = req.body.isAdmin;
    const direct_reports = req.body.direct_reports;
    const company = req.body.company;
    const OpCo = req.body.OpCo;
    const password = req.body.pasword;

    User.findOne({
        where:{
            associate_id:associate_id
        }
    }).then(user=>
       {
        user.associate_name = associate_name;
        user.localsystemid = localsystemid;
        user.email = email;
        user.mobile_no=mobile_no;
        user.manager_id = manager_id;
        user.manager_email = manager_email;
        user.manager_name = manager_name;
        user.ismanager = ismanager;
        user.isAdmin = isAdmin;
        user.direct_reports = direct_reports;
        user.company = company;
        user.OpCo = OpCo;
        user.password = password;
        user.save()
        console.log("Updated the user!");
        return res.status(200).json({
            status:"success",
            message:"User updated successfully",
            data:user
        })
       }
    )
    .catch(err=>{
        return res.status(400).json({
            status:"failure",
            error:err.message
        })
    })
}

exports.deleteUser = (req,res,next)=>{
    const userid = req.params.id;
    User.findOne({
        where:{
            associate_id:userid
        }
    }).then(user=>{
        if(!userid){
            return res.status(400).json({
                status:"failure",
                message:`There is no employee with id ${userid}`
            })
        }
       user.destroy();
       console.log(user);
       console.log("Deleted the user!");
       return res.status(200).json({
        status:"success",
        message:"User deleted successfully",
        data:user
    })
    })
    .catch(err=>{
        return res.status(400).json({
            status:"failure",
            error:err
        })
    })
}


