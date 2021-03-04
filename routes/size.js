const { Router } = require('express')
const { findAll, findById, add, update, destroy } = require('../controllers/sizes')
const { authorization } = require('../middlewares/authorization')

const router = Router()

router.get('/', findAll)
router.get('/:id', findById)
router.post('/', authorization, add)                             
router.patch('/', authorization, update)
router.delete('/:id', authorization, destroy)

module.exports = router