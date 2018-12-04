"use strict";
import { QueryInterface } from "sequelize";
import { Sequelize } from "sequelize-typescript";


module.exports = {
    up: function (queryBuilder: QueryInterface) {
        return queryBuilder.createTable("files_history", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            fileId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "files",
                    key: "id"
                }
            },
            versionName: {
                type: Sequelize.STRING,
                allowNull: false
            },
            isLatest: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true
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
        return queryBuilder.dropTable("files_history");
    }
};