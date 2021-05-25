const express = require('express');
const router = express.Router()
const auth = require('../MIDDLEWARE/auth')
const { signin, signup } = require('../CONTROLLERS/user')


router.post('/signup',signup)
router.post('/signin', signin)

router.get('/test', auth,(req, res) => {
    res.send('hello')
})


module.exports = router