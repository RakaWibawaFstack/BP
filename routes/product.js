const { Router } = require('express')
const { findAll, findById, add, update, destroy } = require('../controllers/products')
const { authorization } = require('../middlewares/authorization')
const { getItemDetail } = require("../controllers/getItemDetail");
const { ListProduct } = require("../controllers/products");
const router = Router()

router.get('/', findAll)
router.get('/select', ListProduct);
router.get('/:id', findById)
router.get('/select/:id', getItemDetail);
router.post('/', authorization, add)                             
router.patch('/', authorization, update)
router.delete('/:id', authorization, destroy)

module.exports = router