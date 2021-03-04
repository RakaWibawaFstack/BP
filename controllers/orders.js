const { Orders, Products, Users, Sizes, Colors, Transactions } = require('../database/models')

const findAll = async (req, res, next) => {                      
  try {
    const order = await Orders.findAll({
      include:[
        {
          model: Users,
          as: 'Users'
        },
        {
          model: Products,
          as: 'orders'
        },
        {
          model: Transactions,
          as: 'transaction'
        },
      ] 
      
    })

    return res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Success get orders.',
      data: order
    })
  } catch (error) {
    return next(error)
  }
}

const findById = async (req, res, next) => {                         
  try {
    const { id } = req.params

    const order = await Orders.findByPk(id)

    if (!order) {
      throw new Error('Orders with this id not found.')
    }

    return res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Success get orders.',
      data: order
    })
  } catch (error) {
    return next(error)
  }
}

const add = async (req, res, next) => {                             
  try {
    const { user } = req
    const { product_id, product_price, product_discount, product_qty, transaction_id } = req.body

    const order = await Orders.create({
      product_id, 
      product_price, 
      product_discount,
      product_qty,
      transaction_id
    })

    return res.status(201).json({
      status: 'success',
      code: 201,
      message: 'Success create orders.',
      data: order
    })
  } catch (error) {
    return next(error)
  }
}

const update = async (req, res, next) => {                          
  try {
    const { user } = req
    const { id, product_id, product_price, product_discount, product_qty, transaction_id } = req.body

    const order = await Orders.findByPk(id)

    if (!order) {
      throw new Error('orders with this id not found.')
    }

    await Orders.update({
      product_id, 
      product_price, 
      product_discount,
      product_qty,
      transaction_id
    }, {
      where: {
        id
      }
    })

    const updatedOrder = await Orders.findByPk(id)

    return res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Success update orders.',
      data: updatedOrder
    })
  } catch (error) {
    return next(error)
  }
}

const destroy = async (req, res, next) => {                     
  try {
    const { id } = req.params

    await Orders.destroy({
      where: {
        id
      }
    })

    return res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Success delete orders.'
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