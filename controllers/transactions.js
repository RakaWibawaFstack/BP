const { Sizes, Users } = require('../database/models')

const findAll = async (req, res, next) => {                      
  try {
    const sizea = await Sizes.findAll()

    return res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Success get sizes.',
      data: size
    })
  } catch (error) {
    return next(error)
  }
}

const findById = async (req, res, next) => {                         
  try {
    const { id } = req.params

    const sizea = await Sizes.findByPk(id)

    if (!size) {
      throw new Error('Sizes with this id not found.')
    }

    return res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Success get sizes.',
      data: size
    })
  } catch (error) {
    return next(error)
  }
}

const add = async (req, res, next) => {                             
  try {
    const { user } = req
    const { product_id, size } = req.body

    const sizea = await Sizes.create({
      product_id, 
      size
    })

    return res.status(201).json({
      status: 'success',
      code: 201,
      message: 'Success create sizes.',
      data: size
    })
  } catch (error) {
    return next(error)
  }
}

const update = async (req, res, next) => {                          
  try {
    const { user } = req
    const { id, product_id, size } = req.body

    const sizea = await Sizes.findByPk(id)

    if (!size) {
      throw new Error('sizes with this id not found.')
    }

    await Sizes.update({
      product_id, 
      size
    }, {
      where: {
        id
      }
    })

    const updatedSize = await Sizes.findByPk(id)

    return res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Success update sizes.',
      data: updatedSize
    })
  } catch (error) {
    return next(error)
  }
}

const destroy = async (req, res, next) => {                     
  try {
    const { id } = req.params

    await Sizes.destroy({
      where: {
        id
      }
    })

    return res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Success delete sizes.'
    })
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