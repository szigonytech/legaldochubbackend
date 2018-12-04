import {
    AutoIncrement, Column, DataType, Model, PrimaryKey, Table, CreatedAt, UpdatedAt, ForeignKey, BelongsTo, BelongsToMany, HasMany
} from "sequelize-typescript";
import Users from "../../users/models/Users";
import ProjectUsers from "./ProjectUsers";
import Files from "./Files";

@Table({
    tableName: "projects"
})

export default class Project extends Model<Project> {

    @PrimaryKey
    @AutoIncrement
    @Column({type: DataType.INTEGER})
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name: string;

    @ForeignKey(() => Users)
    createdBy: number;

    @CreatedAt
    @Column({type: DataType.DATE})
    createdAt: Date;

    @UpdatedAt
    @Column({type: DataType.DATE})
    updatedAt: Date;

    @BelongsTo(() => Users)
    createdUser: Users;

    @BelongsToMany(() => Users, () => ProjectUsers)
    accessUsers: Users[];

    @HasMany(() => Files)
    files: Files[];
}
