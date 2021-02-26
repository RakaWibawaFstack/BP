const sequelize = require('../connection')              
const Users = require('./Users')
const Orders = require('./Orders')
const Colors = require('./Colors')
const Images = require('./Images')
const Products = require('./Products')
const Sizes = require('./Sizes')
const Transactions = require('./Transactions')


Users.hasMany(Products, {
  as: 'users_products',
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})

Products.belongsTo(Users, {
  as: 'products_users',
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})

Users.hasMany(Orders, {
  as: 'users_orders',
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})

Orders.belongsTo(Users, {
  as: 'orders_users',
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})

Users.hasMany(Transactions, {
  as: 'users_transactions',
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})

Transactions.belongsTo(Users, {
  as: 'transactions_users',
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})

Transactions.hasMany(Orders, {
  as: 'transactions_orders',
  foreignKey: 'transactions_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})

Orders.belongsTo(Transactions, {
  as: 'orders_transactions',
  foreignKey: 'transactions_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})

Orders.hasMany(Products, {
  as: 'orders_products',
  foreignKey: 'product_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})

Products.belongsTo(Orders, {
  as: 'products_orders',
  foreignKey: 'product_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})

Products.hasMany(Sizes, {
  as: 'products_sizes',
  foreignKey: 'product_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})

Sizes.belongsTo(Products, {
  as: 'sizes_products',
  foreignKey: 'product_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})

Products.hasMany(Images, {
  as: 'products_images',
  foreignKey: 'product_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})

Images.belongsTo(Products, {
  as: 'images_products',
  foreignKey: 'product_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})

Products.hasMany(Colors, {
  as: 'products_colors',
  foreignKey: 'product_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})

Colors.belongsTo(Products, {
  as: 'colors_products',
  foreignKey: 'product_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})

module.exports = {
  sequelize,
  Users,
  Orders,
  Colors,
  Images,
  Products,
  Sizes,
  Transactions
}