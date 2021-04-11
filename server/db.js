const Sequelize = require('sequelize');
const sequelize = new Sequelize("postgres://postgres:4b5caafe64614b10bea208b3acdd2976@localhost:5432/workout3");


module.exports = sequelize;