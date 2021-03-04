require('dotenv').config()

const { Users } = require('../database/models')
const jwt = require('jsonwebtoken')

const { SECRET_TOKEN } = process.env

const authorization = async (req, res, next) => {
  try {
    const authorization = req.header('Authorization')                     

    if (!authorization) {
      throw new Error('Invalid token.')
    }
    
    const token = authorization.split('Bearer ')[1]

    if (!token) {
      throw new Error('Invalid token.')
    }

    const decodedToken = jwt.verify(token, SECRET_TOKEN)

    if (!decodedToken.userId) {
      throw new Error('Invalid token.')
    }

    const user = await Users.findByPk(decodedToken.userId)

    if (!user) {
      throw new Error('Invalid token.')
    }

    req.user = user
    return next()
  } catch (error) {
    return res.status(401).json({
      status: 'error',
      code: 401,
      message: error.message
    })
  }
}

module.exports = {
  authorization,
};