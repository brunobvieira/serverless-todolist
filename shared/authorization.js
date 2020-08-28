"use strict";

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const UserModel = require("../database/models/User");
const sequelize = require("./database");

const User = UserModel(sequelize);

const tokenSecret = process.env.SECRET ? process.env.SECRET : "todolist";

const generateToken = (userData) => {
    return jwt.sign(userData, tokenSecret, { expiresIn: "2 days" });
};

const createPassword = (password) => {
    return bcrypt.hashSync(password, 5);
};

const verifyPassword = (password, hash) => {
    return bcrypt.compareSync(password, hash);
};

const getTokenFromEvent = (event) => {
    return event.headers.Authorization.replace("Bearer ", "");
};

async function authenticateAndGetUser(event) {
    try {
        const token = getTokenFromEvent(event);
        const decoded = jwt.verify(token, tokenSecret);
        const userId = decoded.id;
        const authenticatedUser = await User.findOne({ where: { id: userId } });
        return authenticatedUser;
    } catch (err) {
        return null;
    }
}

module.exports = {
    secret: tokenSecret,
    generateToken,
    createPassword,
    verifyPassword,
    getTokenFromEvent,
    authenticateAndGetUser
};
