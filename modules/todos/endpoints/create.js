"use strict";

const response = require("../../../shared/response");

module.exports.create = async (event) => {
    return response.json({}, 201);
};
