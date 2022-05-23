require('dotenv').config();

const { Sequelize } = require('sequelize');

// console.log(process.env.DB_NAME);
// console.log(process.env.DB_HOST);
// console.log(process.env.DB_USER);
// console.log(process.env.DB_PW);
// console.log(process.env.DB_PORT);

// /*
const db = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PW, 
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql'
    });
// */

module.exports = db;