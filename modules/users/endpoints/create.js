"use strict";

const Joi = require("joi");
const { Sequelize } = require("sequelize");

const UserModel = require("../../../database/models/User");
const dbconfig = require("../../../database/database");
const response = require("../../../shared/response");
const validator = require("../../../shared/validator");
const { generateToken, createPassword } = require("../../../shared/authorization");

const User = UserModel(new Sequelize(dbconfig));

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

module.exports.create = async (event) => {
    try {
        const body = event.body ? event.body : event;
        const data = JSON.parse(body);

        let { value, error } = validator(userSchema, data);
        if (error) return response.json(error, 400);

        const usersWithThisUsername = await countByUsername(value.username);
        if (usersWithThisUsername > 0)
            return response.json({ path: "username", message: "username already taken" }, 400);

        const usersWithThisEmail = await countByEmail(value.email);
        if (usersWithThisEmail > 0) return response.json({ path: "email", message: "email already taken" }, 400);

        value.password = createPassword(value.password);

        const user = await User.create(value);

        let res = {
            id: user.id,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            lastLoginAt: new Date()
        };

        res.token = generateToken(res);
        await User.update({ lastLoginAt: res.lastLoginAt }, { where: { id: user.id } });

        return response.json(res, 201);
    } catch (err) {
        return response.json(err, 500);
    }
};
