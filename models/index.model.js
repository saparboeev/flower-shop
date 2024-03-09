const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("flower_shop", "postgres", "De_sancho_21", {
  host: "localhost",
  dialect: "postgres",
});

const db = {};

db.sequelize = sequelize;
db.DataTypes = DataTypes;

db.users = require("./auth.model")(sequelize, DataTypes);
db.flowers = require("./flower.model")(sequelize, DataTypes);
db.orders = require("./order.model")(sequelize, DataTypes);
db.comments = require("./comment.model")(sequelize, DataTypes);

db.users.hasMany(db.flowers);
db.flowers.belongsTo(db.users, {
  foreignKey: "userId",
});

db.flowers.hasMany(db.orders);
db.orders.belongsTo(db.flowers, {
  foreignKey: "flowerId",
});

db.orders.hasOne(db.comments);
db.comments.belongsTo(db.orders, {
  foreignKey: "orderId",
});

module.exports = db;
