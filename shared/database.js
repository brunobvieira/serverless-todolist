const { Sequelize } = require("sequelize");

module.exports = new Sequelize(
  process.env.DBDATABASE,
  process.env.DBUSER,
  process.env.DBPASSWORD,
  {
    host: process.env.DBHOST,
    dialect: process.env.DBDIALECT,
    port: process.env.DBPORT,
    pool: {
      min: 0,
      max: 1,
      idle: 10000,
    },
  }
);
