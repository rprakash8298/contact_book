const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const app = express()
const cors = require('cors')
require('./DATABASE/mongoose')
const userRouter = require('./ROUTES/user')
const contactRouter = require('./ROUTES/contact')

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded( { limit: '30mb', extended: true } ))
app.use(cors())

app.use('/user', userRouter)
app.use('/contact', contactRouter)

app.get('/', (req, res) => {
    res.send('app running')
})

const port = process.env.PORT || 7000

app.listen(port, () => {
    console.log(`app running ${port}`)
})