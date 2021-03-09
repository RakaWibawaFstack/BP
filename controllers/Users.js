require("dotenv").config();
const jwt = require("jsonwebtoken");
const {
  Products,
  Sizes,
  Colors,
  Images,
  Transactions,
  Orders,
  Users,
} = require("../database/models");

// User Cart
exports.AddtoCart = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { authorization } = req.headers;
    const { product_qty, color, size } = req.body;
    if (!authorization) {
      error.statusCode = 401;
      throw new Error("Authorization required");
    }

    const token = authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const user_id = decodedToken.userId;
    const user = await User.findOne({
      where: {
        id: user_id,
      },
    });
    if (!user) {
      const error = new Error("User with this token not found");
      error.statusCode = 401;
      throw error;
    }

    const item = await Products.findByPk(id);
    if (!item) {
      throw new Error("Item with this id not found.");
    }
    if (item.stock < product_qty) {
      throw new Error("Product stock not enough");
    }
    const order = await Orders.create({
      product_id: item.id,
      product_price: item.price,
      product_discount: item.discount,
      user_id: user_id,
      color,
      size,
      product_qty,
    });
    const newStock = item.stock - product_qty;
    item.stock = newStock;
    item.save();
    return res.status(200).json({
      status: "success",
      code: 200,
      message: "Success add To Cart",
      data: order,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
exports.getDetailCart = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      const error = new Error("Authorization required");
      error.statusCode = 401;
      throw new Error("Authorization required");
    }

    const token = authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const user_id = decodedToken.userId;
    const user = await User.findOne({
      where: {
        id: user_id,
      },
    });
    if (!user) {
      const error = new Error("User with this token not found");
      error.statusCode = 401;
      throw error;
    }
    const orderUser = await Orders.findAll({
      where: {
        user_id: user_id,
      },
    });
    return res.status(200).json({
      status: "success",
      code: 200,
      message: "Success get Detail Order",
      data: orderUser,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
exports.RemoveFromCart = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const { id } = req.params;
    if (!authorization) {
      const error = new Error("Authorization required");
      error.statusCode = 401;
      throw new Error("Authorization required");
    }

    const token = authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const user_id = decodedToken.userId;
    const user = await User.findOne({
      where: {
        id: user_id,
        role: "user",
      },
    });
    if (!user) {
      const error = new Error("User with this token not found");
      error.statusCode = 401;
      throw error;
    }
    const orderUser = await Orders.findAll({
      where: {
        user_id: user_id,
      },
    });
    Orders.findByPk(id).then((order) => {
      order.destroy();
    });
    return res.status(201).json({
      status: "success",
      code: 201,
      message: "Success delete Orders",
    });
  } catch (error) {
    return res.status(400).send({ error: err.message });
  }
};
exports.addQtyProduct = async (req, res, next) => {
  const { authorization } = req.headers;
  const { id } = req.params;
  if (!authorization) {
    const error = new Error("Authorization required");
    error.statusCode = 401;
    throw new Error("Authorization required");
  }

  const token = authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
  const user_id = decodedToken.userId;
  const user = await User.findOne({
    where: {
      id: user_id,
      role: "user",
    },
  });
  if (!user) {
    const error = new Error("User with this token not found");
    error.statusCode = 401;
    throw error;
  }
};
exports.minQtyProduct = async (req, res, next) => {};

// User Transaction
exports.createTransaction = async (req, resn, next) => {
  const { authorization } = req.headers;
  const { id } = req.params;
  if (!authorization) {
    const error = new Error("Authorization required");
    error.statusCode = 401;
    throw new Error("Authorization required");
  }

  const token = authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
  const user_id = decodedToken.userId;
  const user = await User.findOne({
    where: {
      id: user_id,
      role: "user",
    },
  });
  if (!user) {
    const error = new Error("User with this token not found");
    error.statusCode = 401;
    throw error;
  }
};
