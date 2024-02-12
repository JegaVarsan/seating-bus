const Sequelize = require('sequelize')
const sequelize = require ('../utils/database')

const User = sequelize.define('user',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    associate_id:{
        type:Sequelize.INTEGER,
        allowNull: false,
        primaryKey:true,
        unique: true,
    },
    associate_name: Sequelize.STRING,
    localsystemid: Sequelize.STRING,
    email:{
        type:Sequelize.STRING,
        primaryKey:true,
        unique: true,
    },
    password:Sequelize.STRING,
    manager_id:Sequelize.STRING,
    manager_name:Sequelize.STRING,
    manager_email:Sequelize.STRING,
    ismanager:Sequelize.BOOLEAN,
    isAdmin:Sequelize.BOOLEAN,
    direct_reports:Sequelize.INTEGER,
    company:Sequelize.STRING,
    OpCo:Sequelize.STRING
});

module.exports = User

