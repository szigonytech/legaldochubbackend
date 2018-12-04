import {
    AutoIncrement, Column, DataType, Model, PrimaryKey, Table, CreatedAt, UpdatedAt, ForeignKey, BelongsTo, BelongsToMany
} from "sequelize-typescript";
import Users from "../../users/models/Users";
import Files from "./Files";

@Table({
    tableName: "files_history"
})

export default class FilesHistory extends Model<FilesHistory> {

    @PrimaryKey
    @AutoIncrement
    @Column({type: DataType.INTEGER})
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    versionName: string;

    @ForeignKey(() => Files)
    fileId: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        defaultValue: true
    })
    isLatest: boolean;

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

    @BelongsTo(() => Files)
    file: FilesHistory;
}
