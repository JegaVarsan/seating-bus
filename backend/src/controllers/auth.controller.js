const User = require('../models/user');
const { hash: hashPassword, compare: comparePassword } = require('../utils/password');
const { generate: generateToken, decode: decodeToken } = require('../utils/token');


exports.signup = (req, res) => {

    var hashpass = hashPassword(req.body.password);

    var data={
        "id":req.body.id,
        "firstname":req.body.firstname,
        "lastname":req.body.lastname,
        "email":req.body.email,
        "password":hashpass
    }
    User.create(data).then(data=>{
        res.status(200).json({
            status:"success",
            message:"User added",
            data:data
        })
    })
    .catch((err)=>{
        return res.status(400).json({
            status:"failure",
            error:err
        })
    })
};

exports.signin = (req, res) => {
    const {email,password:pass}=req.body;
    User.findOne({
        where:{
            email:email
        }
      })
        .then((data) => {
          console.log(data);
          if (!data) {
            return res.status(400).json({
                status:"Failure",
                message:"No email id found"
            });
          } else {
            var hashpass_db=data.password;
            if(comparePassword(pass,hashpass_db)){
                return res.status(200).json({
                    status:"success",
                    message: "Logged In Successfully",
                    data:data
                  });
            }
            else{
                return res.status(400).json({
                    status:"Failure",
                    message: "GMAIL AND PASSWORD NOT MATCHED !!",
                });
            }
          }
        })
        .catch((err) => {
          console.log("Login Failed");
          return res.status(400).json({
            status:"Failure",
            error:err.message
          })
        });
}