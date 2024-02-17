const User = require('../models/user');
const { hash: hashPassword, compare: comparePassword } = require('../utils/password');
const { generate: generateToken, decode: decodeToken } = require('../utils/token');


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
          data:{
            "associate_id":data.associate_id,
            "associate_name":data.associate_name,
            "email":data.email,
            "mobile_no":data.mobile_no,
            "manager_id":data.manager_id,
            "manager_name":data.manager_name
          }
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
          error:err.message
      })
  }
  
}