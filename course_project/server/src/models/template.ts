import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import User from './user';
import {TemplateAttributes, TemplateCreationAttributes} from "../interfaces/template.interface";

class Template extends Model<TemplateAttributes, TemplateCreationAttributes> implements TemplateAttributes {
    public id!: number;
    public title!: string;
    public description!: string;
    public isPublic!: boolean;
    public userId!: number;
}

Template.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        isPublic: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        allowedUsers: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'id',
            },
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Template',
        tableName: 'templates',
        timestamps: true,
    }
);

Template.belongsTo(User, { foreignKey: 'userId' });
export default Template;
