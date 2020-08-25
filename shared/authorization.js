const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const secret = process.env.SECRET ? process.env.SECRET : "todolist";

const generateToken = (userData) => {
    return jwt.sign(userData, secret, { expiresIn: "2 days" });
};

const createPassword = (password) => {
    return bcrypt.hashSync(password, 5);
};

const verifyPassword = (password, hash) => {
    return bcrypt.compareSync(password, hash);
}

module.exports = {
    secret,
    generateToken,
    createPassword,
    verifyPassword
};
