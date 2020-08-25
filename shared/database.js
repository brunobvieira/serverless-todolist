"use strict";

const { Sequelize } = require("sequelize");

if(process.env.IS_OFFLINE) {
  module.exports = new Sequelize({
    dialect: 'sqlite',
    storage: 'db.sqlite'
  });
} else {
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
}


