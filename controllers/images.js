const { Images, Users, Sizes } = require('../database/models')

const findAll = async (req, res, next) => {                      
  try {
    const image = await Images.findAll()

    return res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Success get images.',
      data: image
    })
  } catch (error) {
    return next(error)
  }
}

const findById = async (req, res, next) => {                         
  try {
    const { id } = req.params

    const image = await Images.findByPk(id)
    
    if (!image) {
      throw new Error('images with this id not found.')
    }

    return res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Success get images.',
      data: Images
    })
  } catch (error) {
    return next(error)
  }
}

const add = async (req, res, next) => {                             
  try {
    const { user } = req
    const { product_id, url } = req.body

    if (user.role === 'Admin'){
    const imagea = await Images.create({
      product_id, 
      url
    })

    return res.status(201).json({
      status: 'success',
      code: 201,
      message: 'Success create images.',
      data: Images
    })  
  }else{
  return res.status(401).json({
    status: 'error',
    code: 401,
    message: 'cannot edit images data except admin'
  })
}
  } catch (error) {
    return next(error)
  }
}

const update = async (req, res, next) => {                          
  try {
    const { user } = req
    const { id, product_id, url } = req.body

    const imagea = await Images.findByPk(id)

    if (!image) {
      throw new Error('images with this id not found.')
    }

    if (user.role === 'Admin'){
    await images.update({
      product_id, 
      url
    }, {
      where: {
        id
      }
    })

    const updatedImage = await Images.findByPk(id)

    return res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Success update Images.',
      data: updatedImage
    })
    }else{
    return res.status(401).json({
      status: 'error',
      code: 401,
      message: 'cannot update images data except admin'
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
    await Images.destroy({
      where: {
        id
      }
    })

    return res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Success delete Images.'
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