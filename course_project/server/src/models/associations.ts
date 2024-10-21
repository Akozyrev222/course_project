import User from './user';
import Template from './template';
import Tag from './tag'

// Определяем связи
export default function setupAssociations() {
    User.hasMany(Template, {foreignKey: 'userId'});
    Template.belongsTo(User, {foreignKey: 'userId'});
    Template.belongsToMany(Tag, {through: 'TemplateTags'});
    Tag.belongsToMany(Template, {through: 'TemplateTags'});
}