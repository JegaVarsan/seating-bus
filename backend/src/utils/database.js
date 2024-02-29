// const Sequelize = require('sequelize');

// const seq = new Sequelize('busdb', 'root', 'P2pug8m8Kaur', {
//   dialect: 'mysql',
//   host: 'localhost'
// });
// module.exports = seq;

const {  DB_HOST,DB_USER,DB_PASS,DB_NAME } = require('../utils/secrets');
const Sequelize = require('sequelize');

const seq = new Sequelize(DB_NAME,DB_USER, DB_PASS, {
  dialect: 'mysql',
  host: DB_HOST
});
module.exports = seq;
