import {
    AutoIncrement, Column, DataType, Model, PrimaryKey, Table, CreatedAt, UpdatedAt, HasMany, BelongsToMany
} from "sequelize-typescript";
import Project from "../../project/models/Project";
import ProjectUsers from "../../project/models/ProjectUsers";

@Table({
    tableName: "users"
})

export default class Users extends Model<Users> {

    @PrimaryKey
    @AutoIncrement
    @Column({type: DataType.INTEGER})
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    firstname: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    lastname: string;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    contactNo: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    password: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    token: string;

    @CreatedAt
    @Column({type: DataType.DATE})
    createdAt: Date;

    @UpdatedAt
    @Column({type: DataType.DATE})
    updatedAt: Date;

    @HasMany(() => Project)
    createdProjects: Project[];

    @BelongsToMany(() => Project, () => ProjectUsers)
    accessProjects: Project[];
}
