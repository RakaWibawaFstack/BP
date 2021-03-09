const { Products, Sizes, Colors, Images } = require("../database/models");
const getItemDetail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Products.findByPk(id,{
      include: [
        { model: Sizes, as: "sizes", },
        { model: Colors, as: "colors", },
        { model: Images, as: "images", },
      ],
    });

    if (!product) {
      throw new Error("Item with this id not found.");
    }
    return res.status(200).json({
      status: "success",
      code: 200,
      message: "Success get products.",
      data: product,
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getItemDetail,
};