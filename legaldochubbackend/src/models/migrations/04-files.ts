"use strict";
import { QueryInterface } from "sequelize";
import { Sequelize } from "sequelize-typescript";


module.exports = {
    up: function (queryBuilder: QueryInterface) {
        return queryBuilder.createTable("files", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            fileName: {
                type: Sequelize.STRING,
                allowNull: false
            },
            projectId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "projects",
                    key: "id"
                }
            },
            uploadedBy: {
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
        return queryBuilder.dropTable("files");
    }
};