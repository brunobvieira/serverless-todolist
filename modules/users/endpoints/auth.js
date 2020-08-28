"use strict";

const Joi = require("joi");
const { Op, Sequelize } = require("sequelize");

const UserModel = require("../../../database/models/User");
const validator = require("../../../shared/validator");
const response = require("../../../shared/response");
const dbconfig = require("../../../database/database");
const { generateToken, verifyPassword } = require("../../../shared/authorization");

const User = UserModel(new Sequelize(dbconfig));

const authSchema = Joi.object({
    username: Joi.string().max(50).required(),
    password: Joi.string().max(50).required()
});

const getUserByUsername = async (username) => {
    return await User.findOne({
        where: { [Op.or]: [{ username: username }, { email: username }] }
    });
};

module.exports.login = async (event) => {
    try {
        const body = event.body ? event.body : event;
        const data = JSON.parse(body);

        let { value, error } = validator(authSchema, data);
        if (error) return response.json(error, 400);

        let user = await getUserByUsername(value.username);
        if (!user) {
            return response.json({ path: "username", message: `User not found: [${value.username}]` }, 400);
        }

        if (!verifyPassword(value.password, user.password)) {
            return response.json({ path: "password", message: "Wrong password." }, 400);
        }

        let res = {
            id: user.id,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            lastLogin: new Date()
        };

        res.token = generateToken(res);
        await User.update({ lastLogin: res.lastLogin }, { where: { id: user.id } });

        return response.json(res, 200);
    } catch (err) {
        return response.json(err, 500);
    }
};
