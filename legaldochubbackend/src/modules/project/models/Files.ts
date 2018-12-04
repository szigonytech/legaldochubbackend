import {
    AutoIncrement, Column, DataType, Model, PrimaryKey, Table, CreatedAt, UpdatedAt, ForeignKey, BelongsTo, BelongsToMany, HasMany
} from "sequelize-typescript";
import Users from "../../users/models/Users";
import Project from "./Project";
import FilesHistory from "./FilesHistory";

@Table({
    tableName: "files"
})

export default class Files extends Model<Files> {

    @PrimaryKey
    @AutoIncrement
    @Column({type: DataType.INTEGER})
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    fileName: string;

    @ForeignKey(() => Project)
    projectId: number;

    @ForeignKey(() => Users)
    uploadedBy: number;

    @CreatedAt
    @Column({type: DataType.DATE})
    createdAt: Date;

    @UpdatedAt
    @Column({type: DataType.DATE})
    updatedAt: Date;

    @BelongsTo(() => Users)
    uploadedUser: Users;

    @BelongsTo(() => Project)
    project: Project;

    @HasMany(() => FilesHistory)
    history: FilesHistory[];
}
