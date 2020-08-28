"use strict";

const Joi = require("joi");
const { Sequelize } = require("sequelize");

const response = require("../../../shared/response");
const validator = require("../../../shared/validator");
const { authenticateAndGetUser } = require("../../../shared/authorization");
const TodoModel = require("../../../database/models/Todo");
const dbconfig = require("../../../database/database");

const Todo = TodoModel(new Sequelize(dbconfig));

const todoSchema = Joi.object({
    description: Joi.string().min(1).max(255).required()
});

module.exports.create = async (event) => {
    try {
        const authenticatedUser = await authenticateAndGetUser(event);
        if (!authenticatedUser) {
            return response.json({ path: "token", message: `Must be logged in.` }, 401);
        }

        const body = event.body ? event.body : event;
        const data = JSON.parse(body);

        let { value, error } = validator(todoSchema, data);
        if (error) return response.json(error, 400);

        value.user_id = authenticatedUser.id;
        const createdTodo = await Todo.create(value);

        return response.json(createdTodo, 201);
    } catch (err) {
        return response.json(err, 500);
    }
};
