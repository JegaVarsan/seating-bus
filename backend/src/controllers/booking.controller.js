
const seat_book = require('../models/seat_booking');
const cancel_booking = require('../models/cancel_booking');

exports.book_seat = (req,res,next)=>{
    const reqBody = req.body;
    const seat_number = reqBody.seat_number;
    const booking_id = reqBody.booking_id;
    const seat_selection_date = reqBody.seat_selection_date;
    const seat_booking_satus = reqBody.seat_booking_status;
    const seat_status = reqBody.seat_status;
    const seat_booked_by = reqBody.seat_booked_by;
    const created_by = reqBody.created_by;
    const updated_by = reqBody.updated_by;
    seat_book.create({
        seat_number:seat_number,
        booking_id:booking_id,
        seat_selection_date:seat_selection_date,
        seat_booking_status:seat_booking_satus,
        seat_status:seat_status,
        seat_booked_by:seat_booked_by,
        created_by:created_by,
        updated_by:updated_by

    }).then(result=>{console.log(result);
    res.status(200).send({
        status:"success",
        data:{
            result:result
        }
    })}).catch(err=>{
        console.log(err);
    });

};
exports.get_booking = (req, res, next)=>{
    const associate_id = req.params.associate_id;
    seat_book.findAll({
        where:{
            booked_for_id:associate_id
        }
    })
    .then((data)=>{
        res.status(200).json({
            status:"success",
            datas:data
        })
    })
    .catch((err)=>{
        res.status(400).json({
            status:"failure",
            message:err.message,
        })
    })
};

exports.deleteBooking = (req,res,next)=>{
    const bookingId = req.body.booking_id;
     seat_book.findByPk(bookingId).then(booking=>{
       return booking.destroy();
    }).then(result=>{
        console.log("Deleted the booking!");
        res.status(200).send({
            status:"success",
            data:{
                result:result
            }
        })
    }).catch(err=>{
        console.log(err);
    })
}

exports.edit_booking = (req,res,next)=>{
    const reqBody = req.body;
    const seat_number = reqBody.seat_number;
    const booking_id = reqBody.booking_id;
    const seat_selection_date = reqBody.seat_selection_date_date;
    const seat_booking_satus = reqBody.seat_booking_status;
    const seat_status = reqBody.seat_status;
    const seat_booked_by = reqBody.seat_booked_by;
    const created_by = reqBody.created_by;
    const updated_by = reqBody.updated_by;
    seat_book.findByPk(booking_id).then(booking=>{
        booking.bookind_id = booking_id;
        booking.seat_number = seat_number;
        booking.seat_selection_date = seat_selection_date;
        booking.seat_booking_satus = seat_booking_satus;
        booking.seat_status = seat_status;
        booking.seat_booked_by = seat_booked_by;
        booking.created_by = created_by;
        booking.updated_by = updated_by;
        return booking.save();
    }).then(result=>{
        console.log(result);
        res.send({
            status:"success",
            data:{
                result
            }
        });
    }).catch(err=>{
        console.log(err);
    })
};

exports.cancel_booking = (req,res,next)=>{
    
    associate_id = req.params.associate_id;
    cancel_booking.findAll({
        where:{
            associate_id:associate_id,
        }
    })
    .then((data)=>{
        res.status(200).json({
            status:"success",
            datas:data
        })
    })
    .catch((err)=>{
        res.status(400).json({
            status:"failure",
            message:err.message,
        })
    })
};

exports.is_date_available=(req,res,next)=>{
    const date=req.params.date;
    console.log(date);
    seat_book.findAll({
        where:{
            seat_selection_date:date
        }
    })
    .then((data)=>{
        if(data.length > 0){
            res.status(200).send({
                status:"success",
                message:"The seat is generated on this date"
            })
        }
        else{
            res.status(200).send({
                status:"failure",
                message:"The seat is not generated on this date"
            })
        }
    })
    .catch((err)=>{
        res.status(400).json({
            status:"failure",
            message:err.message,
        })
    })
}

exports.is_already_booked=(req,res,next)=>{
    console.log(req.body);
    const date=req.body.date;
    const seat_number=req.body.seat_number;
    
    seat_book.findOne({
        where:{
            seat_selection_date:date,
            seat_number:seat_number
        }
    })
    .then((data)=>{
        console.log(data);
        if(data.dataValues.seat_status!=1){
            res.status(200).send({
                status:"success",
                message:"The seat is already booked"
            })
        }
        else{
            res.status(200).send({
                status:"success",
                message:"The seat is available"
            })
        }
    })
    .catch((err)=>{
        res.status(400).json({
            status:"failure",
            message:err.message,
        })
    })
}