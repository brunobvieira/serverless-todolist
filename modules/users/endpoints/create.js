"use strict";

const Joi = require("joi");
const bcrypt = require("bcryptjs");
const UserModel = require("../../../models/User");
const sequelize = require("../../../shared/database");
const response = require("../../../shared/response");
const validator = require("../../../shared/validator");

const User = UserModel(sequelize);

const userSchema = Joi.object({
  username: Joi.string().min(3).max(50).required(),
  password: Joi.string().min(8).max(50).required(),
  email: Joi.string().email().required(),
});

const countByUsername = async (username) => {
  return await User.count({
    where: { username: username },
  });
};

const countByEmail = async (email) => {
  return await User.count({
    where: { email: email },
  });
};

module.exports.healthCheck = async (event, context, callback) => {
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    await sequelize.authenticate();
    response.json(
      callback,
      { message: "Connection has been established successfully." },
      200
    );
  } catch (err) {
    response.json(callback, err, 500);
  }
};

module.exports.create = async (event, context, callback) => {
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    const body = event.body ? event.body : event;
    const data = JSON.parse(body);

    let { value, error } = validator(userSchema, data);
    if (error) {
      response.json(callback, { errors: error }, 400);
      return;
    }
    const usersWithThisUsername = await countByUsername(value.username);
    if (usersWithThisUsername > 0) {
      response.json(callback, { errors: ["username already taken"] }, 400);
      return;
    }

    const usersWithThisEmail = await countByEmail(value.email);
    if (usersWithThisEmail > 0) {
      response.json(callback, { errors: ["email already taken"] }, 400);
      return;
    }

    value.password = bcrypt.hashSync(value.password, 5);

    const user = await User.create(value);
    response.json(callback, user, 201);
  } catch (err) {
    response.json(callback, err, 500);
  }
};
