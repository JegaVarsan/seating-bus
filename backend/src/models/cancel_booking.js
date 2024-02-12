const {Sequelize} = require('sequelize')
const sequelize = require ('../utils/database')
const CancelBooking = sequelize.define('cancel_booking',{
    booking_id:{
        type:Sequelize.STRING,
        allowNull:false,
        primaryKey:true
    },
    seat_number:{
        type:Sequelize.STRING,
        allowNull:false
    },
    seat_cancelled_by:Sequelize.STRING,
    seat_cancellation_date:Sequelize.STRING,
    status:Sequelize.INTEGER,
    created_by:Sequelize.STRING,
    updated_by:Sequelize.STRING,
    // seat_selection_date:Sequelize.STRING,
    // seat_booking_status:Sequelize.STRING,
    // seat_status:Sequelize.INTEGER,
    // seat_booked_by:Sequelize.STRING,
    // created_by:Sequelize.STRING,
    // updated_by:Sequelize.STRING


});
module.exports = CancelBooking;