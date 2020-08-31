const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define("users", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(60),
            allowNull: false
        },
        lastLoginAt: DataTypes.DATE
    });
};
