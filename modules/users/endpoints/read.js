"use strict";

const response = require("../../../shared/response");
const { authenticateAndGetUser } = require("../../../shared/authorization");

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
