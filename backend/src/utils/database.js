const Sequelize = require('sequelize');

const seq = new Sequelize('busdb', 'root', 'P2pug8m8Kaur', {
  dialect: 'mysql',
  host: 'localhost'
});
module.exports = seq;

