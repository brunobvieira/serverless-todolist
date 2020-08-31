"use strict";

const { DataTypes } = require("sequelize");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.createTable("todos", {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true
            },
            user_id: {
                type: DataTypes.BIGINT,
                references: {
                    model: "users",
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
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false
            },
            deletedAt: {
                type: Sequelize.DATE
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.dropTable("todos");
    }
};
