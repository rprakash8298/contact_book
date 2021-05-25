const express = require('express')
const router = express.Router()
const auth = require('../MIDDLEWARE/auth')

const {ADD_CONTACT,SEARCH_CONTACT,UPDATE_CONTACT,READ_CONTACT,DELETE_CONTACT}  = require('../CONTROLLERS/contactController')

router.post('/add_contact', auth, ADD_CONTACT)
router.get('/search',SEARCH_CONTACT)
router.patch('/update_contact/:id',auth,UPDATE_CONTACT)
router.get('/read_contact',auth,READ_CONTACT)
router.delete('/delete_contact/:id',auth,DELETE_CONTACT)


module.exports = router