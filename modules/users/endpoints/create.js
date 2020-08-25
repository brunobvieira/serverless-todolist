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
    email: Joi.string().email().required()
});

const countByUsername = async (username) => {
    return await User.count({ where: { username: username } });
};

const countByEmail = async (email) => {
    return await User.count({ where: { email: email } });
};

module.exports.healthCheck = async (event) => {
    try {
        await sequelize.authenticate();
        return response.json({ message: "Connection has been established successfully." }, 200);
    } catch (err) {
        return response.json(err, 500);
    }
};

module.exports.create = async (event) => {
    try {
        const body = event.body ? event.body : event;
        const data = JSON.parse(body);

        let { value, error } = validator(userSchema, data);
        if (error) {
            return response.json(error, 400);
        }

        const usersWithThisUsername = await countByUsername(value.username);
        if (usersWithThisUsername > 0) {
            return response.json({ path: "email", message: "username already taken" }, 400);
        }

        const usersWithThisEmail = await countByEmail(value.email);
        if (usersWithThisEmail > 0) {
            return response.json({ path: "email", message: "email already taken" }, 400);
        }

        value.password = bcrypt.hashSync(value.password, 5);

        const user = await User.create(value);
        return response.json(user, 201);
    } catch (err) {
        return response.json(err, 500);
    }
};
