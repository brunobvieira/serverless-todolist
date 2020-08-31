"use strict";

const { Sequelize } = require("sequelize");

const response = require("../../../shared/response");
const { authenticateAndGetUser } = require("../../../shared/authorization");
const UserModel = require("../../../database/models/User");
const TodoModel = require("../../../database/models/Todo");
const dbconfig = require("../../../database/database");


const sequelize = new Sequelize(dbconfig);
const User = UserModel(sequelize);
const Todo = TodoModel(sequelize);

module.exports.get = async (event) => {
    const authenticatedUser = await authenticateAndGetUser(event);
    if (!authenticatedUser) {
        return response.json({ path: "token", message: `Token not present or invalid.` }, 400);
    }

    let res = {
        id: authenticatedUser.id,
        username: authenticatedUser.username,
        email: authenticatedUser.email,
        createdAt: authenticatedUser.createdAt,
        updatedAt: authenticatedUser.updatedAt,
        lastLoginAt: authenticatedUser.lastLoginAt
    };

    return response.json(res, 200);
};
