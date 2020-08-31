"use strict";

const { Sequelize } = require("sequelize");

const response = require("../../../shared/response");
const { authenticateAndGetUser } = require("../../../shared/authorization");
const TodoModel = require("../../../database/models/Todo");
const dbconfig = require("../../../database/database");

const Todo = TodoModel(new Sequelize(dbconfig));

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

        return response.json(null, 204);
    } catch (err) {
        return response.json(err, 500);
    }
};
