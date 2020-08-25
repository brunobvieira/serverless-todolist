"use strict";

const response = require("../../../shared/response");
const { authenticateAndGetUser } = require("../../../shared/authorization");
const TodoModel = require("../../../models/Todo");
const sequelize = require("../../../shared/database");
const Todo = TodoModel(sequelize);

module.exports.delete = async (event) => {
    try {
        const authenticatedUser = await authenticateAndGetUser(event);
        if (!authenticatedUser) {
            return response.json({ path: "token", message: `Must be logged in.` }, 401);
        }

        const id = event.pathParameters.id;
        const todoFind = await Todo.findByPk(id);

        if (!todoFind) {
            return response.json({ message: `Not finded Todo whith ID: ${id}` }, 404);
        }

        await todoFind.destroy();

        return response.json(null, 201);
    } catch (err) {
        return response.json(err, 500);
    }
};
