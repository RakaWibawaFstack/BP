require("dotenv").config();

const jwt = require("jsonwebtoken");
const { Products, User, Images, Colors, Size } = require("../database/models");

exports.addToProduct = async (req, res, next) => {
  try {
    const {
      name,
      description,
      stock,
      discount,
      sex,
      price,
      sizes,
      colors,
      material,
      category,
    } = req.body;
    const { authorization } = req.headers;

    if (!authorization) {
      const error = new Error("Authorization required");
      error.statusCode = 401;
      throw error;
    }

    const token = authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const user_id = decodedToken.userId;
    const user = await User.findOne({
      where: {
        id: user_id,
        role: "admin",
      },
    });
    if (!user) {
      const error = new Error("User with this token not found");
      error.statusCode = 401;
      throw error;
    }
    const product = await Products.create({
      name,
      description,
      stock,
      discount,
      sex,
      price,
      material,
      category,
    });
    const image = await Images.create({
      image_name: req.file.originalname,
      image_path: `http://localhost:8000/images/${req.file.originalname}`,
      product_id: product.id,
    });
    console.log(req.file)
    const size = await Size.create({
      size: sizes,
      product_id: product.id,
    });
    const color = await Colors.create({
      color: colors,
      product_id: product.id,
    });
    return res.status(201).json({
      status: "success",
      code: 201,
      message: "Success add product",
      data: {
        product,
        image,
        size,
        color,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: "Something went wrong" });
  }
};
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, name, discount, price, stock } = req.body;
    const { authorization } = req.headers;

    if (!authorization) {
      const error = new Error("Authorization required");
      error.statusCode = 401;
      throw error;
    }

    const token = authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const user_id = decodedToken.userId;

    const user = await User.findOne({
      where: {
        id: user_id,
        role: "admin",
      },
    });
    if (!user) {
      const error = new Error("User with this token not found");
      error.statusCode = 401;
      throw error;
    }
    const item = await Products.findByPk(id);
    item.description = description;
    item.name = name;
    item.price = price;
    item.discount = discount;
    item.stock = stock;
    item.save();
    return res.status(200).json({
      status: "success",
      code: 200,
      message: "Success update items.",
    });
  } catch (error) {
    return next(error);
  }
};
exports.deleteProduct = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      const error = new Error("Authorization required");
      error.statusCode = 401;
      throw error;
    }
    const token = authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const user_id = decodedToken.userId;
    const user = await User.findOne({
      where: {
        id: user_id,
        role: "admin",
      },
    });
    if (!user) {
      const error = new Error("User with this token not found");
      error.statusCode = 401;
      throw error;
    }
    const { id } = req.params;
    Products.findByPk(id).then((product) => {
      product.destroy();
    });
    return res.status(201).json({
      status: "success",
      code: 201,
      message: "Success delete Product",
    });
  } catch (error) {
    return res.status(400).send({ error: err.message });
  }
};
