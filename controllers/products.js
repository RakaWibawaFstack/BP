const { Products, Users, Sizes } = require('../database/models')

exports.findAll = async (req, res, next) => {                      
  try {
    const product = await Products.findAll()

    return res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Success get products.',
      data: product
    })
  } catch (error) {
    return next(error)
  }
}

exports.findById = async (req, res, next) => {                         
  try {
    const { id } = req.params

    const product = await Products.findByPk(id)

    if (!product) {
      throw new Error('Products with this id not found.')
    }

    return res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Success get products.',
      data: product
    })
  } catch (error) {
    return next(error)
  }
}

exports.add = async (req, res, next) => {                             
  try {
    const { user } = req
    const { name, description } = req.body

    const product = await Products.create({
      name, 
      description, 
      user_id: user.id
    })

    return res.status(201).json({
      status: 'success',
      code: 201,
      message: 'Success create products.',
      data: product
    })
  } catch (error) {
    return next(error)
  }
}

exports.update = async (req, res, next) => {                          
  try {
    const { user } = req
    const { id, name, description } = req.body

    const product = await Products.findByPk(id)

    if (!product) {
      throw new Error('products with this id not found.')
    }

    await Products.update({
      name, 
      description,
      user_id: user.id
    }, {
      where: {
        id
      }
    })

    const updatedProduct = await Products.findByPk(id)

    return res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Success update products.',
      data: updatedProduct
    })
  } catch (error) {
    return next(error)
  }
}

exports.destroy = async (req, res, next) => {                     
  try {
    const { id } = req.params

    await Products.destroy({
      where: {
        id
      }
    })

    return res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Success delete products.'
    })
  } catch (error) {
    return next(error)
  }
}