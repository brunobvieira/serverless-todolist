"use strict";

const response = require("../../../shared/response");
const { authenticateAndGetUser } = require("../../../shared/authorization");

const TodoModel = require("../../../models/Todo");
const sequelize = require("../../../shared/database");
const Todo = TodoModel(sequelize);

const findTodosByUser = async (userId) => {
    return await Todo.findAll({
        where: { user_id: userId }
    });
};

const findByIdAndUser = async (id, userId) => {
    return await Todo.findOne({
        where: { id: id, user_id: userId }
    });
};

module.exports.list = async (event) => {
    try {
        const authenticatedUser = await authenticateAndGetUser(event);
        if (!authenticatedUser) {
            return response.json({ path: "token", message: `Must be logged in.` }, 401);
        }

        const todos = await findTodosByUser(authenticatedUser.id);

        return response.json(todos, 200);
    } catch (err) {
        return response.json(err, 500);
    }
};

module.exports.get = async (event) => {
    try {
        const authenticatedUser = await authenticateAndGetUser(event);
        if (!authenticatedUser) {
            return response.json({ path: "token", message: `Must be logged in.` }, 401);
        }

        let todoId = event.pathParameters.id;
        if (!todoId) return response.json({ path: "id", message: "id is required." }, 400);

        const todo = await findByIdAndUser(todoId, authenticatedUser.id);
        if (!todo) return response.json({}, 404, false);

        return response.json(todo, 200);
    } catch (err) {
        return response.json(err, 500);
    }
};
