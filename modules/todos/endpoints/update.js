"use strict";

const Joi = require("joi");
const response = require("../../../shared/response");
const validator = require("../../../shared/validator");
const { authenticateAndGetUser } = require("../../../shared/authorization");

const TodoModel = require("../../../models/Todo");
const sequelize = require("../../../shared/database");

const Todo = TodoModel(sequelize);

const todoSchema = Joi.object({
    description: Joi.string().min(1).max(255),
    done: Joi.bool()
});

module.exports.update = async (event) => {
    try {
        const authenticatedUser = await authenticateAndGetUser(event);
        if (!authenticatedUser) {
            return response.json({ path: "token", message: `Must be logged in.` }, 401);
        }

        const id = event.pathParameters.id;

        const body = event.body ? event.body : event;
        const data = JSON.parse(body);

        let { value, error } = validator(todoSchema, data);
        if (error) return response.json(error, 400);

        const todoFind = await Todo.findByPk(id);

        if (!todoFind) {
            return response.json({ message: `Not finded Todo whith ID: ${id}` }, 404);
        }

        const todoUpdated = await todoFind.update(value);

        return response.json(todoUpdated, 201);
    } catch (err) {
        return response.json(err, 500);
    }
};
