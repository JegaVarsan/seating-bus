const User = require('../models/user');
const { hash: hashPassword, compare: comparePassword } = require('../utils/password');
const { generate: generateToken, decode: decodeToken } = require('../utils/token');
const book_seat = require('../models/seat_booking')


exports.signin = (req, res) => {
  
    const {email,password:pass}=req.body;
    console.log(email+" "+pass)
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

exports.bookseat=(req,res,next)=>{
  const seatno =req.body.seat_number;

  book_seat.findOne({
    where:{
      seat_selection_date:req.body.date,
      seat_number:seatno
    }
  })
  .then((seat)=>{
    seat.seat_selection_date=req.body.date,
    seat.booked_for_id=req.body.associate_id,
    seat.booked_for_name=req.body.associate_name,
    seat.seat_booking_status=1,
    seat.seat_status=0,
    seat.seat_booked_by=req.body.seat_booked_by,
    seat.save();
    console.log(`${seat.booked_for_name} booked the seat ${seat.seat_number} on ${seat.seat_selection_date}`)
    res.status(200).json({
      status:"success",
      message:`${seat.booked_for_name} booked the seat ${seat.seat_number} on ${seat.seat_selection_date}`,
      data:seat
    })
  })
  .catch((err)=>{
    console.log(err);
    res.status(400).json({
      status:"failure",
      message:"Error in booking the seat for user(authcontroller.bookseat())"
    })
  })
}

exports.cancelseat=(req,res,next)=>{
  const seatno =req.body.seat_number;
  console.log(req.body);
  var temp_storingname;
  book_seat.findOne({
    where:{
      seat_selection_date:req.body.date,
      seat_number:seatno
    }
  })
  .then((seat)=>{
    temp_storingname=seat.booked_for_name,
    seat.booked_for_id=null,
    seat.booked_for_name=null,
    seat.seat_booking_status=0,
    seat.seat_status=1,
    seat.seat_booked_by=null,
    seat.save();
    console.log(`${temp_storingname} cancelled the seat ${seat.seat_number} on ${seat.seat_selection_date}`)
    res.status(200).json({
      status:"success",
      message:`${temp_storingname} cancelled the seat ${seat.seat_number} on ${seat.seat_selection_date}`,
      data:seat
    })
  })
  .catch((err)=>{
    console.log(err);
    res.status(400).json({
      status:"failure",
      message:"Error in cancelling the seat for user(authcontroller.cancelseat())"
    })
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