require("dotenv").config();

const { Users } = require("../database/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { SECRET_TOKEN } = process.env;

exports.register = async (req, res, next) => {
  try {
    const { email, password, full_name, role } = req.body;

    const user = await Users.findOne({
      where: {
        email,
        full_name,
        role,
      },
    });

    if (user) {
      throw new Error(
        "User with this email already exist. Please use other email."
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await Users.create({
      email,
      password: hashedPassword,
      full_name,
      role
    });

    return res.status(201).json({
      status: "success",
      code: 201,
      message: "Success register user.",
    });
  } catch (error) {        
    console.log(error)                                    
    return next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password, full_name, role } = req.body;

    const user = await Users.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error("User with this Account or username not found.");
    }
    if(role != user.role){
      throw new Error("Error, forbidden resource");
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Password not valid.");
    }

    const accessToken = jwt.sign({ userId: user.id }, SECRET_TOKEN, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      status: "success",
      code: 200,
      message: "Success login.",
      data: {
        access_token: accessToken,
      },
    });
  } catch (error) {
    return next(error);
  }
};
