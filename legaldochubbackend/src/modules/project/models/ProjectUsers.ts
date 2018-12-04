import {
    AutoIncrement, Column, DataType, Model, PrimaryKey, Table, CreatedAt, UpdatedAt, ForeignKey, BelongsTo
} from "sequelize-typescript";
import Users from "../../users/models/Users";
import Project from "./Project";

@Table({
    tableName: "project_user"
})

export default class ProjectUsers extends Model<ProjectUsers> {

    @PrimaryKey
    @AutoIncrement
    @Column({type: DataType.INTEGER})
    id: number;

    @ForeignKey(() => Project)
    projectId: number;

    @ForeignKey(() => Users)
    userId: number;

    @CreatedAt
    @Column({type: DataType.DATE})
    createdAt: Date;

    @UpdatedAt
    @Column({type: DataType.DATE})
    updatedAt: Date;

    @BelongsTo(() => Project)
    project: Project;

    @BelongsTo(() => Users)
    user: Users;
}
