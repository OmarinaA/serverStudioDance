const config = require("../config/knexfile");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD, {
        host: config.HOST,
        port: config.PORT,
        dialect: config.dialect,
        operatorsAliases: false,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("./user.model")(sequelize, Sequelize);
db.role = require("./role.model")(sequelize, Sequelize);
db.products = require("./product.model")(sequelize, Sequelize);
db.subscriptions = require("./subscriptions.model")(sequelize, Sequelize);
db.teachers = require("./teacher.model")(sequelize, Sequelize);
db.directions = require("./directions.model")(sequelize, Sequelize);
db.photo = require("./file.model")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});

db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});

db.subscriptions.belongsToMany(db.teachers, {
    through: 'SubscriptionTeacher',
    foreignKey: 'subscriptionId',
    otherKey: 'teacherId'
});
db.teachers.belongsToMany(db.subscriptions, {
    through: 'SubscriptionTeacher',
    foreignKey: 'teacherId',
    otherKey: 'subscriptionId'
});

db.directions.belongsToMany(db.teachers, {
    through: 'TeacherDirection',
    foreignKey: 'directionId',
    otherKey: 'teacherId'
});
db.teachers.belongsToMany(db.directions, {
    through: 'TeacherDirection',
    foreignKey: 'teacherId',
    otherKey: 'directionId'
});




db.ROLES = ["user", "admin"];
module.exports = db;