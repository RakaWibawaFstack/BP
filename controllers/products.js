const { Products, Users, Sizes, Colors, Images } = require('../database/models')

const findAll = async (req, res, next) => {                      
  try {
    const product = await Products.findAll({
      include:[
        {
          model: Colors,
          as: 'colors'
        },
        {
          model: Sizes,
          as: 'sizes'
        }
      ] 
      
    })

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

const findById = async (req, res, next) => {                         
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

const add = async (req, res, next) => {                             
  try {
    const { user } = req
    const { name, description, stock, discount, sex, price } = req.body

    if (user.role === 'Admin'){
      const product = await Products.create({
        name, 
        description, 
        stock,
        discount,
        sex,
        price
      })
      return res.status(201).json({
        status: 'success',
        code: 201,
        message: 'Success create products.',
        data: product
      })
    }else{
      return res.status(401).json({
        status: 'error',
        code: 401,
        message: 'cannot edit product data except admin'
      })
    }

    

   
  } catch (error) {
    return next(error)
  }
}

const update = async (req, res, next) => {                          
  try {
    const { user } = req
    const { id, name, description, stock, discount, sex, price } = req.body

    const product = await Products.findByPk(id)

    if (!product) {
      throw new Error('products with this id not found.')
    }

    if (user.role === 'Admin'){
    await Products.update({
      name, 
      description, 
      stock,
      discount,
      sex,
      price
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

    }else{
       return res.status(401).json({
         status: 'error',
         code: 401,
         message: 'cannot update product data except admin'
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

const ListProduct = async (req, res, next) => {
  try {
    const product = await Products.findAll({
      include: [
        { model: Sizes, as: "sizes", },
        { model: Colors, as: "colors", },
        { model: Images, as: "images", },
      ],
    });
    return res.status(200).json({
      status: "success",
      code: 200,
      message: "Success get products. ",
      data: product,
    });
  } catch (error) {
    return next(error);
  }
};


module.exports = {
  findAll,
  findById,
  add,
  update,
  destroy,
  ListProduct
};