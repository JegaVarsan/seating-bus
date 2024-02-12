const Sequelize = require('sequelize')
const sequelize = require ('../utils/database')
const BookSeat = sequelize.define('book_seat',{
    booking_id:{
        type:Sequelize.STRING,
        allowNull:false,
        primaryKey:true
    },
    seat_number:{
        type:Sequelize.STRING,
        allowNull:false
    },
    seat_selection_date:Sequelize.STRING,
    seat_booking_status:Sequelize.INTEGER,
    seat_status:Sequelize.INTEGER,
    seat_booked_by:Sequelize.STRING,
    created_by:Sequelize.STRING,
    updated_by:Sequelize.STRING

});
module.exports = BookSeat;