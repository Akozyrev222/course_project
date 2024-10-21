import {DataTypes, Model} from "sequelize";
import sequelize from "../config/database";
import {TagAttributes} from "../interfaces/tag.interface";
import User from "./user";



class Tag extends Model<TagAttributes> implements TagAttributes {
    public id!: number;
    public name!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

// Инициализация модели
Tag.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        sequelize,
        modelName: 'Tag',
        tableName: 'tags',
        timestamps: true,
    }
);
export default Tag;
