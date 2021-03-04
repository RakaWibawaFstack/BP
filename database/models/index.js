const sequelize = require("../connection");
const Users = require("./Users");
const Orders = require("./Orders");
const Colors = require("./Colors");
const Images = require("./Images");
const Products = require("./Products");
const Sizes = require("./Sizes");
const Transactions = require("./Transactions");

Users.hasMany(Products, {
  as: "products",
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Products.belongsTo(Users, {
  as: "users",
  foreignKey: "user_id",
  targetKey: "id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Users.hasMany(Orders, {
  as: "orders",
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Orders.belongsTo(Users, {
  as: "users",
  foreignKey: "user_id",
  targetKey: "id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Users.hasMany(Transactions, {
  as: "transactions",
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Transactions.belongsTo(Users, {
  as: "users",
  foreignKey: "user_id",
  targetKey: "id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Products.hasMany(Sizes, {
  as: "sizes",
  foreignKey: "product_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Sizes.belongsTo(Products, {
  as: "products",
  foreignKey: "product_id",
  targetKey: "id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Products.hasMany(Colors, {
  as: "colors",
  foreignKey: "product_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Colors.belongsTo(Products, {
  as: "products",
  foreignKey: "product_id",
  targetKey: "id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Products.hasMany(Images, {
  as: "images",
  foreignKey: "product_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Images.belongsTo(Products, {
  as: "products",
  foreignKey: "product_id",
  targetKey: "id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Products.hasMany(Orders, {
  as: "orders",
  foreignKey: "product_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Orders.belongsTo(Products, {
  as: "products",
  foreignKey: "product_id",
  targetKey: "id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Transactions.hasMany(Orders, {
  as: "orders",
  foreignKey: "transaction_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Orders.belongsTo(Transactions, {
  as: "transactions",
  foreignKey: "transaction_id",
  targetKey: "id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
module.exports = {
  sequelize,
  Users,
  Orders,
  Colors,
  Images,
  Products,
  Sizes,
  Transactions
};
