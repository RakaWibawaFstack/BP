const { Colors, Users, Sizes } = require('../database/models')

const findAll = async (req, res, next) => {                      
  try {
    const color = await Colors.findAll()

    return res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Success get colors.',
      data: color
    })
  } catch (error) {
    return next(error)
  }
}

const findById = async (req, res, next) => {                         
  try {
    const { id } = req.params

    const color = await Colors.findByPk(id)

    if (!color) {
      throw new Error('Colors with this id not found.')
    }

    return res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Success get colors.',
      data: color
    })
  } catch (error) {
    return next(error)
  }
}

const add = async (req, res, next) => {                             
  try {
    const { user } = req
    const { product_id, color } = req.body

    if (user.role === 'Admin'){
    const colour = await Colors.create({
      product_id, 
      color
    })

    return res.status(201).json({
      status: 'success',
      code: 201,
      message: 'Success create colors.',
      data: colour
    })
}else{
  return res.status(401).json({
    status: 'error',
    code: 401,
    message: 'cannot edit colors data except admin'
  })
}

  } catch (error) {
    return next(error)
  }
}

const update = async (req, res, next) => {                          
  try {
    const { user } = req
    const { id, product_id, color } = req.body

    const colour = await Colors.findByPk(id)

    if (!colour) {
      throw new Error('colors with this id not found.')
    }

    if (user.role === 'Admin'){
    await Colors.update({
      product_id, 
      color
    }, {
      where: {
        id
      }
    })

    const updatedColor = await Colors.findByPk(id)

    return res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Success update colors.',
      data: updatedColor
    })
  }else{
    return res.status(401).json({
      status: 'error',
      code: 401,
      message: 'cannot update colors data except admin'
      })
  }
  } catch (error) {
    return next(error)
  }
}

const destroy = async (req, res, next) => {                     
  try {
    const { id } = req.params

    if (user.role === 'Admin'){
    await Colors.destroy({
      where: {
        id
      }
    })

    return res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Success delete colors.'
    })
}else{
return res.status(401).json({
  status: 'error',
  code: 401,
  message: 'cannot delete product data except admin'
  })
}
  } catch (error) {
    console.log(error)
    return next(error)
  }
}

module.exports = {
  findAll,
  findById,
  add,
  update,
  destroy,
};