const { DataTypes } = require("sequelize");
const User = require("./User");

module.exports = (sequelize) => {
    return sequelize.define("todos", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.BIGINT,
            references: {
                model: User(sequelize),
                key: "id"
            },
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        done: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });
};
