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
    const booking_id = req.body.booking_id;
    seat_book.findByPk(booking_id).then(seat_book=>
        res.status(200).send({
            status:"success",
            data:{
               booking:seat_book
            }
        })
    )
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
    const reqBody = req.body;
    const seat_number = reqBody.seat_number;
    const booking_id = reqBody.booking_id;
    const seat_cancellation_date = reqBody.seat_cancellation_date;
    const seat_cancelled_by = reqBody.seat_cancelled_by;
    const status = reqBody.status;
    const created_by = reqBody.created_by;
    const updated_by = reqBody.updated_by;
    cancel_booking.create({
        seat_number:seat_number,
        booking_id:booking_id,
        seat_cancellation_date:seat_cancellation_date,
        seat_cancelled_by:seat_cancelled_by,
        status:status,
        seat_cancelled_by:seat_cancelled_by,
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