"use strict";

const response = require("../../../shared/response");
const { authenticateAndGetUser } = require("../../../shared/authorization");

const UserModel = require("../../../models/User");
const TodoModel = require("../../../models/Todo");
const sequelize = require("../../../shared/database");

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
        lastLogin: authenticatedUser.lastLogin
    };

    return response.json(res, 200);
};

module.exports.sync = async (event) => {
    await User.sync({ force: true });
    await Todo.sync({ force: true });
    return response.json({adfasd: 'dasd'}, 200);
}