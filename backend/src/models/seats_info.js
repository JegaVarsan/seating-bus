const Sequelize = require('sequelize')
const sequelize = require ('../utils/database')

const seats_info = sequelize.define('seats_info',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    seat_number:{
        type:Sequelize.STRING,
        allowNull: false,
        primaryKey:true,
        unique: true,
    },
    status:Sequelize.BOOLEAN,
    created_by:Sequelize.STRING,
    updated_by:Sequelize.STRING
});

module.exports = seats_info

