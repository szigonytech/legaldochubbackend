"use strict";
import { QueryInterface } from "sequelize";
import { Sequelize } from "sequelize-typescript";


module.exports = {
    up: function (queryBuilder: QueryInterface) {
        return queryBuilder.createTable("project_user", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            projectId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "projects",
                    key: "id"
                }
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "users",
                    key: "id"
                }
            },
            createdAt: {
                type: Sequelize.DATE
            },
            updatedAt: {
                type: Sequelize.DATE
            }
        });
    },

    down: function (queryBuilder: QueryInterface) {
        return queryBuilder.dropTable("project_user");
    }
};