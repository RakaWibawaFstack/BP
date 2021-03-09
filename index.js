const express = require('express')
const cors = require('cors')
const app = express()
const port = 5000
const { sequelize } = require('./database/models')

const authRouter = require('./routes/auth')
const productRouter = require('./routes/product')
const colorRouter = require('./routes/color')
const imageRouter = require('./routes/image')
const orderRouter = require('./routes/order')
const sizeRouter = require('./routes/size')
const transactionRouter = require('./routes/transaction')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

sequelize.authenticate().then(() => {
    console.log(`Success connecting database`)                   
  })
app.use(express.static(__dirname+"public"))
app.use('/auth', authRouter)
app.use('/product', productRouter)
app.use('/color', colorRouter)
app.use('/image', imageRouter)
app.use('/order', orderRouter)
app.use('/size', sizeRouter)
app.use('/transaction', transactionRouter)

app.use((error, req, res, next) => {                         
  return res.status(400).json({
    status: 'error',
    code: 400,
    message: 'Bad request',
    error: error.message
  })
})

app.listen(port, () => {
    console.log(`Server running on port: ${port}`)
})